import React from "react";
import PropTypes from "prop-types";

export default class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

Square.propTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string
};
