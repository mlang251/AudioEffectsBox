const osc = require('osc');
const dgram = require('dgram');

var exports = {};

class oscUdpPort extends osc.UDPPort {
    constructor(port, address) {
        super({
            localPort: null,
            remoteAddress: "127.0.0.1",
            remotePort: port
        });
        this.address = `/${address}`;
        this.open();
    }
    sendData(data) {
        this.send({
            address: this.address,
            args: data
        }, this.options.remoteAddress, this.options.remotePort);
        console.log(`Data sent over ${this.address} port: ${data}`);
    };
}

class dgramUdpPort {
    constructor(port) {
        this.socket = dgram.createSocket('udp4');
        this.socket.bind(port)
    }
}

exports.oscUdpPort = oscUdpPort;
exports.dgramUdpPort = dgramUdpPort;

module.exports = exports;
