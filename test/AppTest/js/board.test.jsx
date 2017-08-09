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

    // Snapshot testing complete game
    it("Player X wins game", () => {
        const component = renderer.create(
            <Board/>
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
        const component = renderer.create(
            <Board/>
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
        const wrapper = shallow(<Board />);
        const square  = wrapper.find(Square).first();

        square.simulate("click");
        expect(wrapper.state().squares[0]).toBe("X");
        expect(wrapper.state().squares[1]).toBe(null);

        expect(wrapper.find(".status").text()).toEqual("Next player: O");

        const secondSquare  = wrapper.find(Square).at(1);

        secondSquare.simulate("click");
        expect(wrapper.state().squares[0]).toBe("X");
        expect(wrapper.state().squares[1]).toBe("O");
        expect(wrapper.state().squares[2]).toBe(null);

        expect(wrapper.find(".status").text()).toEqual("Next player: X");
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
