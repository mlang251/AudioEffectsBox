const express = require('express');
const io = require('socket.io')();
const List = require('immutable').List;
const Map = require('immutable').Map;
const OscUdpPort = require('./serverDependencies/ports').OscUdpPort;
const DgramUdpPort = require('./serverDependencies/ports').DgramUdpPort;
const ioHelpers = require('./serverDependencies/ioHelpers');
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




//Handle all Server <--> UI communication through socket.io events
//Navigating to http://localhost:3000 will open a socket and fire the 'connection' event
//Closing the tab or refreshing the browser will fire the 'disconnect' event
//Other events are fired by the UI when certain interactions take place
io.on('connection', socket => {
    console.log('User connected');

    //Emit the initial route
    serverToMaxChannel.portRouteEffects.sendData(JSON.stringify(ioHelpers.createRoutes()));

    socket.on('action', (action) => {
        switch (action.type) {
            case 'UPDATE_EFFECTS':
                var data = ioHelpers.createRoutes(action.payload.effectsList);
                serverToMaxChannel.portRouteEffects.sendData(JSON.stringify(data));
                var newEffectID = action.options.newEffect;
                if (newEffectID) {
                    const effectDefaults = defaults[newEffectID];
                    Object.keys(effectDefaults).forEach(parameter => {
                        var data = {
                            effectID: newEffectID,
                            paramName: parameter,
                            paramValue: effectDefaults[parameter]
                        };
                        serverToMaxChannel.portParameters.sendData(JSON.stringify(data));
                    });
                }
                break;
            case 'UPDATE_MAPPING':
                var {effectID, paramName, axis} = action.payload;
                var data = ioHelpers.updateMapping('set', effectID, paramName, axis);
                serverToMaxChannel.portXYZMap.sendData(JSON.stringify(data));
                break;
            case 'REMOVE_MAPPING':
                var {effectID, paramName} = action.payload;
                var data = ioHelpers.updateMapping('remove', effectID, paramName);
                serverToMaxChannel.portXYZMap.sendData(JSON.stringify(data));
                break;
            case 'UPDATE_PARAMETER_VALUE':
                var {effectID, paramName, paramValue} = action.payload;
                var data = ioHelpers.updateParameter(effectID, paramName, paramValue);
                serverToMaxChannel.portParameters.sendData(JSON.stringify(data));
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
