import React from 'react'

class MapGeojson extends React.Component {

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
        this.map = addr.mmap;
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

        window.$gama.addOutput(this, this);
        // console.log(window.$gama.outputs);
        setTimeout(() => {

            var myself = this;
            this.on_connected(myself);
        }, 20);

    }



    on_connected(myself) {
        const attribute1Name = 'state';
        const attribute2Name = 'zone_id';
        // console.log("connected");
        // console.log(this.props.map);
        var mymyself = myself;

        this.props.map.current.on('load', async () => {
            // Add the source1 location as a source.
            this.props.map.current.addSource('source1', {
                type: 'geojson',
                data: mymyself.geojson
            });
            this.props.map.current.addSource('source2', {
                type: 'geojson',
                data: mymyself.geojson
            });
            this.props.map.current.addLayer({
                'id': 'source1',
                type: 'circle',
                'source': 'source1',
                'layout': {},
                'paint': {
                    'circle-radius': {
                        'base': 100.75,
                        'stops': [
                            [12, 10],
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
            this.props.map.current.addLayer({
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
            // // Add some fog in the background
            // this.props.map.current.setFog({
            //     'range': [-0.5, 5],
            //     'color': 'white',
            //     'horizon-blend': 0.2
            // });
            // // Add a sky layer over the horizon
            // this.props.map.current.addLayer({
            //     'id': 'sky',
            //     'type': 'sky',
            //     'paint': {
            //         'sky-type': 'atmosphere',
            //         'sky-atmosphere-color': 'rgba(85, 151, 210, 0.5)'
            //     }
            // });
            // Add terrain source, with slight exaggeration
            // this.props.map.current.addSource('mapbox-dem', {
            //     'type': 'raster-dem',
            //     'url': 'mapbox://mapbox.terrain-rgb',
            //     'tileSize': 512,
            //     'maxzoom': 14
            // });
            // this.props.map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
            // this.props.map.current.setLight({ anchor: 'map' });
            myself.start_renderer();
        });
         
        // window.$gama.evalExpr("species(world).microspecies", function (ee) {
        //     console.log(ee);
        // });
        window.$gama.evalExpr("CRS_transform(world.location,\"EPSG:4326\")", function (ee) {
            console.log(ee);
            if (JSON.parse(ee).type === "CommandExecutedSuccessfully") {
                ee = JSON.parse(ee).content.replace(/[{}]/g, "");
                var eee = ee.split(",");
                console.log(eee[0]);
                console.log(eee[1]);
                myself.props.map.current.flyTo({
                    center: [eee[0], eee[1]],
                    essential: true,
                    duration: 0,
                    zoom: 15
                });
                // document.getElementById('div-loader').remove();
                // window.$gama.request = "";//IMPORTANT FLAG TO ACCOMPLISH CURRENT TRANSACTION
            }
        });

    }

    on_disconnected() {
        console.log("disconnected");
    }

    componentWillUnmount() {

        window.$gama.outputs.delete(this);
        // console.log(window.$gama.outputs);
    }
    update(c) {
        const species1Name = 'Individual';
        const attribute1Name = 'state';
        var myself = this;

        // .getPopulation(species1Name, [attribute1Name], 
        window.$gama.evalExpr("to_geojson(" + species1Name + ",\"EPSG:4326\",[\"" + attribute1Name + "\"])", function (message) {
            if (typeof message.data == "object") {

            } else {
                var gjs = JSON.parse(message);
                if (gjs.content && gjs.type === "CommandExecutedSuccessfully") {
                    var tmp = gjs.content;
                    myself.geojson = null;

                    myself.geojson = tmp;
                    if (myself.props.map.current.getSource('source1'))
                        myself.props.map.current.getSource('source1').setData(myself.geojson);
                }

            }
            if (c) {
                c();
                // console.log("callback mapgeojson");
                // if(!JSON.parse(message).command){console.log(JSON.parse(message));}
            }
        }, true);
    }

    start_renderer() {

        const species2Name = 'Building';
        const attribute2Name = 'zone_id';

        // const species1Name = 'people';
        // const attribute1Name = 'name'; 
        // const species2Name = 'building';
        // const attribute2Name = 'name';

        var myself = this;
        // window.$gama.getPopulation(species2Name, [attribute2Name], "EPSG:4326", function (message) {
        window.$gama.evalExpr("to_geojson(" + species2Name + ",\"EPSG:4326\",[\"" + attribute2Name + "\")", function (message) {
            if (typeof message.data == "object") {

            } else {
                try {
                    myself.geojson = null;
                    // myself.geojson = JSON.parse(message).content;

                    // console.log(myself.geojson);
                    myself.props.map.current.getSource('source2').setData(myself.geojson);
                    // console.log(ls);
                } catch (e) {
                    console.log(e);
                }
            }
        }, true);

        // this.updateSource = setInterval(() => {
        // }, 1000);
    }


    render() {


        return "";
    }
}

export default MapGeojson;