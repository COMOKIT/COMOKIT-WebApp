import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import Charts from "./Chart";
import { Input, Spinner, Card, Button, CardTitle } from "reactstrap";
import BaseMap from "./BaseMap";
const default_Widget_state = {
  data: [],
  loading: false,
  chartType: "geojson",


  expressions: [{
    expr: "",
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    }
  }, {
    expr: "s",
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    }
  }]
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
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleChangeE = this.handleChangeE.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.saveWToLS("Widget" + this.id, this.state);
      // this.getWFromLS("Widget" + this.id);
    });
  }


  handleClick(i) {

    let formValues = this.state.expressions;
    formValues[i].displayColorPicker = !formValues[i].displayColorPicker;
    this.setState({ formValues }, () => {
      this.saveWToLS("Widget" + this.id, this.state);
      // this.getWFromLS("Widget" + this.id);
    });
    // this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose(i) {
    let formValues = this.state.expressions;
    formValues[i].displayColorPicker = false;
    this.setState({ formValues }, () => {
      this.saveWToLS("Widget" + this.id, this.state);
      // this.getWFromLS("Widget" + this.id);
    });
  };

  handleChangeColor(i, c) {

    let formValues = this.state.expressions;
    formValues[i].color = c.rgb;
    this.setState({ formValues }, () => {
      this.saveWToLS("Widget" + this.id, this.state);
      // this.getWFromLS("Widget" + this.id);
    });
  };

  handleChangeE(i, e) {
    let formValues = this.state.expressions;
    formValues[i][e.target.name] = e.target.value;
    this.setState({ formValues }, () => {
      this.saveWToLS("Widget" + this.id, this.state);
      // this.getWFromLS("Widget" + this.id);
    });
  }

  addFormFields() {
    this.setState(({
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
      this.saveWToLS("Widget" + this.id, this.state);
    })
  }

  removeFormFields(i) {
    let formValues = this.state.expressions;
    formValues.splice(i, 1);
    this.setState({ formValues }, () => {
      this.saveWToLS("Widget" + this.id, this.state);
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
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(241,112,19,1)`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });
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
                {/* <tr><td>Expression</td><td>

                  <Input id="input1" name="expression" onChange={this.handleChange}
                    defaultValue={this.state.expression}></Input>

                </td></tr> */}
              </tbody>
            </table>

            <Button color="primary" onClick={this.fetchFile}>
              Connect
            </Button>
            <form  >
              {this.state.expressions.map((element, index) => (

                <div className="form-inline" key={index}>
                  <div><label>Expression</label></div>
                  <div>
                    <Input type="text" name="expr" value={element.expr || ""} onChange={e => this.handleChangeE(index, e)} /></div>
                  <div>
                    <div>
                      <div style={styles.swatch} onClick={() => this.handleClick(index)}>
                        <div style={{
                          width: '36px',
                          height: '14px',
                          borderRadius: '2px',
                          background: `rgba(${element.color.r}, ${element.color.g}, ${element.color.b}, ${element.color.a})`,
                        }} />
                      </div>
                      {element.displayColorPicker ? <div style={styles.popover}>
                        <div style={styles.cover} onClick={() => this.handleClose(index)} />
                        <SketchPicker color={element.color} onChange={e => this.handleChangeColor(index, e)} />
                      </div> : null}

                    </div></div>
                  <div>
                    {/* <input type="text" name="color" value={element.color || ""} /> */}
                    {index ?
                      <Button
                        className="closeBtn"
                        color="danger"
                        size="sm"
                        onClick={() => this.removeFormFields(index)}
                      >
                        X
                      </Button>

                      : null}
                  </div>
                </div>
              ))
              }

              <Button color="primary" onClick={() => this.addFormFields()}>
                Add Expression
              </Button>

            </form>
          </Card>
        </div>
      );
    }
    if (this.state.chartType === "expression") {
      return <Charts expr={this.state.expressions}></Charts>;
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
