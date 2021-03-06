import React from 'react';
import "./assets/rgl.css";
import "./assets/styles.css";
import { Container } from "reactstrap";
import Grid from "./Grid";
import NavigationBar from "./Navbar";
class App extends React.Component {
  
  render() {
    var mygrid = React.createRef();

    return (
      <div className="App">
        <NavigationBar grid={mygrid}></NavigationBar>
        <Container fluid={true}>
          <Grid  ref={mygrid} ></Grid>
        </Container>
      </div>
    );
  }
}
export default App;
// export default function App() {
//   return (
//     <div>
//       <div className="sidebar">
//         Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//       </div>
//       <div ref={mapContainer} className="map-container" />
//     </div>
//   );
// }