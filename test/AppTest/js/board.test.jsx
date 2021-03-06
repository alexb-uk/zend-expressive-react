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

    it("<Board /> component handles clicks", () => {
        const myMock = jest.fn();
        const component = renderer.create(
            <Board
                squares={emptySquares}
                onClick={(i) => myMock(i)}
            />
        );
        let tree = component.toJSON();

        tree.children[1].children[0].props.onClick();
        expect(myMock.mock.calls.length).toBe(1);

        tree.children[2].children[0].props.onClick();
        expect(myMock.mock.calls.length).toBe(2);
    });

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

});
