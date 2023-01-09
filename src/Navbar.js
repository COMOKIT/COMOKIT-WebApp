import React from 'react'
import GAMA from "./GAMA";
import { Button } from "reactstrap"; 
import { DualRing } from 'react-loading-io/dist/DualRing';
const default_Nav_state = {
  // url: "ws://51.255.46.42:6001",
  // model_path: "/var/www/github/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml",
  url: "ws://localhost:6868",
  // model_path:"C:/git/PROJECT/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml",
  // exp_name: "Closures",

  connected: false,
  loading: false,
  waiting: true,
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
    this.checkConnect = this.checkConnect.bind(this);
    this.fetchFile = this.fetchFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.tryConnect = this.tryConnect.bind(this);
    this.tryLaunch = this.tryLaunch.bind(this);
    this.tryGenParam = this.tryGenParam.bind(this);
    this.tryAutoStep = this.tryAutoStep.bind(this);
    this.tryPlay = this.tryPlay.bind(this);
    this.tryPause = this.tryPause.bind(this);
    this.tryStep = this.tryStep.bind(this);
    this.tryReload = this.tryReload.bind(this);
    this.tryClose = this.tryClose.bind(this);
    this.tryAdd = this.tryAdd.bind(this);
    this.trySave = this.trySave.bind(this);
    this.tryLoad = this.tryLoad.bind(this);
    this.waiting = this.waiting.bind(this);
  }

  componentDidMount(props) {
    this.setState((prevState) => ({
      connected: false,
      loaded: false
    }));
    // this.waiting(true);
  }

  waiting(b) {
    this.setState((prevState) => ({
      waiting: b
    }));
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.saveNToLS("Nav", this.state);
      // this.getWFromLS("Widget" + this.id);
    });
  }
  checkConnect() {
    this.setState((prevState) => ({
      connected: true
    }));
  }


  fetchFile() {
    this.setState((prevState) => ({
      loaded: true
    }));
  }

  render() {
    var addr = this.state.url;
    // if (this.gama.current && this.gama.current.wSocket && this.gama.current.wSocket.readyState === 1) {

    return (<><GAMA ref={this.gama} address={addr}  ></GAMA>
      <div>
        <table><tbody>
          <tr><td height={32}></td></tr>
          <tr>
            <td>


              <table><tbody><tr>
                <td><Button color="primary" style={{ width: "100px" }} size="sm" onClick={this.tryAdd}>Add Widget</Button></td>
                <td><Button color="primary" style={{ width: "100px" }} size="sm" onClick={this.trySave}>Save layout</Button> </td>
                <td><Button color="primary" style={{ width: "100px" }} size="sm" onClick={this.tryLoad}>Load layout</Button> </td>
              </tr></tbody></table>

            </td>
          </tr><tr>
            <td> <select
              id="select_host"
              className="form-control"
              name="url"
              onChange={this.handleChange}
              defaultValue={this.state.url}
            // defaultValue={"ws://51.255.46.42:6001"}
            >
              <option value="ws://51.255.46.42:6001">Gama ovh</option>
              <option value="wss://51.255.46.42:6001">Secure Gama ovh</option>
              <option value="ws://localhost:6868">Local</option>
              <option value="wss://localhost:6868">Secure Local</option>
            </select></td></tr><tr>
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
                <option value="/Users/hqn88/git/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml">mac Comokit local</option>
                <option value="C:/git/gama/msi.gama.models/models/Tutorials/Road Traffic/models/Model 05.gaml">Road Traffic 05.gaml</option>
              </select>
            </td></tr><tr><td><select
              id="select_exp"
              className="form-control"
              name="exp_name"
              onChange={this.handleChange}
              // defaultValue={"Closures"}
              defaultValue={this.state.exp_name}
            >
              <option value="Closures">Closures</option>
              <option value="road_traffic">road_traffic</option>
            </select></td></tr><tr>
            <td><div><table><tbody><tr width="100%">
              <td><Button color="primary" style={{ width: "100px" }} size="sm" onClick={this.tryConnect}>Connect</Button></td>
              {this.state.connected &&
                <td><Button color="primary" style={{ width: "100px" }} size="sm" onClick={this.tryLaunch}>Launch</Button> </td>
              }
            </tr></tbody></table></div>
            </td></tr>
          <tr>
            <td>
              {this.state.loaded && <div><table width="100%"><tbody><tr>
                <td><Button color="primary" style={{ width: "100px" }} size="sm" onClick={this.tryAutoStep}>AutoStep</Button> </td>
                <td><Button color="primary" style={{ width: "100px" }} size="sm" onClick={this.tryPlay}>Play</Button> </td>
                <td><Button color="primary" style={{ width: "100px" }} size="sm" onClick={this.tryPause}>Pause</Button> </td></tr><tr>
                  <td><Button color="primary" style={{ width: "100px" }} size="sm" onClick={this.tryStep}>Step</Button> </td>
                  <td><Button color="primary" style={{ width: "100px" }} size="sm" onClick={this.tryReload}>Reload</Button> </td>
                  <td><Button color="primary" style={{ width: "100px" }} size="sm" onClick={this.tryClose}>Close</Button> </td>
                </tr></tbody></table></div>
              }</td></tr>
          <tr><td>
            {
              (this.state.waiting) && <DualRing size={64} color={"dodgerblue"} speed={3.14} width={16}/>


            }</td></tr>

        </tbody></table>
      </div></>
    );

  }


  tryLoad() {
    getLocalstorageToFile("layout.txt");
  }
  trySave() {
    getLocalstorageToFile("layout.txt");
  }
  tryAdd() {
    this.props.grid.current.addWidget();
  }
  tryConnect() {
    var _this = this;
    if (!this.gama.current.wSocket) {// && this.gama.current.wSocket.readyState!==1

      this.waiting(true);
      this.gama.current.doConnect(() => {
        _this.checkConnect();
        _this.waiting(false);
        console.log("connected");
      });

    }
    // window.$gama.doConnect();
  }

  tryLaunch() {
    // if (!this.gama.current.wSocket) {
    //   this.tryConnect();
    // }
    if (this.gama.current && this.gama.current.wSocket && this.gama.current.wSocket.readyState === 1) {

      this.props.grid.current.waiting(true);
      this.waiting(true);
      this.gama.current.modelPath = this.state.model_path;
      this.gama.current.experimentName = this.state.exp_name;

      // var modelPath = 'C:/git/gama/msi.gama.models/models/Tutorials/Road Traffic/models/Model 05.gaml';
      // var experimentName = 'road_traffic';
      var _this = this;
      this.gama.current.launch(() => {
        window.$loaded = true;
        _this.fetchFile();

        console.log("loaded " + this.state.loaded);
        this.props.grid.current.waiting(false);
        this.waiting(false);
        _this.tryGenParam();
      });
      // this.gama.current.launch(_this.tryPlay);

    }
    // window.$gama.doConnect();
  }
  tryGenParam() {

    if (this.gama.current && this.gama.current.wSocket) {// && this.gama.current.wSocket.readyState!==1 

      var _this = this;
      this.gama.current.evalExpr("experiment.parameters.pairs", function (ee) {

        if (JSON.parse(ee).content && JSON.parse(ee).type === "CommandExecutedSuccessfully") {
          _this.props.grid.current.addParam(ee);
        }
      });
    }
  }

  tryAutoStep() {
    if (this.gama.current && this.gama.current.wSocket) {// && this.gama.current.wSocket.readyState!== 

      this.gama.current.queue.length = 0;
      this.gama.current.autoStep(() => { console.log("autoStep") });
      // this.gama.current.step(console.log("step"));
      // this.gama.current.play(console.log("play"));
    }
    // window.$gama.doConnect();
  }

  tryPlay() {
    if (this.gama.current && this.gama.current.wSocket) {// && this.gama.current.wSocket.readyState!== 

      this.gama.current.queue.length = 0;
      // this.gama.current.autoStep(console.log("autoStep"));
      // this.gama.current.step(console.log("step"));
      this.gama.current.play(console.log("play"));
    }
    // window.$gama.doConnect();
  }

  tryStep() {
    if (this.gama.current && this.gama.current.wSocket) {// && this.gama.current.wSocket.readyState!== 
      this.gama.current.queue.length = 0;
      this.waiting(true);
      this.gama.current.step(() => {
        console.log("step");
        this.waiting(false);
      });
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
      this.waiting(true);
      this.gama.current.reload(() => {
        console.log("reloaded");
        this.waiting(false);
      });
    }
    // window.$gama.doConnect();
  }
  tryClose() {
    if (this.gama.current && this.gama.current.wSocket) {// && this.gama.current.wSocket.readyState!== 
      this.gama.current.queue.length = 0;
      this.gama.current.reload(() => { console.log("reloaded"); });
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

function getLocalstorageToFile(fileName) {

  /* dump local storage to string */

  var a = {};
  for (var i = 0; i < localStorage.length; i++) {
    var k = localStorage.key(i);
    var v = localStorage.getItem(k);
    a[k] = v;
  }

  /* save as blob */

  var textToSave = JSON.stringify(a)
  var textToSaveAsBlob = new Blob([textToSave], {
    type: "text/plain"
  });
  var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);

  /* download without button hack */

  var downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  downloadLink.innerHTML = "Download File";
  downloadLink.href = textToSaveAsURL;
  downloadLink.onclick = function (event) {
    document.body.removeChild(event.target);
  };
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();

}

export default NavigationBar;

