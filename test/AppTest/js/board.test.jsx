import React from "react";
import renderer from "react-test-renderer";
import Board from "../../../src/App/js/components/board";

describe("<Board />", () => {
  it("renders <Board /> component", () => {
    const component = renderer.create(
      <Board />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
