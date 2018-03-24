import React from 'react';
import { WorkshopIdea } from '../../src/components';
import renderer from 'react-test-renderer';


describe("WorkshopIdea Component", () => {
	it('matches snapshot', () => {
		const tree = renderer.create(<WorkshopIdea />).toJSON();
		expect(tree).toMatchSnapshot();

	});
});
