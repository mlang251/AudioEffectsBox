const express = require('express');
const io = require('socket.io')();
const List = require('immutable').List;
const Map = require('immutable').Map;
const OscUdpPort = require('./serverDependencies/ports').OscUdpPort;
const DgramUdpPort = require('./serverDependencies/ports').DgramUdpPort;
const defaults = require('./JSON/defaults.json');
// TODO: install requireJS and require this
// const actionTypes = require('./actions/actionTypes');

//Instantiate the server
let app = express();
app.use(express.static(__dirname + '/public'));

//Server will serve ./public/index.html on http://localhost:3000
let server = app.listen(3000, () => {
    console.log('Listening on port 3000');
});


//Create the Server <--> UI web socket
io.attach(server);


//Create the Server --> MaxMSP UDP sockets
//Need to send data to Max using the node osc package
//because Max udpreceive object expects OSC formatted messages
const serverToMaxChannel = {
    portRouteEffects: new OscUdpPort({remotePort: 7000, address: "route"}),        //For setting up the audio signal flow in Max
    portParameters: new OscUdpPort({remotePort: 7010, address: "params"}),         //For sending parameter values to Max
    portAudioInputChoice: new OscUdpPort({remotePort: 7020, address: "audioIn"}),  //For choosing the audio driver for input
    portLeapCoords: new OscUdpPort({remotePort: 7030, address: "coords"}),         //For sending the Leap coordinates
    portXYZMap: new OscUdpPort({remotePort: 7040, address: "xyzMap"})              //For assigning x, y, and z to specific effect parameters
};

//Create the Leap --> Server OSC sockets
const leapToServerChannel = {
    portLeapCoords: new OscUdpPort({localPort: 8000}),
    portLeapStatusUpdates: new OscUdpPort({localPort: 8010})
};

leapToServerChannel.portLeapCoords.on("message", msg => {
    const data = msg.args;
    console.log(`received message from leap: ${data}`);
    serverToMaxChannel.portLeapCoords.sendData(data);
    //TODO: use redux-socket.io, import action creator receiveLeap... to facilitate this
    io.emit('leapData', data);
});

leapToServerChannel.portLeapStatusUpdates.on('message', msg => {
    //TODO: use redux-socket.io, import action creator receiveLeap... to facilitate this
    io.emit('leapStatusUpdate', msg);
    console.log(`received message from leap: ${msg.args}`);
});





//Create the Max --> Server UDP socket
//Need to use the Node dgram library to receive messages from Max
//because Max cannot send OSC formatted data which is was osc.UDPPort requires
const maxToServerChannel = {
  portAudioInputOptions: new DgramUdpPort(11000)
};
maxToServerChannel.portAudioInputOptions.socket.on("message", (msg, rinfo) => {
    msg = msg.toString();
    console.log(`received message from max: ${msg}`);
    //TODO: use redux-socket.io, import action creator updateMessage to facilitate this
    io.emit('message', msg);
});



//
//Socket.io helper functions and variables
//
const createRoutes = (effectsList = List()) => {
    //TODO: for some reason the immutable effectsList is being converted into plain JS
    let routeObj = {input: 'output'};
    const soloEffect = effectsList.filter(effect => {
        return effect.isSoloing;
    });
    const effectsToRoute = soloEffect.length > 0 ? soloEffect : effectsList;
    let isFirstInChain = true;
    effectsToRoute.forEach((effect, index) => {
        if (!effect.isBypassed) {
            const effectID = effect.effectID;
            if (isFirstInChain) {
                routeObj.input = effectID;
                isFirstInChain = false;
            }
            routeObj[effectID] = effectsToRoute[index + 1] ? effectsToRoute[index + 1].effectID : 'output';
        }
    });
    serverToMaxChannel.portRouteEffects.sendData(JSON.stringify(routeObj));
}

const updateMapping = (method, axis, effectID, paramName) => {
    let data = {};
    switch (method) {
        case 'remove':
            data = {
                effectID: xyzMap[axis].effectID,
                param: xyzMap[axis].paramName,
                axis: 'n'
            }
            xyzMap[axis].effectID = undefined;
            xyzMap[axis].paramName = undefined;
            break;
        case 'set':
            data = {
                effectID,
                paramName,
                axis
            }
            xyzMap[axis].effectID = effectID;
            xyzMap[axis].paramName = paramName;
            break;
        default:
            console.log('Unknown mapping method');
            break;
    }
    serverToMaxChannel.portXYZMap.sendData(JSON.stringify(data));
};

const updateParameter = (effectID, paramName, paramValue) => {
    const data = {
        effectID,
        paramName,
        paramValue
    };
    serverToMaxChannel.portParameters.sendData(JSON.stringify(data));
}



//Handle all Server <--> UI communication through socket.io events
//Navigating to http://localhost:3000 will open a socket and fire the 'connection' event
//Closing the tab or refreshing the browser will fire the 'disconnect' event
//Other events are fired by the UI when certain interactions take place
io.on('connection', socket => {
    console.log('User connected');

    //Emit the initial route
    createRoutes();

    socket.on('action', (action) => {
        switch (action.type) {
            case 'UPDATE_EFFECTS':
                createRoutes(action.payload.effectsList);
                var newEffectID = action.options.newEffect;
                if (newEffectID) {
                    const effectDefaults = defaults[newEffectID];
                    Object.keys(effectDefaults).forEach(parameter => {
                        const data = {
                            effectID: newEffectID,
                            paramName: parameter,
                            paramValue: effectDefaults[parameter]
                        };
                        serverToMaxChannel.portParameters.sendData(JSON.stringify(data));
                    });
                }
                break;
            case 'UPDATE_MAPPING':
                console.log(action.type)
                break;
            case 'REMOVE_MAPPING':
                console.log(action.type)
                break;
            case 'UPDATE_PARAMETER_VALUE':
                var {effectID, paramName, paramValue} = action.payload;
                updateParameter(effectID, paramName, paramValue);
                break;
            default:
                console.log('Unknown action type');
                break;
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected') ;
    });
});
