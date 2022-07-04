import React, { useEffect, useRef } from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import GAMA from "./GAMA";
const BaseMap = (props) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaHFuZ2hpODgiLCJhIjoiY2t0N2w0cGZ6MHRjNTJ2bnJtYm5vcDB0YyJ9.oTjisOggN28UFY8q1hiAug';
  // console.log(props.parent);
  const mymap = useRef(null);

  useEffect(() => { 
    mymap.current = new mapboxgl.Map({
      container: props.parent.id,
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      pitch: 45,
      // bearing: -17.6,
      antialias: true,
      center: [105.8249019, 21.0076181], // TLU -84.5, 38.05starting position 
      zoom: 15 // starting zoom
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  var addr =props.parent.state.url;// "ws://localhost:6868/"; 
  var modelPath = props.parent.state.model_path;//'C:\\git\\PROJECT\\COMOKIT-Model\\COMOKIT\\Meso\\Models\\Experiments\\Activity Restrictions\\School and Workplace Closure.gaml';
  var experimentName = props.parent.state.exp_name;//'Closures';
  return (
    <><div id={props.parent.id} className="map">

    </div>
      <div>

        <GAMA address={addr} modelPath={modelPath} experimentName={experimentName} map={mymap}></GAMA>
      </div></>
  );
};

export default BaseMap;