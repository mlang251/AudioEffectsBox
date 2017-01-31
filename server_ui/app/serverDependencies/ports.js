const osc = require('osc');
const dgram = require('dgram');

var exports = {};

class oscLocalUdpPort extends osc.UDPPort {
    constructor(port, address) {
      super({
          remoteAddress: "127.0.0.1",
          remotePort: port
      })
      this.address = `/${address}`;
    }
    sendData(data) {
      this.send({
          address: this.address,
          args: data
      }, this.options.remoteAddress, this.options.remotePort);
      console.log(`Data sent over ${this.address} port: ${data}`);
    };
}

class dgramUdpPort extends dgram.Socket {
    constructor(port) {
      super(dgram.createSocket({ type: 'udp4', reuseAddr: true }))
      this.bind(port);
    }
}

exports.oscLocalUdpPort = oscLocalUdpPort;
exports.dgramUdpPort = dgramUdpPort;

module.exports = exports;
