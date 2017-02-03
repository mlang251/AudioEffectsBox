const express = require('express');
const io = require('socket.io')();
const OscUdpPort = require('./serverDependencies/ports').OscUdpPort;
const DgramUdpPort = require('./serverDependencies/ports').DgramUdpPort;

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

//Create the Max --> Server UDP socket
//Need to use the Node dgram library to receive messages from Max
//because Max cannot send OSC formatted data which is was osc.UDPPort requires
const maxToServerChannel = {
  portAudioInputOptions: new DgramUdpPort(11000)
};
maxToServerChannel.portAudioInputOptions.socket.on("message", (msg, rinfo) => {
    msg = msg.toString();
    console.log(`received message from max: ${msg}`);
    io.emit('message', msg);
});



//Create the Leap --> Server OSC socket
const leapToServerChannel = new OscUdpPort({localPort: 8000});

//TODO: Redo this callback to use the OscUdpPort class syntax and send data to Max
leapToServerChannel.on("message", msg => {
    console.log(`received message from leap: ${msg.args}`);
});




//Handle all Server <--> UI communication through socket.io events
//Navigating to http://localhost:3000 will open a socket and fire the 'connection' event
//Closing the tab or refreshing the browser will fire the 'disconnect' event
//Other events are fired by the UI when certain interactions take place
io.on('connection', socket => {
    console.log('User connected');

    socket.on('route', data => serverToMaxChannel.portRouteEffects.sendData(data));
    socket.on('xyzMap', data => {
        serverToMaxChannel.portRouteEffects.send(data);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected') ;
    });
});
