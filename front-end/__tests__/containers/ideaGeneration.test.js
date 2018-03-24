import React from 'react';
import { IdeaGeneration } from '../../src/containers/ideaGeneration';
import { shallow } from 'enzyme';

describe('IdeaGeneration', () => {

	let handleSubmit
	let isLogged
	let setWorkshopTo
	let setParticipantTo
	let getWorkshopInfo
	let fetchIdeas
	let deleteIdea
	let createIdea

	beforeEach(() => {
		handleSubmit = fn => fn
		isLogged = fn => fn
		setWorkshopTo = fn => fn
		setParticipantTo = fn => fn
		getWorkshopInfo = fn => fn
		fetchIdeas = fn => fn
		deleteIdea = fn => fn
		createIdea = fn => fn
	})

	const buildSubject = () => {
		const props = {
			handleSubmit,
			isLogged,
			setWorkshopTo,
			setParticipantTo,
			getWorkshopInfo,
			fetchIdeas,
			deleteIdea,
			createIdea
		}
		return shallow(<IdeaGeneration {...props}/>)
	}

	it('has title of the workshop', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('div.card').find('h1').length).toEqual(1)

	})

	it('has left box for NewIdea', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('div.ideaGenLeft').length).toEqual(1)

	})

	it('has right box for User Ideas', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('div.card').find('div.card-body.ideaGenRight').length).toEqual(1)

	})

});
