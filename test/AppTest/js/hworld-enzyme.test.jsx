// __tests__/hworld-enzyme.test.jsx

import React from "react";
import { shallow } from "enzyme";

import Helloworld from "../../../src/App/js/components/helloworld";

describe("<Helloworld />", () => {
  it("renders welcome <h1> component", () => {
    const wrapper = shallow(<Helloworld date={new Date("2001/02/03 01:20:30")} />);
    const welcome = <h1>Hello, world!</h1>;

    expect(wrapper).toContainReact(welcome);
  });

  it("renders time <h2> component", () => {
    const testDate = new Date("1999/02/03 01:20:30");
    const wrapper  = shallow(<Helloworld date={testDate} />);
    const time     = <h2>It is {testDate.toLocaleTimeString()} precisely!</h2>;

    expect(wrapper).toContainReact(time);
  });
});
