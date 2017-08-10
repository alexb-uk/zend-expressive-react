import React from "react";
import PropTypes from "prop-types";
import Square from "./square.jsx";

export default class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {

        const gridsize = 3;

        let rows = [];
        let counter = 0;

        for (let i=0; i < gridsize; i++) {
            let row = [];

            for (let x=0; x < gridsize; x++) {
                row.push(this.renderSquare(counter));
                counter++;
            }

            rows.push(
                <div key={i} className="board-row">
                    {row}
                </div>
            );
        }

        return (
            <div>
                {rows}
            </div>
        );
    }
}

Board.propTypes = {
    onClick: PropTypes.func.isRequired,
    squares: PropTypes.array.isRequired
};
