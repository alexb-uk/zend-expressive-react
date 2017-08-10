import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import Square from "../../../src/App/js/components/square";

describe("<Square />", () => {
    const myMock = jest.fn();

    it("renders empty <Square /> component", () => {
        const component = renderer.create(
            <Square value={null} onClick={() => myMock()}/>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders filled <Square /> component", () => {
        const component = renderer.create(
            <Square value={"X"} onClick={() => myMock()}/>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("test <Square /> click event", () => {
        const myMock = jest.fn();
        const wrapper = shallow(<Square value={null} onClick={() => myMock()}/>);

        // Initial state
        expect(wrapper.text()).toEqual("");

        wrapper.simulate("click");
        expect(myMock.mock.calls.length).toBe(1);
    });
});
