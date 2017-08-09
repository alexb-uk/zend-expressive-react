import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import Board from "../../../src/App/js/components/board";
import Square from "../../../src/App/js/components/square";

describe("<Board />", () => {
    it("renders <Board /> component", () => {
        const component = renderer.create(
            <Board/>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    // Snapshot testing
    it("<Board /> component handles clicks", () => {
        const component = renderer.create(
            <Board/>
        );
        let tree = component.toJSON();

        // Click first row, second column
        let link = tree.children[1].children[1];
        link.props.onClick();

        // re-rendering
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    // Enzyme testing
    it("<Board /> component handles clicks - Enzyme", () => {
        const wrapper = shallow(<Board />);
        const square  = wrapper.find(Square).first();

        square.simulate("click");
        expect(wrapper.state().squares[0]).toBe("X");
        expect(wrapper.state().squares[1]).toBe(null);
    });
});
