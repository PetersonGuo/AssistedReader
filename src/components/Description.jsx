import React, { Component } from "react";

class Description extends Component {
  render() {
    return (
      <div className={`description w-max-{30%}`}>
        <h3 className="subtitle">{this.props.sub}</h3>
        <ul className="list">
          <li className="list">{this.props.l1}</li>
          <li className="list">{this.props.l2}</li>
        </ul>
      </div>
    );
  }
}

export default Description;