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

    // Enzyme testing complete game
    it("Player O wins game - Enzyme", () => {
        const wrapper = shallow(<Game />);

        expect(wrapper.find(".game-info").text()).toEqual("Next player: X");

        wrapper.instance().handleClick(0);

        expect(wrapper.find(".game-info").text()).toEqual("Next player: O");
        let lastHistory = wrapper.state("history").slice(-1)[0]["squares"];
        expect(lastHistory[0]).toEqual("X");

        wrapper.instance().handleClick(3);

        expect(wrapper.find(".game-info").text()).toEqual("Next player: X");
        lastHistory = wrapper.state("history").slice(-1)[0]["squares"];
        expect(lastHistory[3]).toEqual("O");

        wrapper.instance().handleClick(1);
        wrapper.instance().handleClick(4);
        wrapper.instance().handleClick(8);
        wrapper.instance().handleClick(5);

        expect(wrapper.find(".game-info").text()).toEqual("Winner: O");
    });

});
