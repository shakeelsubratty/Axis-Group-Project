import React from 'react';
import { CreateWorkshop } from '../../src/containers/createWorkshop';
import { shallow } from 'enzyme';

describe('CreateWorkshop', () => {

	let handleSubmit
	let attemptLogIn
	let isLogged

	beforeEach(() => {
		handleSubmit = fn => fn
		attemptLogIn = fn => fn
		isLogged = fn => fn
	})

	const buildSubject = () => {
		const props = {
			handleSubmit,
			attemptLogIn,
			isLogged
		}
		return shallow(<CreateWorkshop {...props}/>)
	}

	it('has correct description title card', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('div.card.card-big').find('h1').text()).toEqual('Create Workshop')

	})

	it('renders a form with two fields', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('div.card-body').find('form').length).toEqual(1)
		expect(wrapper.find('div.card-body').find('Field').length).toEqual(2)
	})

	it('has submit button', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('button.btn.btn-primary').text()).toEqual('Submit')
	})

	it('has logout button', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('Link.btn').length).toEqual(1)
	})

});
