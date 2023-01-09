import React from 'react';
import "./assets/rgl.css";
import "./assets/styles.css";
import { Container, Button } from "reactstrap";
import Grid from "./Grid";
import NavigationBar from "./Navbar";
import Sidebar from "react-sidebar";

const bstyle = {
  margin: 0,
  bottom: 'auto',
  left: 2,
  top: 2,
  right: 'auto',
  position: 'fixed',
  zIndex:9999999
};
const mql = window.matchMedia(`(min-width: 800px)`);
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: true
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  render() {
    var mygrid = React.createRef();

    return (
      <div className="App">
        <Container fluid={true}>
          <Sidebar
            sidebar={<NavigationBar grid={mygrid}/>}
            open={this.state.sidebarOpen}
            touch={true}
            touchHandleWidth={50}
            onSetOpen={this.onSetSidebarOpen}
            styles={{ sidebar: { background: "white" } }}
          >
            <div className="position-absolute top-0 start-0" >

            <Button color="primary" style={bstyle} size="sm" onClick={() => this.onSetSidebarOpen(!this.state.sidebarOpen)}>|||</Button>
            </div>
          </Sidebar>
          <Grid ref={mygrid} ></Grid>
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