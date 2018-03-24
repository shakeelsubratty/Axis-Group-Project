import React from 'react';
import { EnterWorkshop } from '../../src/containers/enterWorkshop';
import { shallow } from 'enzyme';

describe('EnterWorkshop', () => {

	let handleSubmit
	let attemptLogIn
	let isLogged
	let cleanCache

	beforeEach(() => {
		handleSubmit = fn => fn
		attemptLogIn = fn => fn
		isLogged = fn => fn
		cleanCache = fn => fn
	})

	const buildSubject = () => {
		const props = {
			handleSubmit,
			attemptLogIn,
			isLogged,
			cleanCache,
		}
		return shallow(<EnterWorkshop {...props}/>)
	}

	it('has correct description title card', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('div.card.card-big').find('h1').text()).toEqual('Join Workshop')

	})

	it('renders a form with two fields', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('div.card-body').find('form').length).toEqual(1)
		expect(wrapper.find('div.card-body').find('Field').length).toEqual(1)
	})

	it('has submit button', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('button.btn.btn-primary').text()).toEqual('Submit')
	})

	it('has cancel button', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('Link.btn').length).toEqual(1)
	})

});
