import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import Charts from "./Chart";
import { Spinner, Card, Button, CardTitle } from "reactstrap";
import BaseMap from "./BaseMap";
import { Input, IconButton, Whisper, Tooltip } from "rsuite";
import { Conversion, Plus } from '@rsuite/icons';
import "rsuite/dist/rsuite.min.css";

const ButtonStyle = { margin: "5px 5px" };
const default_Widget_state = {
  data: [],
  loading: false,
  title: "",
  chartType: "geojson",
  param: [],
  expressions: [{
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
    this._id = param.id;
    this.id = "m" + param.id;
    this.state = this.getWFromLS("Widget" + this.id) || default_Widget_state;
    this.grid = param.grid;

    this.fetchFile = this.fetchFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleChangeCBBOX = this.handleChangeCBBOX.bind(this);
    this.handleChangeE = this.handleChangeE.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFuel = this.handleFuel.bind(this);
  }

  handleFuel(event) {
    // let checkbox = event.target.checked;  
    // console.log(event.target); 
    console.log(event.target.value);
    // this.setState({ values: nValues });
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

  componentDidMount(props) {
    if (this._id === this.grid.state.id_param) {
      this.setState({ param: this.grid.state.param_str }, () => {
        this.saveWToLS("Widget" + this.id, this.state);
        // this.getWFromLS("Widget" + this.id);
      });
    }
  }
  handleChangeCBBOX(i, e) {
    let formValues = this.state.param;
    formValues[i]["value"] = e.target.value;
    // console.log(formValues[i]);
    this.setState({ param: formValues }, () => {
      this.saveWToLS("Widget" + this.id, this.state);
      // this.getWFromLS("Widget" + this.id);
    });
  }

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

    // console.log(this.state.expressions);
    // console.log(this.grid.state.param_str);

    if (this.state.data.length < 1) {
      // console.log(this.id);
      // console.log(this.grid.state.id_param);
      return (
        <div
          style={{
            height: "300px",
            width: "100%"
          }}
        >
          <Card body><CardTitle>
            {this._id === this.grid.state.id_param && <div style={{ padding: 0 }}>Parameters</div>}
          </CardTitle>

            {this._id === this.grid.state.id_param && this.state.param.map((e, index) => (
              <table key={e['key']}>
                <tbody>
                  <tr><td width="150px">{e['key']}</td>
                    <td width="200px"> <Input type="text" name={"param_" + e['key']}
                      value={e['value'] || ""} onChange={e => this.handleChangeCBBOX(index, e)}
                    />
                    </td><td><Input type="checkbox" value={e['value']} id={"use_param_" + e['key']}
                      onChange={(e) => this.handleFuel(e)} /></td></tr>

                </tbody>
              </table>

            ))}
            {
              this._id !== this.grid.state.id_param &&
              <table>
                <tbody>
                  <tr><td>Type</td><td>
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
                    </select>
                  </td>
                    <td>
                      <Whisper placement="bottom" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Activate</Tooltip>}>
                        <IconButton icon={<Conversion />} color="blue"
                          appearance="primary" style={ButtonStyle} onClick={this.fetchFile} /></Whisper>
                    </td>
                  </tr>
                  {/* <tr><td>Expression</td><td>

                  <Input id="input1" name="expression" onChange={this.handleChange}
                    defaultValue={this.state.expression}></Input>

                </td></tr> */}
                </tbody>
              </table>
            }
            < form >
              {
                this.state.chartType === "expression" &&
                <div>
                  <Input type="text" name="title" value={this.state.title || ""}
                    onChange={this.handleChange} /></div>
              }
              {
                this.state.chartType === "expression" && <div className="form-inline" ><label>Expressions  </label><IconButton icon={<Plus />} color="blue"
                  appearance="primary" style={ButtonStyle} onClick={() => this.addFormFields()} /></div>
              }
              {this.state.chartType === "expression" && this.state.expressions.map((element, index) => (
                <div className="form-inline" key={index}>

                  <div>
                    <Input type="text" name="expr" value={element.expr || ""} onChange={e => this.handleChangeE(index, e)} />

                  </div>
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

                    </div>
                  </div>
                  <div>
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
            </form>
          </Card>
        </div >
      );
    }
    if (this.state.chartType === "expression") {
      return <Charts props={this.state}></Charts>;
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
