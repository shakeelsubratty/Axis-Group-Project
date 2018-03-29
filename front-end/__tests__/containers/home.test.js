import React from 'react';
import { Home } from '../../src/containers/home';
import { shallow } from 'enzyme';

describe('Home', () => {

	let handleSubmit
	let isLogged
	let logOut

	beforeEach(() => {
		handleSubmit = fn => fn
		isLogged = fn => fn
		logOut = fn => fn

	})

	const buildSubject = () => {
		const props = {
			handleSubmit,
			isLogged,
			logOut
		}
		return shallow(<Home {...props}/>)
	}

	it('has logo', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('img.img-fluid').length).toEqual(1)

	})

	it('has intro title', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('h3.card-title').text()).toEqual('What would you like to do?')

	})

	it('has two Link buttons', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('Link').length).toEqual(2)

	})


});
