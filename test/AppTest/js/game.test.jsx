import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import Game from "../../../src/App/js/components/game";

describe("<Game />", () => {
    it("renders <Game /> component", () => {
        const component = renderer.create(
            <Game />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("<Game /> history is recorded", () => {
        const component = renderer.create(
            <Game />
        );
        let tree = component.toJSON();

        const rows = tree.children[0].children[0].children;
        const row1 = rows[0].children;

        row1[0].props.onClick();

        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        row1[2].props.onClick();

        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    // Enzyme testing complete game
    it("Player O wins game - Enzyme", () => {
        const wrapper = shallow(<Game />);

        expect(getGameStatus(wrapper)).toEqual("Next player: X");

        wrapper.instance().handleClick(0);

        expect(getGameStatus(wrapper)).toEqual("Next player: O");
        let lastHistory = wrapper.state("history").slice(-1)[0]["squares"];
        expect(lastHistory[0]).toEqual("X");

        wrapper.instance().handleClick(3);

        expect(getGameStatus(wrapper)).toEqual("Next player: X");
        lastHistory = wrapper.state("history").slice(-1)[0]["squares"];
        expect(lastHistory[3]).toEqual("O");

        wrapper.instance().handleClick(1);
        wrapper.instance().handleClick(4);
        wrapper.instance().handleClick(8);
        wrapper.instance().handleClick(5);

        expect(getGameStatus(wrapper)).toEqual("Winner: O");
    });

});

function getGameStatus(wrapper) {
    return wrapper.find(".game-info").children().first().text();
}
