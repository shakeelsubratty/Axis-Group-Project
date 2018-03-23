import React from 'react';
import LoginFailed from '../../src/components/loginFailed';
import { shallow, containsALlMatchingElements } from 'enzyme';

describe("LoginFailed Component", () => {
	it('Contains correct html tags', () => {
		const wrapper = shallow(<LoginFailed />);
		const text = wrapper.find('h2').text();
		expect(text).toEqual('Oops...It looks like you are not logged in...')
	})

})
