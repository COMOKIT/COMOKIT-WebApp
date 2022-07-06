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
    
    this.expression = props.expr;
    // this.updateSource = setInterval(() => {
    //   window.$gama.evalExpr(props.expr, function (ee) {
    //     // ee = JSON.parse(ee).result.replace(/[{}]/g, "");
    //     // var eee = ee.split(",");
    //     // console.log(eee[0]);
    //     // console.log(eee[1]);
    //   });
    // }, 1000);
  }
  componentDidMount() {
    let _this = this;

    _this.interval = setInterval(function () {
      // console.log(_this.expression);
      window.$gama.evalExpr(_this.expression, function (ee) {
        // console.log(_this.state.series[0].data);
        _this.state.series[0].data.push(parseInt(JSON.parse(ee).result));
        _this.setState({ series: [{ data:_this.state.series[0].data  }] });
      });
    }, 2000);
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
