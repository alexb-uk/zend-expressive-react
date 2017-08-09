import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import Square from "../../../src/App/js/components/square";

describe("<Square />", () => {
    it("renders <Square /> component", () => {
        const component = renderer.create(
            <Square value={1}/>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Player 1 move", () => {
        const wrapper = shallow(<Square/>);

        // Initial state
        expect(wrapper.text()).toEqual("");

        wrapper.simulate("click");
        expect(wrapper.text()).toEqual("X");
    });
});
