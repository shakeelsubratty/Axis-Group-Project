import axios from 'axios';

export const JOIN_WORKSHOP = 'join_workshop'

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
