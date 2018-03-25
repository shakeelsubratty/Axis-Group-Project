import React from 'react';
import { LoginFailed } from '../../src/components';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';

describe("LoginFailed Component", () => {
	it('matches snapshot', () => {
		const tree = renderer.create(<MemoryRouter><LoginFailed /></MemoryRouter>).toJSON();
		expect(tree).toMatchSnapshot();

	});
});
