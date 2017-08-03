// __tests__/Helloworld-test.js

/* eslint-disable no-unused-vars */

import React from 'react';
import renderer from 'react-test-renderer';
import Helloworld from '../../../src/App/js/components/helloworld';

test('Helloworld element', () => {
  const component = renderer.create(
    <Helloworld date={new Date('2001/02/03 01:20:30')}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
