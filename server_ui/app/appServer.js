const express = require('express');

let app = express();
let io = require('socket.io')();

app.use(express.static(__dirname + '/public'));

let server = app.listen(3000, () => {
    console.log('Listening on port 3000');
});

io.attach(server);

io.on('connection', socket => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected') ;
    });
});
