import React from "react";
import Form from "./Form.js";
import io from "socket.io-client";
import "../node_modules/bootstrap/scss/bootstrap.scss";
import "./Form.css";

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [...Array(80).keys()],
      algorithms: ["DEFAULT"],
      swap: [],
      count: 0
    };

    this.Generate = this.Generate.bind(this);
    this.StartSort = this.StartSort.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    fetch("/algorithms")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ algorithms: data.data });
      });
  }

  updateData(swap) {
    if (swap.length > 0) {
      let data = this.state.data.slice();
      let temp = data[swap[0]];
      data[swap[0]] = data[swap[1]];
      data[swap[0]] = temp;

      this.setState({
        data: data,
      });
    }
  }

  Generate(start, end, amount) {
    postData("/generate", { data: { start: start, end: end, count: amount } })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          data: data.data,
          count: 0
        });
      });
  }

  StartSort(algorithm) {
    const socket = io.connect("/sort");

    socket.on("connect", () => {
      socket.emit("sort", {
        data: {
          arr: this.state.data,
          interval: 0.01,
          algorithm: algorithm,
        },
      });
      this.setState({
        count: 0,
        init_arr: this.state.data,
      });
    });

    socket.on("swap", (res) => {
      let swap = res.swap;

      if (swap.length > 0) {
        let data = this.state.data.slice();

        data = this.swap(data, swap[0], swap[1]);
        this.setState({
          data: data,
          swap: swap,
        });
      }
    });

    socket.on("final", (res) => {
      let swap = res.swap;
      this.setState({
        swap: swap,
      });
    });
  }

  swap(arr, index1, index2) {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    this.setState({
        count: this.state.count + 1
    });
    return arr;
  }

  refresh() {
    this.setState({
      data: this.state.init_arr,
      count: 0
    });
  }

  render() {
    const swap = this.state.swap.slice();
    let button_class_name = "btn btn-primary";
    let ongoing = this.state.swap.length == 0 && this.state.init_arr

    const bars = this.state.data.slice().map((value, index) => {
      let className = (swap.length > 0 && swap.includes(index)) ? "graph-items-swap" : "graph-items";

      return (
        <div key={index} className={className}>
          <div
            className={className}
            style={{ height: value * 4 }}
            title={value}
          ></div>
        </div>
      );
    });

    return (
      <div>
        <Form
          algorithms={this.state.algorithms}
          onSort={this.StartSort}
          onGenerate={this.Generate}
        />
        <div className="graph">{bars}</div>
        <div className="bottom">
          Swaps: {this.state.count ? this.state.count : 0}
        </div>
        <div className="bottom">
            <button
              className={ongoing ? button_class_name : button_class_name += ' disabled'}
              onClick={ongoing ? () => this.refresh() : () => {}}
            >
              Reset
            </button>
          </div>
      </div>
    );
  }
}

export default Graph;

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "same-origin", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response; // parses JSON response into native JavaScript objects
}
