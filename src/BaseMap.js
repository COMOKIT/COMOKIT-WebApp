import React, { useEffect, useRef } from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import MapGeojson from "./MapGeojson";
const BaseMap = (props) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaHFuZ2hpODgiLCJhIjoiY2t0N2w0cGZ6MHRjNTJ2bnJtYm5vcDB0YyJ9.oTjisOggN28UFY8q1hiAug';
  // console.log(props.parent);
  const mymap = useRef(null);

  useEffect(() => { 
    mymap.current = new mapboxgl.Map({
      container: props.parent.id,
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      // pitch: 45,
      // bearing: -17.6,
      antialias: false,
      center: [105.8249019, 21.0076181], // TLU -84.5, 38.05starting position 
      zoom: 15 // starting zoom
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mymap]); 
  
  var addr = "ws://localhost:6868/"; 
  var modelPath = 'C:/git/gama/msi.gama.models/models/Tutorials/Road Traffic/models/Model 05.gaml';
  var experimentName = 'road_traffic';
  return (
    <><div id={props.parent.id} className="map">

    </div>
      <div>

        <MapGeojson address={addr} modelPath={modelPath} experimentName={experimentName} map={mymap}></MapGeojson>
      </div></>
  );
};

export default BaseMap;