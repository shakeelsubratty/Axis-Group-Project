import React from 'react';
import { LoadingScreen } from '../../src/components';
import renderer from 'react-test-renderer';


describe("LoadingScreen", () => {
	it('matches snapshot', () => {
		const tree = renderer.create(<LoadingScreen />).toJSON();
		expect(tree).toMatchSnapshot();

	});
});
