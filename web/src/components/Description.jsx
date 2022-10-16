import React, { Component } from "react";

class Description extends Component {
  render() {
    return (
      <div className="description">
        <div className="descriptionBody">
          <h3 className="subtitle">{this.props.sub}</h3>
          <ul className="list">
            <li className="list">{this.props.l1}</li>
            <li className="list">{this.props.l2}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Description;