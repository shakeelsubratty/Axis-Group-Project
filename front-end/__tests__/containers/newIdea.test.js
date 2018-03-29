import React from 'react';
import { NewIdea } from '../../src/containers/newIdea';
import { shallow, render, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import sinon from 'sinon';


describe('NewIdea', () => {

	let  handleSubmit
	beforeEach(() => {
		handleSubmit = fn => fn
	})

	const buildSubject = () => {
		const props = {
			handleSubmit,
		}
		return shallow(<NewIdea {...props}/>)
	}

	it('has ideas title', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('div.ideaGenerationPanel').find('h1').text()).toEqual('Ideas')
		expect(wrapper.find('div.ideaGenerationPanel').find('h1').length).toEqual(1)
	})

	it('renders a form with two fields', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('form').length).toEqual(1)
		expect(wrapper.find('Field').length).toEqual(2)
	})

	it('renders a save button', () => {
		const wrapper = buildSubject();
		expect(wrapper.find("button.btn.btn-primary").length).toEqual(1)
	})

	it('renders a clear button', () => {
		const wrapper = buildSubject();
		expect(wrapper.find('button.btn.btn-danger').length).toEqual(1);
	})

});
