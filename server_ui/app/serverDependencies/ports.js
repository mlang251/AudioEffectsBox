const osc = require('osc');
const dgram = require('dgram');

var exports = {};

//TODO: Make this class more robust, allow it to set up sending and receiving ports. Constructor should take an object of ports
class OscUdpPort extends osc.UDPPort {
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

class DgramUdpPort {
    constructor(port) {
        this.socket = dgram.createSocket('udp4');
        this.socket.bind(port)
    }
}

exports.OscUdpPort = OscUdpPort;
exports.DgramUdpPort = DgramUdpPort;

module.exports = exports;
