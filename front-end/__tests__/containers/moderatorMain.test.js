import React from 'react';
import { ModeratorMain } from '../../src/containers/moderatorMain';
import { shallow } from 'enzyme';

describe('ModeratorMain', () => {

	let handleSubmit
	let isLogged
	let attemptLogIn
	let setWorkshopTo
	let setParticipantTo
	let getWorkshopInfo
	let fetchIdeas
	let deleteIdea
	let createIdea
	let wsIdeas
	let fetchAllIdeas
	let getWordCloudData

	beforeEach(() => {
		handleSubmit = fn => fn
		isLogged = fn => fn
		attemptLogIn = fn => fn
		setWorkshopTo = fn => fn
		setParticipantTo = fn => fn
		getWorkshopInfo = fn => fn
		fetchIdeas = fn => fn
		deleteIdea = fn => fn
		createIdea = fn => fn
		wsIdeas = fn => fn
		fetchAllIdeas = fn => fn
		getWordCloudData = fn => fn
	})

	const buildSubject = () => {
		const props = {
			handleSubmit,
			isLogged,
			attemptLogIn,
			setWorkshopTo,
			setParticipantTo,
			getWorkshopInfo,
			fetchIdeas,
			deleteIdea,
			createIdea,
			wsIdeas,
			fetchAllIdeas,
			getWordCloudData
		}
		return shallow(<ModeratorMain {...props}/>)
	}


	it('has left box with three stats', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('div.card.flexColumnCenter').length).toEqual(3)

	})

	it('has right box for User Ideas', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('div.card').find('div.card.card-big').find('h3.card-title').length).toEqual(1)

	})

	it('has close workshop button', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('button.btn.btn-danger').text()).toEqual('Close Workshop')

	})

});
