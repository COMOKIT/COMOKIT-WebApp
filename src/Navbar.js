import React from 'react'
import { Navbar, NavbarBrand } from "reactstrap";
import GAMA from "./GAMA";
import { Button } from "reactstrap";
const default_Nav_state = {
  // url: "ws://51.255.46.42:6001",
  // model_path: "/var/www/github/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml",
  url: "ws://localhost:6868",
  // model_path:"C:/git/PROJECT/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml",
  // exp_name: "Closures",

  loading: false,
  model_path: 'C:/git/gama/msi.gama.models/models/Tutorials/Road Traffic/models/Model 05.gaml',
  exp_name: 'road_traffic'
};

class NavigationBar extends React.Component {
  constructor(param) {
    super(param);
    this.id = "m" + param.id;
    this.state = this.getNFromLS("Nav") || default_Nav_state;
    this.gama = React.createRef();
    this.grid = param.grid;
    this.fetchFile = this.fetchFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.tryConnect = this.tryConnect.bind(this);
    this.tryLaunch = this.tryLaunch.bind(this);
    this.tryPlay = this.tryPlay.bind(this);
    this.tryPause = this.tryPause.bind(this);
    this.tryStep = this.tryStep.bind(this);
    this.tryReload = this.tryReload.bind(this);
    this.tryAdd = this.tryAdd.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.saveNToLS("Nav", this.state);
      // this.getWFromLS("Widget" + this.id);
    });
  }

  fetchFile() {
    this.setState((prevState) => ({
      data: [0, 1],
      loading: false
    }));
  }

  render() {
    var addr = this.state.url;
    // if (this.gama.current && this.gama.current.wSocket && this.gama.current.wSocket.readyState === 1) {
    
    return (<><GAMA ref={this.gama} address={addr}  ></GAMA>
      <div>
        <Navbar color="faded" light className="navBar">
          <NavbarBrand className="mr-auto" width="100%">
            <table><tbody><tr width="100%">
              <td> <select
                id="select_host"
                className="form-control"
                name="url"
                onChange={this.handleChange}
                defaultValue={this.state.url}
              // defaultValue={"ws://51.255.46.42:6001"}
              >
                <option value="ws://51.255.46.42:6001">Gama ovh</option>
                <option value="ws://localhost:6868">Local</option>
              </select></td>
              {/* <td><Button color="primary" size="sm" onClick={this.tryConnect}>Connect</Button></td> */}
              <td>
                <select
                  id="select_model"
                  className="form-control"
                  name="model_path"
                  onChange={this.handleChange}
                  // defaultValue={"/var/www/github/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml"}                    
                  defaultValue={this.state.model_path}
                >
                  <option value="/var/www/github/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml">Comokit ovh</option>
                  <option value="C:/git/PROJECT/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml">Comokit local</option>
                  <option value="C:/git/gama/msi.gama.models/models/Tutorials/Road Traffic/models/Model 05.gaml">Road Traffic 05.gaml</option>
                </select>
              </td><td><select
                id="select_exp"
                className="form-control"
                name="exp_name"
                onChange={this.handleChange}
                // defaultValue={"Closures"}
                defaultValue={this.state.exp_name}
              >
                <option value="Closures">Closures</option>
                <option value="road_traffic">road_traffic</option>
              </select></td>
              <td><Button color="primary" size="sm" onClick={this.tryConnect}>Launch</Button> </td>
              <td><Button color="primary" size="sm" onClick={this.tryPlay}>Play</Button> </td>
              <td><Button color="primary" size="sm" onClick={this.tryPause}>Pause</Button> </td>
              <td><Button color="primary" size="sm" onClick={this.tryStep}>Step</Button> </td>
              <td><Button color="primary" size="sm" onClick={this.tryReload}>Reload</Button> </td>
              <td><Button color="primary" size="sm" onClick={this.tryAdd}>Add Chart Widget</Button></td>
            </tr></tbody></table>
          </NavbarBrand>
        </Navbar>
      </div></>
    );

  }


  tryAdd() {
    this.props.grid.current.addWidget();
  }
  tryConnect() {
    if (!this.gama.current.wSocket) {// && this.gama.current.wSocket.readyState!==1
      var _this = this;
      this.gama.current.doConnect(  _this.tryLaunch);

    }
    // window.$gama.doConnect();
  }

  tryLaunch() {
    console.log("connected");
    // if (!this.gama.current.wSocket) {
    //   this.tryConnect();
    // }
    if (this.gama.current && this.gama.current.wSocket) {// && this.gama.current.wSocket.readyState!==1


      this.gama.current.modelPath = this.state.model_path;
      this.gama.current.experimentName = this.state.exp_name;

      // var modelPath = 'C:/git/gama/msi.gama.models/models/Tutorials/Road Traffic/models/Model 05.gaml';
      // var experimentName = 'road_traffic';
      var _this=this;
      this.gama.current.launch( _this.tryPlay);

    }
    // window.$gama.doConnect();
  }


  tryPlay() {
    console.log("launched");
    if (this.gama.current && this.gama.current.wSocket) {// && this.gama.current.wSocket.readyState!== 

      this.gama.current.queue.length = 0;
      this.gama.current.play( console.log("play"));
    }
    // window.$gama.doConnect();
  }

  tryStep() {
    if (this.gama.current && this.gama.current.wSocket) {// && this.gama.current.wSocket.readyState!== 
      this.gama.current.queue.length = 0;
      this.gama.current.step();
    }
    // window.$gama.doConnect();
  }
  tryPause() {
    if (this.gama.current && this.gama.current.wSocket) {// && this.gama.current.wSocket.readyState!== 
      this.gama.current.queue.length = 0;
      this.gama.current.pause();
    }
    // window.$gama.doConnect();
  }
  tryReload() {
    if (this.gama.current && this.gama.current.wSocket) {// && this.gama.current.wSocket.readyState!== 
      this.gama.current.queue.length = 0;
      this.gama.current.reload();
    }
    // window.$gama.doConnect();
  }
  getNFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rdv_nav")) || {};
        // console.log(ls);
      } catch (e) {
        console.log(e);
      }
    }
    return ls[key];
  }

  saveNToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rdv_nav",
        JSON.stringify({
          [key]: value
        })
      );
    }
  }
}

export default NavigationBar;

