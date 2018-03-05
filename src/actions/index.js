import axios from 'axios';

export const JOIN_WORKSHOP = 'join_workshop';
export const FETCH_IDEAS = 'fetch_ideas';

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
		{ id: 0, idea: "Elon Musk is a genious", explanation:'he has multiple successfull companies'},
		{ id: 1, idea: "I should buy a Model S", explanation:'It is quick'},
		{ id: 2, idea: "I should buy a Model X", explanation:'It is quick'},

	];

	console.log('request ==>',request);

	return {
		type: FETCH_IDEAS,
		payloard: request
	}
}
