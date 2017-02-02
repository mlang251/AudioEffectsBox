class leapToServerChannel extends dgramUdpPort {
    constructor(data) {
        super(8000);
        this.x = {
            effect: data.x.effect,
            param: data.x.param
        }
        this.y = {
            effect: data.y.effect,
            param: data.y.param
        }
        this.z = {
            effect: data.z.effect,
            param: data.z.param
        }
        this.data = JSON.parse(
            {
                data.x.effect: {
                    data.x.param: null
                }
            }
        );
    }

    sendData() {

    }
}

const leap2server = new leapToServerChannel({
    x: {
        effect: "reverb",
        param: "liveness"
    },
    y: {
        effect: "reverb",
        param: "damping"
    },
    z: {
        effect: "bandpass",
        param: "q"
    }
})

//var data = {
//    reverb: {
//        liveness: "x",
//        damping: "y"
//    },
//    bandpass: {
//        q: "z"
//    }
//}

leapToServerChannel.update = (x, y, z) => {
    data.reverb.liveness = x;
    data.reverb.damping = y;
    data.bandpass.q = z;
}
