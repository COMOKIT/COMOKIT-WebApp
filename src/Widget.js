import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import Charts from "./Chart";
import { Input, Card, Button, CardTitle } from "reactstrap";
import BaseMap from "./BaseMap";
const default_Widget_state = {
  data: [],
  loading: false,
  title: "",
  chartType: "geojson",
  param: [],
  mapbox: [{
    species: "",
    attributes: "",
    style: "",
  }],
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

    this.toConfig = this.toConfig.bind(this);
    this.fetchFile = this.fetchFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleChangeCBBOX = this.handleChangeCBBOX.bind(this);
    this.handleChangeM = this.handleChangeM.bind(this);
    this.handleChangeM1 = this.handleChangeM1.bind(this);
    this.handleChangeM2 = this.handleChangeM2.bind(this);
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
    // this.saveWToLS("Widget" + this.id, this.state);
    // if (this._id === this.grid.state.id_param) {
    this.setState({ param: this.grid.state.param_str }, () => {
      this.saveWToLS("Widget" + this.id, this.state);
      // this.getWFromLS("Widget" + this.id);
    });
    // }
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

  handleChangeM(i, e) {
    let formValues = this.state.mapbox;
    formValues[i].species = e.target.value;
    this.setState({ formValues }, () => {
      this.saveWToLS("Widget" + this.id, this.state);
      // this.getWFromLS("Widget" + this.id);
    });
  }

  handleChangeM1(i, e) {
    let formValues = this.state.mapbox;
    formValues[i].attributes = e.target.value;
    this.setState({ formValues }, () => {
      this.saveWToLS("Widget" + this.id, this.state);
      // this.getWFromLS("Widget" + this.id);
    });
  }

  handleChangeM2(i, e) {
    let formValues = this.state.mapbox;
    formValues[i].style = e.target.value;
    this.setState({ formValues }, () => {
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

  addFormMapboxFields() {
    this.setState(({
      title: this.state.title,
      mapbox: [...this.state.mapbox, {
        species: "",
        attributes: "",
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

  removeFormMapBoxFields(i) {
    let formValues = this.state.mapbox;
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

  toConfig() {
    this.setState((prevState) => ({
      data: [],
      loading: false
    }));

  }

  render() {
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '24px',
          borderRadius: '0px',
          background: `rgba(241,112,19,1)`,
        },
        swatch: {
          margin: '0px',
          padding: '0px',
          background: '#fff',
          borderRadius: '0px',
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

    // if (this.state.loading)
    //   return (
    //     <div style={{ height: "300px", lineHeight: "300px" }}>
    //       <Spinner color="secondary" />
    //     </div>
    //   );

    // console.log(this.state.expressions);
    // console.log(this.grid.state.param_str);

    if (this.state.data.length < 1) {
      // console.log(this._id);
      // console.log(this.grid.state.id_param);
      const mapbox_layouts = this.state.mapbox.map((element, index) => (
        <table key={index} width={'100%'}><tbody><tr>
          <td>Species</td>
          <td>
            <Input type="text" name="species" value={element.species || ""} onChange={e => this.handleChangeM(index, e)} />
          </td></tr><tr>
            <td>Attr</td>
            <td>
              <Input type="text" name="attr" value={element.attributes || ""} onChange={e => this.handleChangeM1(index, e)} />


            </td></tr><tr>
            <td>Style</td>
            <td>
              <Input type="textarea" name="style" value={element.style || ""} onChange={e => this.handleChangeM2(index, e)} />


            </td>
            <td>
              {index ?
                <Button
                  className="closeBtn"
                  color="danger"
                  size="sm"
                  onClick={() => this.removeFormMapBoxFields(index)}
                >
                  X
                </Button>

                : null}
            </td></tr></tbody></table>
      ));
      const expressions_layouts = this.state.expressions.map((element, index) => (
        <tr key={index}>
          <td>Expr</td>
          <td width={'100%'}>
            <Input type="text" name="expr" value={element.expr || ""} onChange={e => this.handleChangeE(index, e)} />
          </td>
          <td>
            <div>
              <div style={{
                margin: '0px',
                cursor: 'pointer',
                padding: '0px',
                width: '32px',
                height: '32px',
                background: `rgba(${element.color.r}, ${element.color.g}, ${element.color.b}, ${element.color.a})`,
              }} onClick={() => this.handleClick(index)} />
              {element.displayColorPicker ? <div style={styles.popover}>
                <div style={styles.cover} onClick={() => this.handleClose(index)} />
                <SketchPicker color={element.color} onChange={e => this.handleChangeColor(index, e)} />
              </div> : null}

            </div>
          </td>
          <td>
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
          </td></tr>
      ));
      const param_layouts = (this.grid.state && (this._id === this.grid.state.id_param)) ? this.state.param.map((e, index) => (
        <tr key={e['key']} ><td width={50}>{e['key']}</td>
          <td> <Input type="text" name={"param_" + e['key']}
            value={e['value'] || ""} onChange={e => this.handleChangeCBBOX(index, e)}
          />
          </td>
          <td width={50}><Input type="checkbox" value={e['value']} id={"use_param_" + e['key']}
            onChange={(e) => this.handleFuel(e)} /></td></tr>


      )) : null;

      return (
        <><div className="widgetHeader">
          <table>
            <tbody>

              <tr>
                <td> <Button
                  color="info"
                  size="sm"
                  onClick={() => this.toConfig()}
                >
                  ⚙
                </Button></td>
                <td width="100%"><div className="dragHandle">
                </div></td>
                <td> <Button
                  className="closeBtn"
                  color="danger"
                  size="sm"
                  onClick={() => this.grid.removeWidget(this._id)}
                >
                  X
                </Button></td></tr>
            </tbody>
          </table>
        </div>

          <div
            style={{
              height: "300px",
              width: "100%"
            }}
          >
            <Card body><CardTitle>
              {(this.grid.state && (this._id === this.grid.state.id_param)) && <div style={{ padding: 0 }}>Parameters</div>}
            </CardTitle>

              {(this.grid.state && (this._id === this.grid.state.id_param)) &&
                <table width={'100%'}>
                  <tbody>
                    {param_layouts}
                  </tbody>
                </table>}
              {(this.grid.state && (this._id !== this.grid.state.id_param)) &&
                <table width={'100%'}>
                  <tbody>
                    <tr><td width={25}>Type</td><td colSpan={2}>
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
                      <td width={50}>
                        <Button color="primary" size="sm" onClick={this.fetchFile} disabled={false && this.grid.state.waiting}>
                          Show
                        </Button></td>
                    </tr>
                  </tbody>
                </table>}
              <form>
                {(this.state.chartType === "geojson" && this.grid.state && this._id !== this.grid.state.id_param) &&
                  <><div>
                    <table width={'100%'}><tbody><tr>
                      <td>Title </td>
                      <td>
                        <Input type="text" name="title" value={this.state.title || ""}
                          onChange={this.handleChange} /></td></tr>
                    </tbody></table>
                    {mapbox_layouts}
                  </div>
                    <Button color="primary" size="sm" onClick={() => this.addFormMapboxFields()}>
                      Add Source
                    </Button>
                  </>}
                {this.state.chartType === "expression" &&
                  <><div>
                    <table width={'100%'}><tbody><tr>
                      <td>Title </td>
                      <td colSpan={3}>
                        <Input type="text" name="title" value={this.state.title || ""}
                          onChange={this.handleChange} /></td></tr>
                      {expressions_layouts}</tbody></table>
                  </div>
                    <Button color="primary" size="sm" onClick={() => this.addFormFields()}>
                      Add Expression
                    </Button>
                  </>}
              </form>
            </Card>
          </div></>
      );
    }
    if (this.state.chartType === "expression") {
      return <><div className="widgetHeader">
        <table>
          <tbody>

            <tr>
              <td> <Button
                color="info"
                size="sm"
                onClick={() => this.toConfig()}
              >
                ⚙
              </Button></td>
              <td width="100%"><div className="dragHandle">
              </div></td>
              <td> <Button
                className="closeBtn"
                color="danger"
                size="sm"
                onClick={() => this.grid.removeWidget(this._id)}
              >
                X
              </Button></td></tr>
          </tbody>
        </table>
      </div><Charts props={this.state}></Charts></>;
    }
    return (<><div className="widgetHeader">
      <table>
        <tbody>

          <tr>
            <td> <Button
              color="info"
              size="sm"
              onClick={() => this.toConfig()}
            >
              ⚙
            </Button></td>
            <td width="100%"><div className="dragHandle">
            </div></td>
            <td> <Button
              className="closeBtn"
              color="danger"
              size="sm"
              onClick={() => this.grid.removeWidget(this._id)}
            >
              X
            </Button></td></tr>
        </tbody>
      </table>
    </div><BaseMap parent={this} props={this.state} /></>
    )
      ;
  }



  getWFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rdv_widget" + key)) || {};
        if (ls[key]) {
          ls[key].mapbox.map((element, index) => (<></>
          ));
          ls[key].expressions.map((element, index) => (<></>
          ));
        }
        // console.log(ls);
      } catch (e) {
        console.log(e + " " + key + " " + ls[key]);
        return default_Widget_state;
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
