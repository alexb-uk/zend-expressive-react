import React from "react";
import renderer from "react-test-renderer";
import Square from "../../../src/App/js/components/square";

describe("<Square />", () => {
  it("renders <Square /> component", () => {
    const component = renderer.create(
      <Square />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
