import React from "react";
import renderer from "react-test-renderer";
import Game from "../../../src/App/js/components/game";

describe("<Game />", () => {
  it("renders <Game /> component", () => {
    const component = renderer.create(
      <Game />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
