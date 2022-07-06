import React from 'react'

class GAMA extends React.Component {
    constructor(addr, md, exp, mmap) {

        super();
        this.socket_id = 0;
        this.exp_id = 0;
        this.wSocket = void 0;
        this.state = "";
        this.queue = [];
        this.req = "";
        this.result = "";
        this.executor = void 0;
        this.executor_speed = 1000;
        this.endCondition = "";
        this.param = [];
        this.logger = void 0;
        this.address = addr;
        this.modelPath = md;
        this.experimentName = exp;
        this.map = mmap;
        this.updateSource = null;
        this.geojson = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [0, 0]
                    }
                }
            ]
        };
        
        window.$gama=this;
        // this.connect(this.on_connected, this.on_disconnected);


    }
    doConnect(c){
        this.connect(this.on_connected, this.on_disconnected);
        if(c) c();
    }
    connect(opened_callback, closed_callback) {
        // console.log(this.address.address);
        this.modelPath = this.address.modelPath;
        this.experimentName = this.address.experimentName;
        this.map = this.address.map;
        this.wSocket = new WebSocket(this.address.address);

        this.wSocket.onclose = function (event) {
            clearInterval(this.executor);

            var myself = this;
            if (closed_callback) closed_callback(myself);
        };

        this.wSocket.addEventListener('open', event => {
            var myself = this;
            if (opened_callback) opened_callback(myself);
        });
        this.executor = setInterval(() => {
            if (this.queue.length > 0 && this.req === "") {
                // console.log(this.queue);
                this.req = this.queue.shift();
                this.req.exp_id = this.exp_id;
                this.req.socket_id = this.socket_id;
                this.wSocket.send(JSON.stringify(this.req)); // console.log("request " + JSON.stringify(this.req));

                if (this.logger) {
                    this.logger("request " + JSON.stringify(this.req));
                }

                var myself = this;

                this.wSocket.onmessage = function (event) {
                    // console.log(myself.req);
                    if (event.data instanceof Blob) { } else {
                        if (myself.req.callback) {
                            myself.req.callback(event.data);
                        }

                        myself.endRequest();
                    }
                };
            }
        }, this.executor_speed);
    }

    on_connected(myself) {
        console.log("connected");       
    }

    on_disconnected() {
        console.log("disconnected");
    }



    requestCommand(cmd) {
        if (this.req === "" || this.queue.length === 0) {
            this.queue.push(cmd);
        }
    }

    endRequest() {
        this.req = "";
    }

    evalExpr(q, c) {
        var cmd = {
            "type": "expression",
            "socket_id": this.socket_id,
            "exp_id": this.exp_id,
            "expr": q,
            "callback": c
        };
        this.requestCommand(cmd);
    }

    execute(q, c) {
        var cmd = {
            "type": q,
            "model": this.modelPath,
            "experiment": this.experimentName,
            "socket_id": this.socket_id,
            "exp_id": this.exp_id,
            "auto-export": false,
            "parameters": this.param,
            "until": this.endCondition,
            "callback": c
        };
        this.requestCommand(cmd);
    }

    getPopulation(q, att, crs, c) {
        var cmd = {
            'type': 'output',
            'species': q,
            'attributes': att,
            "crs": crs,
            'socket_id': this.socket_id,
            'exp_id': this.exp_id,
            "callback": c
        };
        this.requestCommand(cmd);
    }

    setParameters(p) {
        this.param = p;
    }

    setEndCondition(ec) {
        this.endCondition = ec;
    }

    launch(c) {
        this.queue.length = 0;
        var myself = this;
        this.state = "launch";
        this.execute(this.state, function (e) {
            console.log(e);
            var result = JSON.parse(e);
            if (result.exp_id) myself.exp_id = result.exp_id;
            if (result.socket_id) myself.socket_id = result.socket_id;
            if (c) c();
        });
    }

    play(c) {
        // this.queue.length = 0;
        this.state = "play";
        this.execute(this.state);
        if (c) c();
    }

    pause(c) {
        // this.queue.length = 0;
        this.state = "pause";
        this.execute(this.state);
        if (c) c();
    }

    step(c) {
        // this.queue.length = 0;
        this.state = "step";
        this.execute(this.state);
        if (c) c();
    }

    reload(c) {
        // this.queue.length = 0;
        this.state = "reload";
        this.execute(this.state);
        if (c) c();
    }


    // componentWillUnmount() {
    //     this.wSocket.close();
    // }
    render() {


        return "";
    }
}

export default GAMA;