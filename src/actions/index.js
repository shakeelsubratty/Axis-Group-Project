import axios from 'axios';

export const JOIN_WORKSHOP = 'join_workshop'
export const CREATE_WORKSHOP = 'create_workshop'
export const ATTEMPT_LOGIN = 'attempt_login'
export const LOG_OUT = 'log_out'

export function attemptLogIn(values) {
  const request = true;
	console.log('login action called, username is ==> '+ values.username + ' password ==>', values.password);
	// we should make the post API call here.

	return {
		type: ATTEMPT_LOGIN,
		data: request
	};
}

export function logOut() {
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
