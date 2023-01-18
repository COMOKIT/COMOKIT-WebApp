import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Widget from "./Widget";

const ResponsiveGridLayout = WidthProvider(Responsive);
const default_Layout = {
  widgets: [{ id: 1 }],
  editing: true,
  widgetSequence: 1,
  id_param: -1,
  waiting: true,
  param_str: [],
  triggerFunc: null,
  layouts: {}
};
const originalLayouts = getFromLS("Layout") || default_Layout;

class Grid extends React.Component {
  constructor() {
    super();
    this.state = originalLayouts;
    this.addParam = this.addParam.bind(this);
    this.addWidget = this.addWidget.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.waiting = this.waiting.bind(this);
    this.onShowClick = this.onShowClick.bind(this);
    this.removeWidget = this.removeWidget.bind(this);
  }

  onShowClick() {
    // this.child.current.fetchFile();
    // this.refs.child.fetchFile();
    this.setState({ triggerFunc: () => { console.log("shown") } })

  };

  waiting(b) {
    this.setState((prevState) => ({
      waiting: b
    }));
  }

  componentDidMount(props) {
    this.removeWidget(this.state.id_param);
    this.waiting(true);
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

  toggleEdit() {
    this.setState((prevState) => ({
      editing: !this.state.editing
    }));
  }

  addWidget() {
    this.setState((prevState) => ({
      widgets: [...prevState.widgets, { id: prevState.widgetSequence + 1 }],
      widgetSequence: prevState.widgetSequence + 1
    }));
  }

  removeWidget(id, conf) {
    if (conf) {
      if (window.confirm('Are you sure to remove?')) {
        this.setState((prevState) => ({
          widgets: prevState.widgets.filter((item) => item.id !== id),
          id_param: id === prevState.id_param ? -1 : prevState.id_param,
          //do not decrement sequence, since each new widget must
          //have unique value
          widgetSequence: prevState.widgetSequence
        }));
      }
    } else {
      this.setState((prevState) => ({
        widgets: prevState.widgets.filter((item) => item.id !== id),
        id_param: id === prevState.id_param ? -1 : prevState.id_param,
        //do not decrement sequence, since each new widget must
        //have unique value
        widgetSequence: prevState.widgetSequence
      }));
    }
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
      w: 3,
      h: 2,
      maxH: 10,
      maxW: 16
    };
    const layouts = this.state.widgets.map((item) => (
      <div className="widget" key={item.id} data-grid={config}>
        <div className="mscroll" style={{ width: "100%", height: "100%" }}>
          <Widget triggerChildFunc={this.state.triggerFunc} grid={this} id={item.id}></Widget>
        </div>
      </div>
    ));

    return (
      <><div>
        {/* <div className="toolBar"> */}
        {/* <Button color="primary" size="sm" onClick={this.exportPdf}>
      Export to PDF
    </Button> */}
        {/* </div> */}
        {/* <br /> */}
        <ResponsiveGridLayout
          className="layout"
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 240 }}
          cols={{ lg: 16, md: 16, sm: 8, xs: 4, xxs: 2 }}
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
      Object.keys(default_Layout).forEach(function (k) {
        if (ls[key] && !ls[key][k]) { return default_Layout; }
      });
    } catch (e) {
      console.log(e);
      return default_Layout;
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
