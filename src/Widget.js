import React from 'react'
import Charts from "./Chart";
import { Input, Spinner, Card, Button, CardTitle } from "reactstrap";
import BaseMap from "./BaseMap";
const default_Widget_state = {
  data: [],
  loading: false,
  expression: '',
  chartType: "geojson"
};
class Widget extends React.Component {
  // static id;
  constructor(param) {
    super();
    // if (typeof Widget.id === 'undefined') {
    //   Widget.id = 0;
    // } else {
    //   Widget.id += 1;
    // }
    // this.id = "m" + Widget.id;
    this.id = "m" + param.id;
    this.state = this.getWFromLS("Widget" + this.id) || default_Widget_state;

    this.fetchFile = this.fetchFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.saveWToLS("Widget" + this.id, this.state);
      this.getWFromLS("Widget" + this.id);
    });
  }

  fetchFile() {
    // this.setState((prevState) => ({
    //   data: prevState.data,
    //   loading: true
    // }));
    // const url = this.state.url;
    // const chartType = this.state.chartType;

    // console.log(url);s
    this.setState((prevState) => ({
      data: [0, 1],
      loading: false
    }));

    // fetch(url)
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       result.chart = { type: chartType };
    //       console.log(result);
    //       this.setState({
    //         data: result,
    //         loading: false
    //       });
    //     },
    //     (error) => {
    //       console.log(error);
    //       alert(error);
    //     }
    //   );
  }

  render() {
    if (this.state.loading)
      return (
        <div style={{ height: "300px", lineHeight: "300px" }}>
          <Spinner color="secondary" />
        </div>
      );

    if (this.state.data.length < 1) {
      return (
        <div
          style={{
            height: "300px",
            width: "100%"
          }}
        >
          <Card body><CardTitle>  </CardTitle>
            <table>
              <tbody>
                {/* <tr><td>GAMA Server< /td><td>
                  <select
                    id="select_host"
                    className="form-control"
                    name="url"
                    onChange={this.handleChange}
                    defaultValue={this.state.url}
                  // defaultValue={"ws://51.255.46.42:6001"}
                  >
                    <option value="ws://51.255.46.42:6001">Gama ovh</option>
                    <option value="ws://localhost:6868">Local ws://localhost:6868/</option>
                  </select>
                </td></tr>
                <tr><td>Model</td><td>
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
                </td></tr>
                <tr><td>Experiment</td><td>
                  <select
                    id="select_exp"
                    className="form-control"
                    name="exp_name"
                    onChange={this.handleChange}
                    // defaultValue={"Closures"}
                    defaultValue={this.state.exp_name}
                  >
                    <option value="Closures">Closures</option>
                    <option value="road_traffic">road_traffic</option>
                  </select>
                </td></tr>*/}
                <tr><td>Display type</td><td>

                  <select
                    id="select1"
                    className="form-control"
                    name="chartType"
                    onChange={this.handleChange}
                    // defaultValue={"geojson"}
                    defaultValue={this.state.chartType}
                  >
                    <option value="geojson">Geojson</option>
                    <option value="expression">Expression</option>
                    <option value="image">Image</option>
                  </select>
                </td></tr>
                <tr><td>Expression</td><td>

                  <Input id="input1" name="expression" onChange={this.handleChange}
                    defaultValue={this.state.expression}></Input>
                </td></tr>
              </tbody>
            </table>

            <Button color="primary" onClick={this.fetchFile}>
              Connect
            </Button>
          </Card>
        </div>
      );
    }
    if (this.state.chartType === "expression") {

      return <Charts expr={this.state.expression}></Charts>;
    }
    return (
      <BaseMap parent={this} />
    )
      ;
  }



  getWFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rdv_widget" + key)) || {};
        // console.log(ls);
      } catch (e) {
        console.log(e);
      }
    }
    return ls[key];
  }

  saveWToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rdv_widget" + key,
        JSON.stringify({
          [key]: value
        })
      );
    }
  }
}

export default Widget;
