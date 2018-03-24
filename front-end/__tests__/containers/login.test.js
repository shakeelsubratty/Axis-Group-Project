import React from 'react';
import { Login } from '../../src/containers/login';
import { shallow } from 'enzyme';

describe('Login', () => {

	let handleSubmit
	let logOut

	beforeEach(() => {
		handleSubmit = fn => fn,
		logOut = fn => fn
	})

	const buildSubject = () => {
		const props = {
			handleSubmit,
			logOut
		}
		return shallow(<Login {...props}/>)
	}

	it('has login title', () => {
		const wrapper = buildSubject();
		const header1 = wrapper.find('h1')
		expect(header1.text()).toEqual('Login')
		expect(header1.length).toEqual(1)
		expect(header1.hasClass('card-title')).toEqual(true)
	})

	it('renders a form with two fields', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('form').length).toEqual(1)
		expect(wrapper.find('Field').length).toEqual(2)
	})

	it('renders a submit button', () => {
		const wrapper = buildSubject();
		expect(wrapper.find("button.btn.btn-primary").text()).toEqual('Submit');
		expect(wrapper.find("button.btn.btn-primary").length).toEqual(1);
	})

	it('renders a back button', () => {
		const wrapper = buildSubject();
		const button = wrapper.find('Link.btn.btn-danger');
		expect(button.length).toEqual(1);
	})

});
