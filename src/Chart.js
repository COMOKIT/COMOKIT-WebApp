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
      ]
    };

    window.$gama.addOutput(this, this);
    // console.log(window.$gama.outputs);
    this.expressions = props.expr;
    let _this = this;
    this.expressions.forEach((value, index, array) => {

      _this.state.series.push({
        data: [],
        name: value.expr,
        color: value.color
      });
    }
    );
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
    let ex = [];
    this.expressions.forEach((e) => ex.push(e.expr));
    //  console.log(ex.toString());
    window.$gama.evalExpr("[" + ex.toString() + "]", function (ee) {
      // console.log(JSON.parse(ee));
      ee = JSON.parse(ee).content.replace(/[[\]]/g, "");
      var eee = ee.split(",");

      for (var index = 0; index < eee.length; index++) {
        // console.log("finish "+eee[index]);
        let vv = _this.expressions[index];
        _this.state.series[index].data.push(parseFloat(eee[index]));
        _this.state.series[index].color = `rgba(${vv.color.r}, ${vv.color.g}, ${vv.color.b}, ${vv.color.a})`;

      }
      _this.setState({ series: _this.state.series });
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
