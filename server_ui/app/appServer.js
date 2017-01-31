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
    //paramValues: {} TO DO: This can be the variable to holds all of the param values. This can be the 'data' that portParameters sends. It will be set by the result of portStaticParamValues (values specified in ui), portCoordParamPairs (specified in ui) and currentCoord (from leap).
    portAudioInputChoice: new oscUdpPort(7020, "audioIn")
};


//Create the Max --> Server UDP socket
//Need to use the Node dgram library to receive messages from Max
//because Max cannot send OSC formatted data which is was osc.UDPPort requires
const maxToServerChannel = {
  portAudioInputOptions: new dgramUdpPort(11000),
  //portCoordParamPairs: new dgramUdpPort(11010) TO DO: Have user select what parameters to put on which axis and send to server HERE
  //portStaticParamValues: new dgramUdpPort(11020) TO DO: Have ui send in an object with key value pairs for all parameters' statically set values HERE
};
maxToServerChannel.portAudioInputOptions.on("message", (msg, rinfo) => {
    msg = msg.toString();
    console.log(`received message from max: ${msg}`);
    io.emit('message', msg);
});


//Create the Leap --> Server UDP socket
const leapToServerChannel = {
    portCoord: new dgramUdpPort(8000),
    currentCoord: [0, 0, 0]
}
leapToServerChannel.portCoord.on("message", (msg, rinfo) => {
    msg = msg.toString();
    console.log(`received message from leap: ${msg}`);
    leapToServerChannel.currentCoord = msg.split(" ");

    serverToMaxChannel.portParameters.open();
    serverToMaxChannel.portParameters.sendData(leapToServerChannel.currentCoord);
    //TO DO: Use the currentCoord array to set the appropriate parameters (in paramValues) instead of directly sending coords to max.
});


//Handle all Server <--> UI communication through socket.io events
//Navigating to http://localhost:3000 will open a socket and fire the 'connection' event
//Closing the tab or refreshing the browser will fire the 'disconnect' event
//Other events are fired by the UI when certain interactions take place
io.on('connection', socket => {
    console.log('User connected');

    serverToMaxChannel.portRouteEffects.open();

    socket.on('route', data => serverToMaxChannel.portRouteEffects.sendData(data));

    socket.on('disconnect', () => {
        console.log('User disconnected') ;
    });
});
