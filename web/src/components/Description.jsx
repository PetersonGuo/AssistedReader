import React, { Component } from "react";

class Description extends Component {
    render() {
        return (
            <div className="description">
                <div>
                    <h3 className="subtitle">{this.props.sub}</h3>
                    <ul className="list">
                        <li>{this.props.l1}</li>
                        <li>{this.props.l2}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Description;