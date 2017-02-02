const express = require('express');
const io = require('socket.io')();
const oscUdpPort = require('./serverDependencies/ports').oscUdpPort;
const dgramUdpPort = require('./serverDependencies/ports').dgramUdpPort;

//Instantiate the server
let app = express();
app.use(express.static(__dirname + '/public'));

//Server will serve ./public/index.html on http://localhost:3000
let server = app.listen(3000, () => {
    console.log('Listening on port 3000');
});


//Create the Server <--> UI web socket
io.attach(server);


//Create the Server --> MaxMSP UDP socket
//Need to send data to Max using the node osc package
//because Max udpreceive object expects OSC formatted messages
const serverToMaxChannel = {
    portRouteEffects: new oscUdpPort(7000, "route"),
    portParameters: new oscUdpPort(7010, "params"),
    portAudioInputChoice: new oscUdpPort(7020, "audioIn")
};

//Create the Max --> Server UDP socket
//Need to use the Node dgram library to receive messages from Max
//because Max cannot send OSC formatted data which is was osc.UDPPort requires
const maxToServerChannel = {
  portAudioInputOptions: new dgramUdpPort(11000),
};
maxToServerChannel.portAudioInputOptions.socket.on("message", (msg, rinfo) => {
    msg = msg.toString();
    console.log(`received message from max: ${msg}`);
    io.emit('message', msg);
});



//Create the Leap --> Server UDP socket
const leapToServerChannel = {
    portCoord: new dgramUdpPort(8000),
    currentCoord: []
}

leapToServerChannel.portCoord.socket.on("message", (msg, rinfo) => {
    msg = msg.toString();
    console.log(`received message from leap: ${msg}`);
    const stringArray = msg.split(" ");
    stringArray.forEach((coord, i) => {
        leapToServerChannel.currentCoord[i] = Number(coord);
    });
    //TO DO: convert leap data to JSON with parameter name and value pairs
    //TO DO: set selected parameters to currentCoord values, and send over portParameters
});




//Handle all Server <--> UI communication through socket.io events
//Navigating to http://localhost:3000 will open a socket and fire the 'connection' event
//Closing the tab or refreshing the browser will fire the 'disconnect' event
//Other events are fired by the UI when certain interactions take place
io.on('connection', socket => {
    console.log('User connected');

    socket.on('route', data => serverToMaxChannel.portRouteEffects.sendData(data));
    socket.on('xyzMap', data => {
        //see xyzMap.js for example data
    });
    socket.on('disconnect', () => {
        console.log('User disconnected') ;
    });
});
