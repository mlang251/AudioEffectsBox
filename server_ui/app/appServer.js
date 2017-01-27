const express = require('express');
const osc = require('osc');
const dgram = require('dgram');
const io = require('socket.io')();



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
//Send messages to Max on port 7000
const udpSend = new osc.UDPPort({
    remoteAddress: "127.0.0.1",
    remotePort: 7000
});

//Create the Max --> Server UDP socket
//Need to use the Node dgram library to receive messages from Max
//because Max cannot send OSC formatted data which is was osc.UDPPort requires
const maxChannel = dgram.createSocket('udp4');

maxChannel.on("message", (msg, rinfo) => {
    msg = msg.toString();
    console.log(`received message from max: ${msg}`);
    io.emit('message', msg);
});

maxChannel.bind(57120);


//Create the Leap --> Server UDP socket
const leapChannel = dgram.createSocket('udp4');

leapChannel.on("message", (msg, rinfo) => {
    msg = msg.toString();
    console.log(`received message from leap: ${msg}`);
    //TO DO: save the data and pass to the parameters
});

leapChannel.bind(8000);


//Handle all Server <--> UI communication through socket.io events
//Navigating to http://localhost:3000 will open a socket and fire the 'connection' event
//Closing the tab or refreshing the browser will fire the 'disconnect' event
//Other events are fired by the UI when certain interactions take place
io.on('connection', socket => {
    console.log('User connected');
    udpSend.open();

    socket.on('route', data => {
        udpSend.send({
            address: "/route",
            args: data
        }, udpSend.options.remoteAddress, udpSend.options.remotePort);
        console.log(`Effects route: ${data}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected') ;
    });
});
