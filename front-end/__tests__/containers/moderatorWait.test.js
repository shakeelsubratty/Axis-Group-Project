import React from 'react';
import { ModeratorWait } from '../../src/containers/moderatorWait';
import { shallow, render, mount } from 'enzyme';
import renderer from 'react-test-renderer';

describe('ModeratorWait', () => {

	let handleSubmit
	let attemptLogIn
	let setWorkshopTo
	let getWorkshopInfo

	beforeEach(() => {
		handleSubmit = fn => fn
		attemptLogIn = fn => fn
		setWorkshopTo = fn => fn
		getWorkshopInfo = fn => fn
	})

	const buildSubject = () => {
		const props = {
			handleSubmit,
			attemptLogIn,
			setWorkshopTo,
			getWorkshopInfo,


		}
		return shallow(<ModeratorWait {...props}/>)
	}

	it('has description title card', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('div.card').find('h1').length).toEqual(1)
	})

	it('has wokrshop id and description titles', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('div.card.card-big').find('div.card-body.flexRowCenter').find('h4').length).toEqual(2)
	})

	it('has correct workshop id title', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('div.card.card-big').find('div.card-body.flexRowCenter').find('h4.wsIdTitle').text()).toEqual('Workshop Id')
	})

	it('has correct workshop description title', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('div.card.card-big').find('div.card-body.flexRowCenter').find('h4.wsDesTitle').text()).toEqual('Description')
	})

	it('has start button', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('Link.btn.btn-danger').length).toEqual(1)
	})

	it('has exit button', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('Link.btn.btn-success').length).toEqual(1)
	})

	it('has right arrow button', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('button.btnSide.btn-secondary').length).toEqual(1)
	})


});
