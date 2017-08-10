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

    it("Player O wins <Game /> - Enzyme", () => {
        const wrapper = shallow(<Game />);

        expect(getGameStatus(wrapper)).toEqual("Next player: X");

        wrapper.instance().handleClick(0);

        expect(getGameStatus(wrapper)).toEqual("Next player: O");
        let lastHistory = getLastMove(wrapper);
        expect(lastHistory[0]).toEqual("X");

        wrapper.instance().handleClick(3);

        expect(getGameStatus(wrapper)).toEqual("Next player: X");
        lastHistory = getLastMove(wrapper);
        expect(lastHistory[3]).toEqual("O");

        wrapper.instance().handleClick(1);
        wrapper.instance().handleClick(4);
        wrapper.instance().handleClick(8);
        wrapper.instance().handleClick(5);

        expect(getGameStatus(wrapper)).toEqual("Winner: O");
    });

    it("time travel <Game /> history - Enzyme", () => {
        const wrapper = shallow(<Game />);

        wrapper.instance().handleClick(0);
        wrapper.instance().handleClick(3);
        wrapper.instance().handleClick(1);
        wrapper.instance().handleClick(4);

        let lastMove = getLastMove(wrapper);
        expect(lastMove[0]).toEqual("X");
        expect(lastMove[3]).toEqual("O");
        expect(lastMove[1]).toEqual("X");
        expect(lastMove[4]).toEqual("O");

        expect(getGameStatus(wrapper)).toEqual("Next player: X");

        wrapper.instance().jumpTo(1);
        expect(getGameStatus(wrapper)).toEqual("Next player: O");

        wrapper.instance().jumpTo(2);
        expect(getGameStatus(wrapper)).toEqual("Next player: X");

        wrapper.instance().handleClick(2);

        lastMove = getLastMove(wrapper);
        expect(lastMove[0]).toEqual("X");
        expect(lastMove[3]).toEqual("O");
        expect(lastMove[2]).toEqual("X");
        expect(lastMove[4]).toEqual(null);
        expect(lastMove[1]).toEqual(null);

        expect(getGameStatus(wrapper)).toEqual("Next player: O");
    });

});

function getGameStatus(wrapper) {
    return wrapper.find(".game-info").children().first().text();
}

function getLastMove(wrapper) {
    return wrapper.state("history").slice(-1)[0]["squares"];
}
