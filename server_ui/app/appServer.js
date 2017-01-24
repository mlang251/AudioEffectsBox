const express = require('express');
const osc = require('osc');
const dgram = require('dgram');
const spawn = require('child_process').spawn;




//Instantiate the server
let app = express();
app.use(express.static(__dirname + '/public'));

//Server will serve ./public/index.html on http://localhost:3000
let server = app.listen(3000, () => {
    console.log('Listening on port 3000');
});




//Run the Leap Python code as a child process of the server
//Create event listeners to collect the hand tracking data and log messages to console
const leap = spawn("python ..\\Leap\\main.py", {
    shell: true,
    detached: true
});

leap.stdout.on('data', data => {
    console.log(`data: ${data}`);
});

leap.stderr.on('data', (data) => {
    console.log(`Leap process error: ${data}`);
});

leap.on('close', (code) => {
    console.log(`Leap process exited with code ${code}`);
});




//Create the Server <--> UI web socket
let io = require('socket.io')();
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
const client = dgram.createSocket('udp4');

client.on("message", (msg, rinfo) => {
    msg = msg.toString();
    console.log(`received message: ${msg}`);
    io.emit('message', msg);
});

client.bind(57120);




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
        console.log(`Effects route: ${data} type: ${typeof data}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected') ;
    });
});
