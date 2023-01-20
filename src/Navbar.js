import React from 'react'
import GAMA from "./GAMA";
import { Button, Spinner } from "reactstrap";
const default_Nav_state = {
  // url: "ws://51.255.46.42:6001",
  // model_path: "/var/www/github/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml",
  url: "ws://localhost:6868",
  // model_path:"C:/git/PROJECT/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml",
  // exp_name: "Closures",

  connected: false,
  loading: false,
  waiting: false,
  model_path: 'C:/git/gama/msi.gama.models/models/Tutorials/Road Traffic/models/Model 05.gaml@road_traffic'
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
    this.tryEdit = this.tryEdit.bind(this);
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
    console.log(e.target.name);
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
    // if (this.gama.current && this.gama.current.wSocket && this.gama.current.wSocket.readyState === 1) {

    return (<><GAMA ref={this.gama} ></GAMA>
      <table height={"100%"}><tbody><tr><td valign="bottom">
        <div>
          <table><tbody>

            <tr><td>
              {
                (this.state.waiting) &&
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden"> Loading...</span>
                </Button>
              }
            </td></tr>

            <tr><td><div>
              <table><tbody><tr width="100%">
                {this.state.loaded && <td><Button color="primary" size="sm" onClick={this.tryAutoStep}>↹</Button> </td>}

                {this.state.loaded && <td><Button color="primary" size="sm" onClick={this.tryPlay}>▷</Button> </td>}

                {this.state.loaded && <td><Button color="primary" size="sm" onClick={this.tryPause}>❚❚</Button> </td>}

                {this.state.loaded && <td><Button color="primary" size="sm" onClick={this.tryStep}>⏯</Button> </td>}

                {this.state.loaded && <td><Button color="primary" size="sm" onClick={this.tryReload}>↻</Button> </td>}

                {this.state.loaded && <td><Button color="primary" size="sm" onClick={this.tryClose}>✕</Button> </td>}
              </tr></tbody></table></div></td>
            </tr>

            <tr>
              <td>
                <select
                  id="select_model"
                  className="form-control"
                  name="model_path"
                  onChange={this.handleChange}
                  // defaultValue={"/var/www/github/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml"}                    
                  defaultValue={this.state.model_path}
                >
                  <option value="/var/www/github/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml@Closures">Comokit ovh - Closures</option>
                  <option value="C:/git/PROJECT/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml@Closures">Comokit local - Closures</option>
                  <option value="/Users/hqn88/git/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml@Closures">mac Comokit local - Closures</option>
                  <option value="C:/git/gama/msi.gama.models/models/Tutorials/Road Traffic/models/Model 05.gaml@road_traffic">Road Traffic 05.gaml - road_traffic</option>
                </select>
              </td></tr>

            <tr>
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
              </select></td>
            </tr>


            <tr><td><div><table><tbody><tr width="100%">
              <td><Button color="primary" style={{ width: "70px" }} size="sm" onClick={this.tryConnect}>Connect</Button></td>

              {this.state.connected &&
                <td><Button color="primary" style={{ width: "70px" }} size="sm" onClick={this.tryLaunch}>Launch</Button></td>
              }
            </tr></tbody></table></div>
            </td></tr>

            <tr>
              <td>
                <table><tbody><tr>
                  <td><Button color="primary" outline style={{ width: "50px" }} size="lg" onClick={this.tryEdit}>✎</Button></td>
                  <td><Button color="primary" outline style={{ width: "50px" }} size="lg" onClick={this.tryAdd}>✚</Button></td>
                  <td><Button color="primary" outline style={{ width: "50px" }} size="lg" onClick={this.trySave}>S</Button> </td>
                  <td><Button color="primary" outline style={{ width: "50px" }} size="lg" onClick={this.tryLoad}>O</Button> </td>
                </tr></tbody></table>

              </td>
            </tr>
            <tr><td height={50}></td></tr>
          </tbody></table>
        </div>
      </td></tr></tbody></table>
    </>
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
  tryEdit() {
    this.props.grid.current.toggleEdit();
  }
  tryConnect() {
    var _this = this;
    if (!this.gama.current.wSocket) {// && this.gama.current.wSocket.readyState!==1 
      this.waiting(true);
      this.gama.current.connect(this.state.url, () => {
        _this.checkConnect();
        _this.waiting(false);
        console.log("connected");
      }, () => {
        _this.waiting(false);
        console.log("disconnected");
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
      this.gama.current.modelPath = this.state.model_path.split("@")[0];
      this.gama.current.experimentName = this.state.model_path.split("@")[1];

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
          _this.props.grid.current.onShowClick();
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
      this.gama.current.play(() => { console.log("play") });
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
      // this.props.grid.current.state.param_str_new.map((e, index) =>  {

      //   console.log(e['key']+" "+ e['value']);
      //   return "";

      // });


      var pp = [];
      this.props.grid.current.state.param_str_new.forEach((value, key, map) => {  
        var v = value['value'];
        var t = "string";
        if (!isNaN(v)) {
          t = "float";
          if (v.indexOf('.') === -1) { t = "int"; }
        }
        pp.push({ "name": "" + value['key'], "value": v, "type": t });
      });
      
      console.log(pp);
      // var pp = [];
      // parameters.forEach((value, key, map) => {
      // 	if ($('#use_param_' + key).prop('checked')) {
      // 		var v = $('#param_' + key).val();
      // 		var t;
      // 		t = "string";
      // 		if (!isNaN(v)) {
      // 			t = "float";
      // 			if (v.indexOf('.') === -1) { t = "int"; }
      // 		}

      // 		pp.push({ "name": "" + key, "value": v, "type": t });
      // 	}
      // })
      // // console.log(pp);
      this.gama.current.setParameters(pp);
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

