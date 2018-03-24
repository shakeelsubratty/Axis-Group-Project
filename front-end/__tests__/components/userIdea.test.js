import React from 'react';
import { UserIdea } from '../../src/components';
import renderer from 'react-test-renderer';


describe("UserIdea Component", () => {
	it('matches snapshot', () => {
		const tree = renderer.create(<UserIdea />).toJSON();
		expect(tree).toMatchSnapshot();

	});
});
