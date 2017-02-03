const osc = require('osc');
const dgram = require('dgram');

var exports = {};

class OscUdpPort extends osc.UDPPort {
    constructor(config) {
        super({
            localAddress: "127.0.0.1",
            localPort: config.localPort ? config.localPort : null,
            remoteAddress: "127.0.0.1",
            remotePort: config.remotePort ? config.remotePort : null
        });
        this.address = config.address ? `/${config.address}` : '/unknown';
        this.on('ready', this.onReady);
        this.open();
    }

    sendData(data) {
        this.send({
            address: this.address,
            args: data
        }, this.options.remoteAddress, this.options.remotePort);
        console.log(`Data sent over ${this.address} port: ${data}`);
    }

    onReady() {
        console.log(`Port opened for address: ${this.address}`);
    }

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
