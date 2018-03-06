import axios from 'axios';

export const JOIN_WORKSHOP = 'join_workshop';
export const FETCH_IDEAS = 'fetch_ideas';
export const CREATE_IDEA = 'create_idea';
export const GET_WS_TITLE = 'get_workshop_Title';

export function attemptLogIn(authIsCorrect) {
  return {
    type: 'SET_LOGGED_TO',
    data: authIsCorrect
  };
}

export function logOut() {
  return {
    type: 'LOG_OUT',
    data: false
  };
}

export function joinWorkshop(workshopId) {
	const request = true;
	console.log('joinWorkshop action called, id is ==> ',workshopId);
	// we should make the post API call here.

	return {
		type: JOIN_WORKSHOP,
		payload: request
	};
}

export function fetchIdeas() {

	const request = [
		{ id: 0, title: "Elon Musk is a genious", explanation:'he has multiple successfull companies'},
		{ id: 1, title: "I should buy a Model S", explanation:'It is quick'},
		{ id: 2, title: "I should buy a Model X", explanation:'It is quick'},

	];

	console.log('request ==>',request);

	return {
		type: FETCH_IDEAS,
		payload: request
	}
}

export function createIdea(values) {

		// here we send it to the API.
		const request = console.log('we are sending to the api==>',values);
		return {
			type: CREATE_IDEA,
			payload: request
		}
}

export function getWorkshopTitle() {

	const request = 'Elon Musk'

	return {
		type: GET_WS_TITLE,
		payload: request
	}
}
