import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import Board from "../../../src/App/js/components/board";
import Square from "../../../src/App/js/components/square";

describe("<Board />", () => {
    const emptySquares = new Array(9).fill(null);

    it("renders <Board /> component", () => {
        const myMock = jest.fn();
        const component = renderer.create(
            <Board
                squares={emptySquares}
                onClick={(i) => myMock(i)}
            />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    // Snapshot testing complete game
    it("Player X wins game", () => {
        const myMock = jest.fn();
        const component = renderer.create(
            <Board
                squares={emptySquares}
                onClick={(i) => myMock(i)}
            />
        );
        let tree = component.toJSON();

        tree.children[1].children[0].props.onClick();
        tree.children[2].children[0].props.onClick();
        tree.children[1].children[1].props.onClick();

        // re-rendering
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        tree.children[2].children[1].props.onClick();
        tree.children[1].children[2].props.onClick();

        // re-rendering
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        tree.children[2].children[2].props.onClick();
        // re-rendering
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    // Snapshot testing complete game
    it("Player O wins game", () => {
        const myMock = jest.fn();
        const component = renderer.create(
            <Board
                squares={emptySquares}
                onClick={(i) => myMock(i)}
            />
        );
        let tree = component.toJSON();

        tree.children[1].children[0].props.onClick();
        tree.children[2].children[0].props.onClick();
        tree.children[1].children[1].props.onClick();

        // re-rendering
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        tree.children[2].children[1].props.onClick();
        tree.children[3].children[0].props.onClick();
        tree.children[2].children[2].props.onClick();

        // re-rendering
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    // Enzyme testing
    it("<Board /> component handles clicks - Enzyme", () => {
        const myMock  = jest.fn();
        const squares = new Array(9).fill(null);
        const wrapper = shallow(
            <Board
                squares={squares}
                onClick={(i) => myMock(i)}
            />
        );
        const square = wrapper.find(Square).first();
        square.simulate("click");
        expect(myMock.mock.calls.length).toBe(1);

        const secondSquare  = wrapper.find(Square).at(1);
        secondSquare.simulate("click");
        expect(myMock.mock.calls.length).toBe(2);
    });

    // Enzyme testing complete game
    it("Player O wins game - Enzyme", () => {
        const wrapper = shallow(<Board />);

        expect(wrapper.find(".status").text()).toEqual("Next player: X");

        wrapper.find(Square).at(0).simulate("click");
        wrapper.find(Square).at(3).simulate("click");
        wrapper.find(Square).at(1).simulate("click");
        wrapper.find(Square).at(4).simulate("click");
        wrapper.find(Square).at(8).simulate("click");
        wrapper.find(Square).at(5).simulate("click");

        expect(wrapper.find(".status").text()).toEqual("Winner: O");
    });
});
