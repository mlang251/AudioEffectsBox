const express = require('express');
const io = require('socket.io')();
const {OscUdpPort, DgramUdpPort} = require('./serverDependencies/ports');
const {createRoutes, updateMapping, updateParameter} = require('./serverDependencies/ioHelpers');

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

/**
 * Handles events when the server receives data from the Leap. Logs the data to the console, sends the data to the Max application,
 *     and emits the data to the UI through the redux store. The Leap data comes in at 70Hz, so the framerate is throttled to be 
 *     about 24Hz.
 */
let counter = 0;
leapToServerChannel.portLeapCoords.on("message", msg => {
    if (counter % 3 ==0) {
        let data = msg.args;
        data = data.map((axisValue, index) => {
            return index == 2 ? 1 - axisValue : axisValue;
        });
        console.log(`received message from leap: ${data}`);
        serverToMaxChannel.portLeapCoords.sendData(data);
        io.emit('action', {
            type: 'RECEIVE_LEAP_DATA',
            options: {},
            payload: {
                data
            }
        });
        counter = 0;
    }
    counter ++;
});

/**
 * Handles events when the server receives status updates from the Leap. Logs the data to the console, and emits the data to the UI 
 *     through the redux store
 */
leapToServerChannel.portLeapStatusUpdates.on('message', msg => {
    const {address, args} = msg;
    io.emit('action', {
        type: 'RECEIVE_LEAP_STATUS',
        options: {},
        payload: {
            address,
            args
        }
    });
    console.log(`received message from leap: ${address} - ${args[0]}`);
});





//Create the Max --> Server UDP socket
//Need to use the Node dgram library to receive messages from Max
//because Max cannot send OSC formatted data which is was osc.UDPPort requires
const maxToServerChannel = {
  portAudioInputOptions: new DgramUdpPort(11000)
};

/**
 * Handles events when the server receives messages from the Max application. Logs the data to the console, and emits the data to 
 *     the UI through the redux store
 */
maxToServerChannel.portAudioInputOptions.socket.on("message", (msg, rinfo) => {
    message = msg.toString();
    console.log(`received message from max: ${message}`);
    io.emit('action', {
        type: 'UPDATE_MESSAGE',
        options: {},
        payload: {
            message
        }
    });
});




//Handle all Server <--> UI communication through socket.io events
//Navigating to http://localhost:3000 will open a socket and fire the 'connection' event
//Closing the tab or refreshing the browser will fire the 'disconnect' event
//Other events are fired by the UI when certain interactions take place
io.on('connection', socket => {
    console.log('User connected');

    //Emit the initial route
    serverToMaxChannel.portRouteEffects.sendData(JSON.stringify(createRoutes()));

    /**
     * Handles events when the server receives an action from the redux-socket.io middleware. Calls the proper function imported from
     *     ./serverDependencies/ioHelpers.js and emits the results of these function calls to the Max application
     */
    socket.on('action', (action) => {
        switch (action.type) {
            case 'UPDATE_EFFECTS':
                var data = createRoutes(action.payload.effectsList);
                serverToMaxChannel.portRouteEffects.sendData(JSON.stringify(data));
                break;
            case 'UPDATE_MAPPING':
                var {effectID, paramName, axis} = action.payload;
                var data = updateMapping('set', effectID, paramName, axis);
                serverToMaxChannel.portXYZMap.sendData(JSON.stringify(data));
                break;
            case 'REMOVE_MAPPING':
                var {effectID, paramName} = action.payload;
                var data = updateMapping('remove', effectID, paramName);
                serverToMaxChannel.portXYZMap.sendData(JSON.stringify(data));
                break;
            case 'UPDATE_PARAMETER_VALUE':
                var {effectID, paramName, paramValue} = action.payload;
                var data = updateParameter(effectID, paramName, paramValue);
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
