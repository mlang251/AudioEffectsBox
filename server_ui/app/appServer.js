const express = require('express');
const io = require('socket.io')();
const List = require('immutable').List;
const OscUdpPort = require('./serverDependencies/ports').OscUdpPort;
const DgramUdpPort = require('./serverDependencies/ports').DgramUdpPort;
const ioTypes = require('./actions/actionOptions').ioTypes;
const ioFlags = require('./actions/actionOptions').ioFlags;
const defaults = require('./JSON/defaults.json');

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
const createRoutes = (effectsArray = []) => {
    let routeObj = {input: 'output'};
    for (let i = 0; i < effectsArray.length; i++) {
        const effectID = effectsArray[i].effectID;
        if (index == 0) {
            routeObj.input = effectID;
        }
        routeObj[effectID] = effectsArray[i + 1] ? effectsArray[i + 1].effectID : 'output';
    };
    return routeObj;
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

// Maintain currentRoute. When effects are added, removed, bypassed, or solod, update this and send it to Max
let currentRoute = createRoutes();

// Maintain xyzMap. When mappings are overwritten, emit once to nullify the original, then again with the new one
let xyzMap = {
    x: {
        effectID: undefined,
        paramName: undefined,
        axisName: 'x'
    },
    y: {
        effectID: undefined,
        paramName: undefined,
        axisName: 'y'
    },
    z: {
        effectID: undefined,
        paramName: undefined,
        axisName: 'z'
    }
};




//Handle all Server <--> UI communication through socket.io events
//Navigating to http://localhost:3000 will open a socket and fire the 'connection' event
//Closing the tab or refreshing the browser will fire the 'disconnect' event
//Other events are fired by the UI when certain interactions take place
io.on('connection', socket => {
    console.log('User connected');

    //Emit the initial route
    serverToMaxChannel.portRouteEffects.sendData(JSON.stringify(currentRoute))


    socket.on('action', (action) => {
        const {ioType, ioFlag} = action.options;
        switch (ioType) {
            case ioTypes.ROUTE:
                //Don't forget to emit initial parameter values when effect is added
                break;
            case ioTypes.XYZ_MAP:
                var {axis, effectID, paramName} = action.payload;
                switch (ioFlag) {
                    case ioFlags.SET_MAP:
                        const axes = ['x', 'y', 'z'];
                        if (xyzMap[axis].effectID) {
                            updateMapping('remove', axis);
                        }
                        for (let i = 0; i < axes.length; i++) {
                            if (xyzMap[axes[i]].effectID == effectID && xyzMap[axes[i]].paramName == paramName) {
                                updateMapping('remove', axes[i]);
                            }
                        }
                        updateMapping('set', axis, effectID, paramName);
                        break;
                    case ioFlags.REMOVE_MAP:
                        updateMapping('remove', axis);
                        break;
                    default:
                        console.log('Unknown io flag');
                        break;
                }
                break;
            case ioTypes.UPDATE_PARAMETER:
                var {effectID, paramName, paramValue} = action.payload;
                updateParameter(effectID, paramName, paramValue);
                break;
            default:
                console.log('Unknown io type');
                break;
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected') ;
    });
});
