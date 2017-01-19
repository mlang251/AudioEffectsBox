const express = require('express');
const dgram = require('dgram');
const client = dgram.createSocket('udp4')

let app = express();
let io = require('socket.io')();

app.use(express.static(__dirname + '/public'));

let server = app.listen(3000, () => {
    console.log('Listening on port 3000');
});

io.attach(server);

io.on('connection', socket => {
    console.log('User connected');

    socket.on('route', data => {
        const message = data;
        client.send(message, 7000, 'localhost', err => {
            if(err) {
                console.log(err);
                client.close();
            } else {
                console.log(`sent data: ${data}`);
            }
        });
        console.log(`Effects route: ${data} type: ${typeof data}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected') ;
    });
});
