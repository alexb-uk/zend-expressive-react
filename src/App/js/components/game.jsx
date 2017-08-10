import React from "react";
import Board from "./board.jsx";

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: new Array(9).fill(null),
                moveIndex: 0,
                currentMove: null
            }],
            stepNumber: 0,
            xIsNext: true,
            moveHistoryOrder: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([{
                squares: squares,
                currentMove: i,
                moveIndex: history.length
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    setMoveOrder() {
        this.setState({
            moveHistoryOrder: !this.state.moveHistoryOrder,
        });
    }

    render() {
        const history = this.state.history.slice(0);
        const current = history[this.state.stepNumber];
        const winner  = calculateWinner(current.squares);
        const stepNumber = this.state.stepNumber;

        if (this.state.moveHistoryOrder === false) {
            history.reverse();
        }

        const moves = history.map((step, move) => {
            const column = (step["currentMove"] % 3) + 1;
            const row    = Math.floor((step["currentMove"] / 3) + 1);

            const desc = step["moveIndex"] ?
                "Move #" + step["moveIndex"] + " - (" + column + "," + row + ")" :
                "Game start";

            return (
                <li key={move}>
                    <a href="#"
                       onClick={() => this.jumpTo(move)}
                       className={(stepNumber === move) ? "selected" : ""}
                    >{desc}</a>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>
                        <button onClick={() => this.setMoveOrder()}>
                            Toggle Order
                        </button>
                    </div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
