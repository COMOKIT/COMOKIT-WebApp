import React from "react";
import { Button } from "reactstrap";
import { Responsive, WidthProvider } from "react-grid-layout";
import Widget from "./Widget";
import { RiDragMove2Fill } from "react-icons/ri";
import exportToPdf from "./exportToPdf";

const ResponsiveGridLayout = WidthProvider(Responsive);
const default_Layout = {
  widgets: [{ id: 1 }],
  widgetSequence: 1,
  id_param: -1,
  param_str: [],
  layouts: {}
};
const originalLayouts = getFromLS("Layout") || default_Layout;

class Grid extends React.Component {
  constructor() {
    super();
    this.state = originalLayouts;

    this.addParam = this.addParam.bind(this);
    this.addWidget = this.addWidget.bind(this);
    this.removeWidget = this.removeWidget.bind(this);
  }

  componentDidMount(props) {
    this.removeWidget(this.state.id_param);
  }
  exportPdf() {
    exportToPdf();
  }

  addParam(ee) {

    // console.log(JSON.parse(ee).content);
    ee = JSON.parse(ee).content.replace(/[\])}[{(]/g, '').replace(/['"]+/g, '');
    var eee = ee.split(",");
    // var t = "";
    var parameters = [];
    eee.forEach((e1) => {
      var e2 = e1.split("::");
      // console.log(e2[0]);
      // console.log(e2[1]);
      if (!("" + e2[1]).startsWith("msi.gama.util.file")) {
        var et0 = e2[0];
        var et1 = e2[1];
        var obj = {};
        obj["key"] = (" " + et0).trim();
        obj["value"] = et1;
        parameters.push(obj);
        // t += '<tr><td class="tdparam" width="150px">' + e2[0] + '</td><td  width="200px"> <input type="text" id="param_' + e2[0] + '" value="' + e2[1] + '">';
        // t += '</td><td><input type="checkbox" value="1" id="use_param_' + e2[0] + '" /></td></tr>';
      }
    });
    // t += '<tr><td> End Condition:</td><td> <input type="text" id="param_end_condition" value="cycle>1000"></td><td><input type="checkbox" value="1" id="use_param_end_condition" /></td></tr>';
    this.setState((prevState) => ({ 
      param_str: parameters
    }));
    saveToLS("Layout", this.state);

    if (!this.state.id_param || this.state.id_param < 0) {
      this.setState((prevState) => ({
        widgets: [...prevState.widgets, { id: prevState.widgetSequence + 1 }], 
        id_param: prevState.widgetSequence + 1,
        widgetSequence: prevState.widgetSequence + 1
      }));
    }  
  }

  addWidget() {
    console.log("xxxxxxx");
    this.setState((prevState) => ({
      widgets: [...prevState.widgets, { id: prevState.widgetSequence + 1 }],
      widgetSequence: prevState.widgetSequence + 1
    }));
  }

  removeWidget(id) {
    this.setState((prevState) => ({
      widgets: prevState.widgets.filter((item) => item.id !== id),
      id_param: id === prevState.id_param ? -1 : prevState.id_param,
      //do not decrement sequence, since each new widget must
      //have unique value
      widgetSequence: prevState.widgetSequence
    }));
  }

  onLayoutChange(layout, layouts) {
    window.dispatchEvent(new Event("resize"));
    this.setState({
      layouts: layouts
    });
    saveToLS("Layout", this.state);
  }

  render() {
    const config = {
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      maxH: 4,
      maxW: 8
    };
    const layouts = this.state.widgets.map((item) => (
      <div className="widget" key={item.id} data-grid={config}>
        <div style={{ width: "100%", height: "100%" }}>
          <div className="widgetHeader">
            <table>
              <tbody>

                <tr><td width="100%"><div className="dragHandle">

                  <RiDragMove2Fill className="dragIcon"></RiDragMove2Fill>
                </div></td>
                  <td> <Button
                    className="closeBtn"
                    color="danger"
                    size="sm"
                    onClick={() => this.removeWidget(item.id)}
                  >
                    X
                  </Button></td></tr>
              </tbody>
            </table>

          </div>
          <Widget grid={this} id={item.id}></Widget>
        </div>
      </div>
    ));


    return (
      <><div>
        <div className="toolBar">
          {/* <Button color="primary" size="sm" onClick={this.exportPdf}>
      Export to PDF
    </Button> */}
        </div>
        <br />
        <ResponsiveGridLayout
          className="layout"
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 8, md: 4, sm: 2, xs: 1, xxs: 1 }}
          rowHeight={185}
          draggableHandle={".dragHandle"}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
        >
          {layouts}
        </ResponsiveGridLayout>
      </div></>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rdv_layout")) || {};
      // console.log(ls);
    } catch (e) {
      console.log(e);
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rdv_layout",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

export default Grid;
