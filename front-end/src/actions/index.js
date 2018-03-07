import axios from 'axios';

export const JOIN_WORKSHOP = 'join_workshop';
export const FETCH_IDEAS = 'fetch_ideas';
export const CREATE_IDEA = 'create_idea';
export const GET_WS_INFO = 'get_workshop_info';
export const CREATE_WORKSHOP = 'create_workshop';
export const SET_WORKSHOP_TO = 'set_workshop_to';
export const ATTEMPT_LOGIN = 'attempt_login';
export const LOG_OUT = 'log_out';


export function attemptLogIn(username, password) {
  const request = true;
	console.log('login action called, username is ==> '+ username + ' password ==>', password);
	// we should make the post API call here.
  sessionStorage.setItem('usrn', username);
  sessionStorage.setItem('pass', password);
	return {
		type: ATTEMPT_LOGIN,
		payload: request
	};
}

export function logOut() {
  console.log('LOGGING OUT');
  sessionStorage.setItem('usrn', null);
  sessionStorage.setItem('pass', null);
  sessionStorage.setItem('wsId', null);
  return {
    type: LOG_OUT,
    payload: false
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

export function createWorkshop(values) {
	const request = '0123456789';
	console.log('createWorkshop action called, values is ==> ',values);

  sessionStorage.setItem('wsId', request);

	return {
		type: CREATE_WORKSHOP,
		payload: request
	};
}

export function setWorkshopTo(id){
  return {
    type: SET_WORKSHOP_TO,
    payload: id,
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

export function getWorkshopInfo(id) {

	const request = { title: 'May the force be with you', description: 'Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not. It’s not a story the Jedi would tell you. It’s a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life…'}
	return {
		type: GET_WS_INFO,
		payload: request
	}
}
