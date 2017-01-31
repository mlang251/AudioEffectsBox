const express = require('express');
const io = require('socket.io')();
const oscLocalUdpPort = require('./serverDependencies/ports').oscLocalUdpPort;
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


//Create the Server --> MaxMSP UDP channel (multiple ports)
//Need to send data to Max using the node osc package
//because Max udpreceive object expects OSC formatted messages
//Send messages to Max on port 7000
const serverToMaxChannel = {
    routeEffects: new oscLocalUdpPort(7000, "route"),
    parameters: new oscLocalUdpPort(7001, "params")
};


//Create the Max --> Server UDP socket
//Need to use the Node dgram library to receive messages from Max
//because Max cannot send OSC formatted data which is was osc.UDPPort requires
const maxToServerChannel = {
  portMaxMessage: new dgramUdpPort(11500)
};

maxToServerChannel.portMaxMessage.on("message", (msg, rinfo) => {
    msg = msg.toString();
    console.log(`received message from max: ${msg}`);
    io.emit('message', msg);
});


//Create the Leap --> Server UDP socket
const leapToServerChannel = {
    portCoord: new dgramUdpPort(8000),
    currentCoord: [0, 0, 0]
}

//serverToMaxChannel.parameters.open();

leapToServerChannel.portCoord.on("message", (msg, rinfo) => {
    msg = msg.toString();
    console.log(`received message from leap: ${msg}`);
    leapToServerChannel.currentCoord = msg.split(" ");
    //serverToMaxChannel.parameters.open();
    //serverToMaxChannel.parameters.sendData(leapToServerChannel.currentCoord);
    //TO DO: save the data and pass to the parameters
});



//Handle all Server <--> UI communication through socket.io events
//Navigating to http://localhost:3000 will open a socket and fire the 'connection' event
//Closing the tab or refreshing the browser will fire the 'disconnect' event
//Other events are fired by the UI when certain interactions take place
io.on('connection', socket => {
    console.log('User connected');
    serverToMaxChannel.routeEffects.open();

    socket.on('route', data => serverToMaxChannel.routeEffects.sendData(data));

    socket.on('disconnect', () => {
        console.log('User disconnected') ;
    });
});
