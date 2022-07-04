import React from 'react'
// import Charts from "./Chart";
import { Spinner, Card, Button, CardTitle } from "reactstrap";
import BaseMap from "./BaseMap";

class Widget extends React.Component {
  static id;
  constructor() {
    super();
    if (typeof Widget.id === 'undefined') {
      Widget.id = 0;
    } else {
      Widget.id += 1;
    }
    this.id = "m" + Widget.id;

    this.state = {
      data: [],
      loading: false,
      // url: "ws://localhost:6868",
      url: "ws://51.255.46.42:6001",
      model_path: "/var/www/github/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml",
      exp_name: "Closures",
      chartType: "geojson"
    };

    this.fetchFile = this.fetchFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
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
                <tr><td>URL</td><td>
                  <select
                    id="select_host"
                    className="form-control"
                    name="url"
                    onChange={this.handleChange}
                    defaultValue={"ws://localhost:6868/"}
                  >
                    <option value="ws://localhost:6868/">Local ws://localhost:6868/</option>
                    <option value="ws://51.255.46.42:6001">Gama ovh</option>
                  </select>
                </td></tr>
                <tr><td>Model</td><td>
                  <select
                    id="select_model"
                    className="form-control"
                    name="model_path"
                    onChange={this.handleChange}

                    value={this.model_path}
                    defaultValue={{ label: "Comokit local", value: "C:\\git\\PROJECT\\COMOKIT-Model\\COMOKIT\\Meso\\Models\\Experiments\\Activity Restrictions\\School and Workplace Closure.gaml" }}
                  >
                    <option value="C:\\git\\gama/msi.gama.models/models/Tutorials/Road Traffic/models/Model 05.gaml">Road Traffic 05.gaml</option>
                    <option value="C:\\git\\PROJECT\\COMOKIT-Model\\COMOKIT\\Meso\\Models\\Experiments\\Activity Restrictions\\School and Workplace Closure.gaml">Comokit local</option>
                    <option value="/var/www/github/COMOKIT-Model/COMOKIT/Meso/Models/Experiments/Activity Restrictions/School and Workplace Closure.gaml">Comokit ovh</option>
                  </select>
                </td></tr>
                <tr><td>Experiment</td><td>

                  <select
                    id="select_exp"
                    className="form-control"
                    name="exp_name"
                    onChange={this.handleChange}
                    defaultValue={"Closures"}
                  >
                    <option value="road_traffic">road_traffic</option>
                    <option value="Closures">Closures</option>
                  </select>
                </td></tr>
                <tr><td>Display type</td><td>

                  <select
                    id="select1"
                    className="form-control"
                    name="chartType"
                    onChange={this.handleChange}
                    defaultValue={"geojson"}
                  >
                    <option value="geojson">Geojson</option>
                    <option value="expression">Expression</option>
                    <option value="image">Image</option>
                  </select>
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
    // return <Charts data={this.state.data}></Charts>;
    return (
      <BaseMap parent={this} />
    )
      ;
  }
}

export default Widget;
