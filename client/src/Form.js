import React from "react";
import "../node_modules/bootstrap/scss/bootstrap.scss";
import "./Form.css";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.Algorithms = {
      DEFAULT: "Select an Algorithm ...",
      BUBBLE: "Bubble sort",
      MERGE: "Merge Sort",
      QUICK: "Quick Sort",
    };

    this.state = {
      start: 1,
      end: 100,
      amount: 80,
      algorithm: "DEFAULT",
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleFormChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value,
    });
  }

  handleGenerate(event) {
    event.preventDefault();
    this.props.onGenerate(this.state.start, this.state.end, this.state.amount);
  }

  handleSort(event) {
    event.preventDefault();
    this.props.onSort(this.state.algorithm);
  }

  render() {
    const algorithmsENUM = this.Algorithms;
    const algoOptions = this.props.algorithms.slice().map((option, index) => {
      return (
        <option key={index} value={option}>
          {algorithmsENUM[option]}
        </option>
      );
    });

    const numberOptions = [...Array(100).keys()].map((option, index) => {
      return <option key={index + 1}>{option + 1}</option>;
    });

    return (
      <div>
        <form className="div" onSubmit={this.handleGenerate}>
          <div className="form-group row">
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Start</label>
              <select
                name="start"
                className="form-control"
                defaultValue={this.state.start}
                onChange={this.handleFormChange}
              >
                {numberOptions}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">End</label>
              <select
                name="end"
                className="form-control"
                defaultValue={this.state.end}
                onChange={this.handleFormChange}
              >
                {numberOptions}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Amount</label>
              <select
                name="amount"
                className="form-control"
                defaultValue={this.state.amount}
                onChange={this.handleFormChange}
              >
                {numberOptions}
              </select>
            </div>
            <button className="btn btn-primary" onClick={this.handleGenerate}>
              Generate
            </button>
          </div>
        </form>
        <form className="div" onSubmit={this.handleSort}>
          <div className="form-group row">
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Algorithm</label>
              <select
                name="algorithm"
                className="form-control"
                defaultValue={this.state.start}
                onChange={this.handleFormChange}
              >
                {algoOptions}
              </select>
            </div>
            <button className="btn btn-primary" onClick={this.handleSort}>
              Sort
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
