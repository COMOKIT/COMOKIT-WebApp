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
        this.output_executor = void 0;
        this.executor_speed = 10;
        this.endCondition = "";
        this.param = [];
        this.outputs = new Map();
        this.logger = void 0;
        this.address = addr;
        this.modelPath = md;
        this.pendingoutput = 0;
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

        window.$gama = this;
        // this.connect(this.on_connected, this.on_disconnected);


    }
    doConnect(c) {
        this.connect(c, this.on_disconnected);
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
                this.req = this.queue.shift();
                this.req.exp_id = this.exp_id;
                this.req.socket_id = this.socket_id;
                // console.log(this.req);
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

    on_connected(c) {
        console.log("connected");
        if (c) c();
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
            "model": this.modelPath,
            "experiment": this.experimentName,
            "socket_id": this.socket_id,
            "exp_id": this.exp_id,
            "expr": q,
            "callback": c
        };
        // console.log("eval " + cmd.expr);
        this.requestCommand(cmd);
    }

    execute(q, c) {
        var cmd = {
            "type": q,
            "model": this.modelPath,
            "experiment": this.experimentName,
            "socket_id": this.socket_id,
            "exp_id": this.exp_id,
            "console":false,
            "status":false,
            "dialog":false,
            "auto-export": false,
            "parameters": this.param,
            "until": this.endCondition,
            "sync": true,
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
        this.state = "load";
        this.execute(this.state, function (e) {
             
            var result = JSON.parse(e).content;
            // console.log(e);
            if (result.exp_id) myself.exp_id = result.exp_id;
            if (result.socket_id) myself.socket_id = result.socket_id;
            if (c) {
                c();
            }
        });
    }

    play(c) {
        clearInterval(this.output_executor);

        // this.queue.length = 0;
        this.state = "play";
        this.execute(this.state, c);
        this.output_executor = setInterval(() => {
            this.updateOutputs();
        }, 100);
    }
    updateOutputs() {

        let _this = this;
        if (this.pendingoutput <= 0) {
            this.pendingoutput = this.outputs.size;
            this.outputs.forEach((values, keys) => {

                values.update(function () { _this.pendingoutput-- });
            });
        }
    }

    autoStep(c) {
        // this.queue.length = 0;
        clearInterval(this.output_executor);
        this.state = "step";
        this.execute(this.state, () => {
            this.output_executor = setInterval(() => {
                this.updateOutputs(); 
                this.autoStep(c);
            }, 100);
        });
    }

    step(c) {
        // this.queue.length = 0;
        clearInterval(this.output_executor);
        this.state = "step";
        this.execute(this.state,()=>{
            if (c) c(); 
            this.updateOutputs();
        });
    }
    pause(c) {
        // this.queue.length = 0;
        this.state = "pause";
        this.execute(this.state,c);
    }
    // serial(asyncFunctions) {
    //     return asyncFunctions.map(function (functionChain, nextFunction) {
    //         return functionChain
    //             .then((previousResult) => nextFunction(previousResult))
    //             .then(result => ({ status: 'fulfilled', result }))
    //             .catch(error => ({ status: 'rejected', error }));
    //     }, Promise.resolve());
    // }

    reload(c) {
        // this.queue.length = 0;
        this.state = "reload";
        this.execute(this.state);
        if (c) c();
    }

    addOutput(id, o) {
        this.outputs.set(id, o);
    }
    componentWillUnmount() {
        clearInterval(this.executor);
        clearInterval(this.output_executor);
        // this.wSocket.close();
    }
    render() {


        return "";
    }
}

export default GAMA;