import React from 'react'
// import Charts from "./Chart";
import { Input, Spinner, Card, Button, CardTitle } from "reactstrap";


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
    this.id = "m"+Widget.id;

    this.state = {
      data: [],
      loading: false,
      url: "",
      chartType: "line"
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
    this.setState((prevState) => ({
      data: prevState.data,
      loading: true
    }));
    // const url = this.state.url;
    // const chartType = this.state.chartType;

    // console.log(url);

    this.setState((prevState) => ({
      data: [0, 1],
      loading: false
    }));

    // socket.addEventListener('open', (event) => { 
    //   console.log("connected");
    // });
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
          <br />
          <Card body>
            <CardTitle>Enter URL to fetch JSON data</CardTitle>
            <Input id="input1" name="url" onChange={this.handleChange}></Input>
            <br />
            <label>Select chart type</label>
            <select
              id="select1"
              className="form-control"
              name="chartType"
              onChange={this.handleChange}
            >
              <option value="line">Line</option>
              <option value="scatter">Scatter</option>
              <option value="column">Column</option>
            </select>
            <br />
            <Button color="primary" onClick={this.fetchFile}>
              Convert
            </Button>
          </Card>
        </div>
      );
    }

    // return <Charts data={this.state.data}></Charts>;
    return (
      <BaseMap id={this.id} />
    )
      ;
  }
}

export default Widget;
