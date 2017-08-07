// __tests__/helloworld.test.jsx

import React from "react";
import renderer from "react-test-renderer";
import Helloworld from "../../../src/App/js/components/helloworld";

test("Helloworld Like counter", () => {
  const component = renderer.create(
    <Helloworld date={new Date("2001/02/03 01:20:30")}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // console.log(tree.children[4].children[0]);

  // manually trigger the like callback
  let link = tree.children[4].children[0];
  link.props.onClick();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // click again
  link.props.onClick();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
