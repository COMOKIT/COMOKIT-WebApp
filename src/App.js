import React from 'react';
import "./assets/rgl.css";
import "./assets/styles.css";
import { Container, Button } from "reactstrap";
import Grid from "./Grid";
import NavigationBar from "./Navbar";
import Sidebar from "react-sidebar";
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
const bstyle = {
  margin: 0,
  top: 'auto',
  left: 2,
  bottom: 2,
  right: 'auto',
  position: 'fixed',
  zIndex:9999999
};
const components = [
  {
    position: {
      bottom: 0,
      left: 0,
    },
    event: 'click',
    alwaysShowTitle: true,
    mainButtonStyles: {
      backgroundColor: '#27ae60',
    },
    actionButtonStyles: {
      backgroundColor: '#16a085',
    },
  }, 
];

const renderComponents = c =>
  c.map(({ mainButtonStyles, actionButtonStyles, position, event, alwaysShowTitle }, i) => (
    <Fab
      mainButtonStyles={mainButtonStyles}
      style={position}
      icon="+"
      event={event}
      key={i}
      alwaysShowTitle={alwaysShowTitle}
    >
      <Action
        style={actionButtonStyles}
        text="Email"
        onClick={e => {
          alert('I printed the event to the console.');
          console.log(e);
        }}
      >
        @
      </Action>
      <Action
        style={actionButtonStyles}
        text="Notifications"
        onClick={() => alert('Here is your notification.')}
      >
        🔔
      </Action>
      <Action style={actionButtonStyles} text="Fullscreen" onClick={() => alert('What?')}>
        📄
      </Action>
      <Action style={actionButtonStyles} text="Search" onClick={() => alert('No search...')}>
        🔍
      </Action>
      <Action style={actionButtonStyles} text="Editor" onClick={e => console.log(e)}>
        🖊️
      </Action>
      <Action
        style={actionButtonStyles}
        text="Like it!"
        onClick={() => alert('This is fantastic!')}
      >
        👍
      </Action>
    </Fab>
  ));

const abStyles = {
  position: 'absolute',
  top: '-110px',
  right: '100%',
  padding: '18px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
  backgroundColor: '#fff'
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
            touch={false}
            pullRight={false}
            touchHandleWidth={5}
            onSetOpen={this.onSetSidebarOpen}
            styles={{ sidebar: {backgroundColor: "rgba(255,255,255,1)"} }}
          > 

            <Button color="primary" style={bstyle} size="lg" onClick={() => this.onSetSidebarOpen(!this.state.sidebarOpen)}>☰</Button>
   
          </Sidebar>
          <Grid ref={mygrid} ></Grid>
          
          {renderComponents(components)}
          

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