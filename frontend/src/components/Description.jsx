import React, {Component} from "react";

class Description extends Component {
    render() {
        return (
            <div key={`div_${this.props.i}`}
                 className={`description w-max-{30%} flex flex-col mx-5 bg-blue-300 rounded-xl p-5`}>
                <h3 key={`h3_${this.props.i}`} className="flex-row font-bold text-black text-lg">{this.props.h3}</h3>
                <div key={`l1_${this.props.i}`} className="flex-row text-gray-700">{this.props.l1}</div>
                <div key={`l2_${this.props.i}`} className="flex-row text-gray-700">{this.props.l2}</div>
            </div>
        );
    }
}

export default Description;