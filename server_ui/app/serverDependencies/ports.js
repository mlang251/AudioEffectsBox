const osc = require('osc');
const dgram = require('dgram');

/** Class representing an OSC UDP port */
module.exports.OscUdpPort = class OscUdpPort extends osc.UDPPort {
    /**
     * Creates an OscUdpPort instance. Calls super to create the instance of the osc.UDPPort, and then binds other member functions.
     *     Calls this.open to open the port once all functions are bound.
     * @param {Object} config - An object of information about the port to create
     * @property {String} config.localPort - If this OscUdpPort is receiving data, specify the localPort on which to listen
     * @property {String} config.remotePort - If this OscUdpPort is sending data, specify the remotePort on which to send
     * @property {String} config.address - If this OscUdpPort is sending data, specify the address to attach to OSC datagrams
     */
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

    /**
     * Sends an OSC UDP datagram over this OscUdpPort's remotePort
     * @param {*} data - Data to send in the OSC UDP datagram
     */
    sendData(data) {
        this.send({
            address: this.address,
            args: data
        }, this.options.remoteAddress, this.options.remotePort);
        console.log(`Data sent over ${this.address} port: ${data}`);
    }

    /** When this.open is called in the constructor, log a message to the terminal */
    onReady() {
        console.log(`OSC UDP port ${this.options.localPort ? this.options.localPort : this.options.remotePort} opened for 
            address: ${this.address}`);
    }

}

/** Class representing a UDP port using the Node default dgram library */
module.exports.DgramUdpPort = class DgramUdpPort {
    /**
     * Creates an instance of a DgramUdpPort. Creates a UDP socket using the Node dgram library, binds it to the port, and binds an
     *     listening function
     * @param {Number} port - The port to listen on for UDP datagrams. 
     */
    constructor(port) {
        this.socket = dgram.createSocket('udp4');
        this.socket.bind(port);
        this.socket.on('listening', () => this.onListening(port));
    }

    /**
     * When the socket is bound to the port, log a message to the terminal.
     * @param {Number} port - The port this DgramUdpPort is listening on
     */
    onListening(port) {
        console.log(`Dgram UDP port ${port} opened`);
    }
}