import React from 'react'
import GAMA from "./GAMA";
import Select from 'react-select';
import { Card, Button, CardTitle, Spinner } from "reactstrap";

const default_Config_state = {
  data: [],
  loading: false,
  title: "",
  param: [],

  // url: "ws://51.255.46.42:6001",
  // model_path: "/var/www/github/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml",
  url: "ws://localhost:6868",
  // model_path:"C:/git/PROJECT/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml",
  // exp_name: "Closures",
  model_path: 'C:/git/gama/msi.gama.models/models/Tutorials/Road Traffic/models/Model 05.gaml@road_traffic',
  loaded: false,
  connected: false,
  waiting: false,
  expressions: [{
    label: "",
    expr: "",
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    }
  }]
};
class Config extends React.Component {
  // static id;
  constructor(param) {
    super();
    // if (typeof Config.id === 'undefined') {
    //   Config.id = 0;
    // } else {
    //   Config.id += 1;
    // }
    // this.id = "m" + Config.id;
    this._id = param.id;
    this.id = "m" + param.id;
    this.state = this.getCfgFromLS("Config" + this.id) || default_Config_state;
    this.grid = param.grid;
    this.gama = React.createRef();
    this.mySelRef = React.createRef();

    this.fetchFile = this.fetchFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeM = this.handleChangeM.bind(this);
    this.handleChangeM1 = this.handleChangeM1.bind(this);
    this.handleChangeM2 = this.handleChangeM2.bind(this);
    this.handleChangeM3 = this.handleChangeM3.bind(this);
    this.handleChangeE = this.handleChangeE.bind(this);
    this.tryConnect = this.tryConnect.bind(this);
    this.tryLaunch = this.tryLaunch.bind(this);
    this.tryGenParam = this.tryGenParam.bind(this);
    this.tryAutoStep = this.tryAutoStep.bind(this);
    this.tryPlay = this.tryPlay.bind(this);
    this.tryPause = this.tryPause.bind(this);
    this.tryStep = this.tryStep.bind(this);
    this.tryReload = this.tryReload.bind(this);
    this.tryClose = this.tryClose.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.saveCfgToLS("Config" + this.id, this.state);
      // this.getCfgFromLS("Config" + this.id);
    });
  }


  componentDidUpdate(prevProps) {
    if (this.props.triggerChildFunc !== prevProps.triggerChildFunc) {
      this.onParentTrigger();
    }
    if (this.props.triggerChildFunc2 !== prevProps.triggerChildFunc2) {
      this.onParentTrigger2();
    }
  }

  onParentTrigger() {
    this.fetchFile();

    // Let's call the passed variable from parent if it's a function
    if (this.props.triggerChildFunc && {}.toString.call(this.props.triggerChildFunc) === '[object Function]') {
      this.props.triggerChildFunc();
    }
  }
  onParentTrigger2() {
    this.setState(
      this.getCfgFromLS("Config" + this.id)
    )

    // Let's call the passed variable from parent if it's a function
    if (this.props.triggerChildFunc2 && {}.toString.call(this.props.triggerChildFunc2) === '[object Function]') {
      this.props.triggerChildFunc2();
    }
  }
  componentDidMount(props) {
    this.setState((prevState) => ({
      connected: false,
      loaded: false
    }));
    // this.saveCfgToLS("Config" + this.id, this.state);
    // if (this._id === this.grid.state.id_param) {
    // this.setState({ param: this.grid.state.param_str }, () => {
    //   this.saveCfgToLS("Config" + this.id, this.state);

    //   this.setState(this.getCfgFromLS("Config" + this.id))
    //   // this.getCfgFromLS("Config" + this.id);
    // });
    // }
  }

  waiting(b) {
    this.setState((prevState) => ({
      waiting: b
    }));
  }
  checkConnect(b) {
    this.setState((prevState) => ({
      connected: b
    }));
  }
  handleChangeM(i, e) {
    let formValues = this.state.mapbox;
    formValues[i].species = e.target.value;
    this.setState({ formValues }, () => {
      this.saveCfgToLS("Config" + this.id, this.state);
      // this.getCfgFromLS("Config" + this.id);
    });
  }

  handleChangeM1(i, e) {
    let formValues = this.state.mapbox;
    formValues[i].attributes = e.target.value;
    this.setState({ formValues }, () => {
      this.saveCfgToLS("Config" + this.id, this.state);
      // this.getCfgFromLS("Config" + this.id);
    });
  }

  handleChangeM2(i, e) {
    let formValues = this.state.mapbox;
    formValues[i].style = e.target.value;
    this.setState({ formValues }, () => {
      this.saveCfgToLS("Config" + this.id, this.state);
      // this.getCfgFromLS("Config" + this.id);
    });
  }

  handleChangeM3(i, e) {
    let formValues = this.state.mapbox;
    formValues[i].type = e.target.value;
    this.setState({ formValues }, () => {
      this.saveCfgToLS("Config" + this.id, this.state);
      // this.getCfgFromLS("Config" + this.id);
    });
  }

  handleChangeL(i, e) {
    let formValues = this.state.expressions;
    formValues[i].label = e.target.value;
    this.setState({ formValues }, () => {
      this.saveCfgToLS("Config" + this.id, this.state);
      // this.getCfgFromLS("Config" + this.id);
    });
  }
  handleChangeE(i, e) {
    let formValues = this.state.expressions;
    // console.log(i+" "+formValues);
    formValues[i][e.target.name] = e.target.value;
    this.setState({ formValues }, () => {
      this.saveCfgToLS("Config" + this.id, this.state);
      // this.getCfgFromLS("Config" + this.id);
    });
  }

  addFormFields() {
    this.setState(({
      title: this.state.title,
      expressions: [...this.state.expressions, {
        expr: "",
        displayColorPicker: false,
        color: {
          r: '241',
          g: '112',
          b: '19',
          a: '1',
        }
      }]
    }), () => {
      this.saveCfgToLS("Config" + this.id, this.state);
    })
  }

  addFormMapboxFields() {
    this.setState(({
      title: this.state.title,
      mapbox: [...this.state.mapbox, {
        species: "",
        attributes: "",
      }]
    }), () => {
      this.saveCfgToLS("Config" + this.id, this.state);
    })
  }

  removeFormFields(i) {
    let formValues = this.state.expressions;
    formValues.splice(i, 1);
    this.setState({ formValues }, () => {
      this.saveCfgToLS("Config" + this.id, this.state);
    });
  }

  removeFormMapBoxFields(i) {
    let formValues = this.state.mapbox;
    formValues.splice(i, 1);
    this.setState({ formValues }, () => {
      this.saveCfgToLS("Config" + this.id, this.state);
    });
  }


  fetchFile() {
    if (this.grid.state && (this._id !== this.grid.state.id_param)) {
      this.setState((prevState) => ({
        data: [0, 1],
        loading: false
      }));
    }

  }

  render() {

    // if (this.state.loading)
    //   return (
    //     <div style={{ height: "300px", lineHeight: "300px" }}>
    //       <Spinner color="secondary" />
    //     </div>
    //   );

    // console.log(this.state.expressions);
    // console.log(this.grid.state.param_str);
    const ConfigHeader = (
      <table>
        <tbody>

          <tr>
            <td width="100%"><div className="dragHandle">
            </div></td>
            {/* <td> <Button
              className="closeBtn"
              color="info"
              size="sm"
              onClick={() => this.toConfig()}
              disabled={false && this.grid.state.waiting}
            >⚙</Button></td> */}
            <td> <Button
              className="closeBtn"
              color="danger"
              size="sm"
              onClick={() => this.grid.removeConfig(this._id, true)}
            >x</Button></td></tr>
        </tbody>
      </table>);
    // const expressions_layouts = this.state.expressions.map((element, index) => (
    //   <tr key={index}>
    //     <td>Expr</td>
    //     <td>
    //       <Input type="text" name="label" placeholder="Label" value={element.label || ""} onChange={e => this.handleChangeL(index, e)} />
    //     </td>
    //     <td>
    //       <Input type="text" name="expr" placeholder="Expression" value={element.expr || ""} onChange={e => this.handleChangeE(index, e)} />
    //     </td>

    //     <td>
    //       {((index) && this.chartType !== "single") ?
    //         <Button
    //           className="closeBtn"
    //           color="danger"
    //           size="sm"
    //           onClick={() => this.removeFormFields(index)}
    //         >
    //           X
    //         </Button>

    //         : ""}
    //     </td></tr>
    // ));

    const options = [
      { value: 'ws://51.255.46.42:6001', label: 'Gama ovh' },
      { value: 'wss://51.255.46.42:6001', label: 'Secure Gama ovh' },
      { value: 'wss://localhost:6868', label: 'Secure Local' },
      { value: 'ws://localhost:6868', label: 'Local' }
    ]

    return (
      <><GAMA ref={this.gama} ></GAMA>
        <div className="widgetHeader">
          {(this.grid.state && (this.grid.state.editing)) && ConfigHeader}
        </div>

        <div
          style={{
            height: "300px",
            width: "100%"
          }}
        >
          <Card body><CardTitle width={'100%'}>
          </CardTitle>
            <form>


              <table width={'100%'}><tbody>


                <tr><td width={20} align='left'>Server:</td>
                  <td>
                    <select
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
                    </select>

                    {/* <Select options={options} /> */}
                  </td>
                </tr>

                <tr><td colSpan={2}>
                  <div>
                    <table><tbody><tr width="100%">
                      <td><Button color="primary" style={{ width: "80px" }} size="sm" onClick={this.tryConnect}>Connect</Button></td>
                    </tr></tbody></table>
                  </div>
                </td></tr>

                <tr><td align='left'>Model:</td>
                  <td>
                    <select
                      id="select_model"
                      className="form-control"
                      name="model_path"
                      ref={this.mySelRef}
                      onChange={this.handleChange}
                      // defaultValue={"/var/www/github/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml"}                    
                      defaultValue={this.state.model_path}
                    >
                      <option value="/var/www/github/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml@Closures">ovh MESO - Closures</option>
                      <option value="C:/git/PROJECT/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml@Closures">local MESO - Closures</option>
                      <option value="C:/git/PROJECT/COMOKIT-Model/COMOKIT/Macro/Models/Experiments/No containment.gaml@No Containment">local MACRO - No Containment</option>
                      <option value="/var/www/github/COMOKIT-Model/COMOKIT/Macro/Models/Experiments/No containment.gaml@No Containment">ovh MACRO - No Containment</option>
                      <option value="/Users/hqn88/git/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml@Closures">macs local - Closures</option>
                      <option value="C:/git/gama/msi.gama.models/models/Tutorials/Road Traffic/models/Model 07.gaml@road_traffic">Road Traffic 07.gaml - road_traffic</option>
                    </select>
                  </td></tr>


                <tr><td colSpan={2}>
                  <div><table><tbody><tr width="100%">
                    {this.state.connected &&
                      <td><Button color="primary" style={{ width: "80px" }} size="sm" onClick={this.tryLaunch}>Launch</Button></td>
                    }
                  </tr></tbody></table></div>
                </td></tr>

                <tr><td colSpan={2}><div>
                  <table><tbody><tr width="100%">
                    {this.state.loaded && <td><Button color="primary" size="sm" onClick={this.tryAutoStep}>↹</Button> </td>}

                    {this.state.loaded && <td><Button color="primary" size="sm" onClick={this.tryPlay}>▷</Button> </td>}

                    {this.state.loaded && <td><Button color="primary" size="sm" onClick={this.tryPause}>❚❚</Button> </td>}

                    {this.state.loaded && <td><Button color="primary" size="sm" onClick={this.tryStep}>⏯</Button> </td>}

                    {this.state.loaded && <td><Button color="primary" size="sm" onClick={this.tryReload}>↻</Button> </td>}

                    {this.state.loaded && <td><Button color="primary" size="sm" onClick={this.tryClose}>✕</Button> </td>}
                  </tr></tbody></table></div></td>
                </tr>




                <tr><td colSpan={2}>
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


              </tbody></table>

            </form>
          </Card>
        </div></>
    );

    // if (this.props.updateMethod) {
    //   this.Method();
    // }
    // return <><div className="ConfigHeader">
    //   {(this.grid.state && (this.grid.state.editing)) && ConfigHeader}
    // </div><SingleCharts props={this.state}></SingleCharts></>;
  }


  tryConnect() {
    var _this = this;
    if (!this.gama.current.wSocket) {// && this.gama.current.wSocket.readyState!==1 
      this.waiting(true);
      this.gama.current.connect(this.state.url, () => {
        _this.checkConnect(true);
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
      // console.log(this.props.grid);
      this.props.grid.waiting(true);
      this.waiting(true);
      console.log(this.mySelRef.current.value);
      this.gama.current.modelPath = this.mySelRef.current.value.split("@")[0];
      this.gama.current.experimentName = this.mySelRef.current.value.split("@")[1];

      // var modelPath = 'C:/git/gama/msi.gama.models/models/Tutorials/Road Traffic/models/Model 05.gaml';
      // var experimentName = 'road_traffic';
      var _this = this;
      this.gama.current.launch((e) => {
        // console.log(e);
        if (e.type === "CommandExecutedSuccessfully") {
          window.$loaded = true;
          this.setState((prevState) => ({
            loaded: true
          }));
          console.log("loaded " + this.state.loaded);
          _this.tryGenParam();
        }
        this.props.grid.waiting(false);
        this.waiting(false);
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
          _this.props.grid.addParam(ee);
          _this.props.grid.onShowClick(function () { console.log("shown") });
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
      var pp = [];
      this.props.grid.state.param_str_new.forEach((value, key, map) => {
        var v = value['value'];
        var t = "string";
        if (!isNaN(v)) {
          t = "float";
          if (v.indexOf('.') === -1) { t = "int"; }
        }
        pp.push({ "name": "" + value['key'], "value": v, "type": t });
      });

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
      this.gama.current.pause(() => {
        console.log("disconnected");
        this.setState((prevState) => ({
          loaded: false
        }));
        this.gama.current.wSocket = null;
        this.checkConnect(false);
        this.props.grid.onShowClick(null);
      });
      // this.gama.current.reload(() => { console.log("reloaded"); });
    }
    // window.$gama.doConnect();
  }
  getCfgFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rdv_Config" + key)) || {};
        if (ls[key]) {
          ls[key].expressions.map((element, index) => ({}));
        }
        // console.log(ls);
      } catch (e) {
        console.log(e + " " + key + " " + ls[key]);
        return default_Config_state;
      }
    }
    return ls[key];
  }

  saveCfgToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rdv_Config" + key,
        JSON.stringify({
          [key]: value
        })
      );
    }
  }
}

export default Config;
