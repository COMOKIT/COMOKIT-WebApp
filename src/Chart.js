import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

require("highcharts/modules/exporting")(Highcharts);

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: {
        text: props.expr
      },
      series: [
        {
          data: []
        }
      ]
    };

    window.$gama.addOutput(this, this);
    // console.log(window.$gama.outputs);
    this.expression = props.expr;
    this.update = this.update.bind(this);
    // this.updateSource = setInterval(() => {
    //   window.$gama.evalExpr(props.expr, function (ee) {
    //     // ee = JSON.parse(ee).result.replace(/[{}]/g, "");
    //     // var eee = ee.split(",");
    //     // console.log(eee[0]);
    //     // console.log(eee[1]);
    //   });
    // }, 1000);
  }

  update(c) {
    // console.log(this.expression);
    let _this = this;
    window.$gama.evalExpr(this.expression, function (ee) {
      // console.log("finish "+_this);
      _this.state.series[0].data.push(parseInt(JSON.parse(ee).result));
      _this.setState({ series: [{ data: _this.state.series[0].data }] });
      if (c) {
        c();
      }
    });
  }
  componentWillUnmount() {

    window.$gama.outputs.delete(this);
    // console.log(window.$gama.outputs);
  }
  componentDidMount() {

    // _this.interval = setInterval(function () {
    // }, 2000);
  }
  render() {
    return (
      <div>
        <HighchartsReact
          constructorType={"chart"}
          highcharts={Highcharts}
          options={this.state}
          containerProps={{ className: "chartContainer" }}
        />
      </div>
    );
  }
}

export default Charts;
