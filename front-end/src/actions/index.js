import axios from 'axios';
import _ from 'lodash';


export const JOIN_WORKSHOP = 'join_workshop';
export const FETCH_IDEAS = 'fetch_ideas';
export const CREATE_IDEA = 'create_idea';
export const GET_WS_TITLE = 'get_workshop_Title';
export const CREATE_WORKSHOP = 'create_workshop';
export const ATTEMPT_LOGIN = 'attempt_login';
export const LOG_OUT = 'log_out';
export const DELETE_IDEA = 'delete_idea';

let currentData = [
	{ id: '0', title: "Elon Musk is a genious", explanation:'he has multiple successfull companies'},
	{ id: '1', title: "I should buy a Model S", explanation:'It is quick'},
	{ id: '2', title: "I should buy a Model X", explanation:'It is quick'},
];
export function attemptLogIn(username, password) {
  const request = true;
	console.log('login action called, username is ==> '+ username + ' password ==>', password);
	// we should make the post API call here.
  sessionStorage.setItem('usrn', username);
  sessionStorage.setItem('pass', password);
	return {
		type: ATTEMPT_LOGIN,
		data: request
	};
}

export function logOut() {
  console.log('LOGGING OUT');
  sessionStorage.setItem('usrn', null);
  sessionStorage.setItem('pass', null);
  return {
    type: LOG_OUT,
    data: false
  };
}

export function joinWorkshop(workshopId) {
	const request = true;
	console.log('joinWorkshop action called, id is ==> ',workshopId);
	// we should make the post API call here.

	return {
		type: JOIN_WORKSHOP,
		data: request
	};
}

export function createWorkshop(values) {
	const request = '';
	console.log('createWorkshop action called, values is ==> ',values);
	// we should make the post API call here.

	return {
		type: CREATE_WORKSHOP,
		data: request
	};
}

export function fetchIdeas() {

	let request = currentData;

	console.log('fetchIdeas is called request ==>',request);

	return {
		type: FETCH_IDEAS,
		payload: request
	}
}

export function createIdea(values, callback) {
	console.log('we are sending to the api==>',values)
		// here we send it to the API.
	//	const request = axios.post().then(()=>callback);
		const request = 'elonnnnnn'
		currentData.push(values);

		console.log(currentData);
		callback();
		return {
			type: CREATE_IDEA,
			payload: request
		}
}

export function getWorkshopTitle() {

	const request = 'Elon Musk'
	console.log('getWorkshopTitle called->',request);
	return {
		type: GET_WS_TITLE,
		payload: request
	}
}

export function deleteIdea(id) {

	const request = 'aaaa'
	console.log('id passed ', id);
	// make api call to delete that idea.
	currentData.splice(id,1);

	console.log('delete idea called, result array=>',currentData);

	return{
		type: DELETE_IDEA,
		payload: request,
	}
}
