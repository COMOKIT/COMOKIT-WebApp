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
        this.updateSource=null;
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
        this.connect(this.on_connected, this.on_disconnected);
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
            // console.log(e);
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
    

    on_connected(myself) { 
        const attribute1Name = 'state';  
        const attribute2Name = 'zone_id';
        console.log("connected");
        // console.log(myself.map);
        myself.launch();
        var mymyself = myself;

        myself.map.current.on('load', async () => {
            // Add the source1 location as a source.
            mymyself.map.current.addSource('source1', {
                type: 'geojson',
                data: mymyself.geojson
            });
            myself.map.current.addSource('source2', {
                type: 'geojson',
                data: mymyself.geojson
            });
            myself.map.current.addLayer({
                'id': 'source1',
                type: 'circle',
                'source': 'source1',
                'layout': {},
                'paint': {
                    'circle-radius': {
                        'base': 1.75,
                        'stops': [
                            [12, 1],
                            [22, 50]
                        ]
                    },
                    'circle-color': ['match', ['get', attribute1Name], // get the property
                        "susceptible", 'green',
                        "latent", 'orange',
                        "presymptomatic", 'red',
                        "asymptomatic", 'red',
                        "symptomatic", 'red',
                        "removed", 'blue',
                        'gray'],

                },
            });
            myself.map.current.addLayer({
                'id': 'source2',
                type: 'fill',
                'source': 'source2',
                'layout': {},
                'paint': {
                    'fill-color': ['match', ['get', attribute2Name], // get the property
                        "commerce", 'green',
                        "gare", 'red', "Musee", 'red',
                        "habitat", 'blue', "culte", 'blue', "Industrial", 'blue',
                        'gray'],

                },
            });
            // Add some fog in the background
            myself.map.current.setFog({
                'range': [-0.5, 5],
                'color': 'white',
                'horizon-blend': 0.2
            });
            // Add a sky layer over the horizon
            myself.map.current.addLayer({
                'id': 'sky',
                'type': 'sky',
                'paint': {
                    'sky-type': 'atmosphere',
                    'sky-atmosphere-color': 'rgba(85, 151, 210, 0.5)'
                }
            });
            // Add terrain source, with slight exaggeration
            myself.map.current.addSource('mapbox-dem', {
                'type': 'raster-dem',
                'url': 'mapbox://mapbox.terrain-rgb',
                'tileSize': 512,
                'maxzoom': 14
            });
            myself.map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
            myself.map.current.setLight({ anchor: 'map' });
            myself.start_renderer();
        });
        myself.evalExpr("CRS_transform(world.location,\"EPSG:4326\")", function (ee) {
            ee = JSON.parse(ee).result.replace(/[{}]/g, "");
            var eee = ee.split(",");
            console.log(eee[0]);
            console.log(eee[1]);
            mymyself.map.current.flyTo({
                center: [eee[0], eee[1]],
                essential: true,
                duration: 0,
                zoom: 15
            });
            // document.getElementById('div-loader').remove();
            myself.request = "";//IMPORTANT FLAG TO ACCOMPLISH CURRENT TRANSACTION
        });

        myself.play();
    }

    on_disconnected() {
        console.log("disconnected");
    }


    start_renderer() {

        const species1Name = 'Individual';
        const attribute1Name = 'state'; 
        const species2Name = 'Building';
        const attribute2Name = 'zone_id';
        
        var myself=this;
        this.getPopulation(species2Name, [attribute2Name], "EPSG:4326", function (message) {
            if (typeof message.data == "object") {

            } else {
                myself.geojson = null;
                myself.geojson = JSON.parse(message);
                // console.log(geojson);
                myself.map.current.getSource('source2').setData(myself.geojson);
            }
        });

        this.updateSource = setInterval(() => {
            myself.getPopulation(species1Name, [attribute1Name], "EPSG:4326", function (message) {
                if (typeof message.data == "object") {

                } else {
                    myself.geojson = null;
                    myself.geojson = JSON.parse(message);
                    // console.log(geojson);
                    myself.map.current.getSource('source1').setData(myself.geojson); 
                }
            });
        }, 100);
    }
     
    

    componentWillUnmount() {
        this.wSocket.close();
    }
    render() {


        return "";
    }
}

export default GAMA;