import axios from 'axios';
import _ from 'lodash';

export const JOIN_WORKSHOP = 'join_workshop';
export const FETCH_IDEAS = 'fetch_ideas';
export const FETCH_ALL_IDEAS = 'fetch_all_ideas';
export const CREATE_IDEA = 'create_idea';
export const GET_WS_INFO = 'get_workshop_info';
export const CREATE_WORKSHOP = 'create_workshop';
export const SET_WORKSHOP_TO = 'set_workshop_to';
export const FETCH_USERS = 'fetch_users';
export const ATTEMPT_LOGIN = 'attempt_login';
export const LOG_OUT = 'log_out';
export const DELETE_IDEA = 'delete_idea';
export const SET_PARTICIPANT_TO = 'set_participant_to';
export const USER_ENGAGEMENT = 'user_engagement';
export const WORD_CLOUD = 'word_cloud';
export const ACTIVATE_WORKSHOP = 'activate_ws'

// Root url for API calls.
const ROOT_URL = 'http://localhost:3000';

// Action to log in.
export function attemptLogIn(username, password, callback) {
  return (dispatch) => {

		axios.get(`${ROOT_URL}/auth/login/${username}/${password}`).then(function (response) {

			sessionStorage.setItem('usrn', username);
			sessionStorage.setItem('pass', password);

			dispatch({
				type: ATTEMPT_LOGIN,
				payload: response.data,
			});
			callback(response.data);
		}).catch((e) => {
			console.log(e);
		})
	}
}

// Action to log out.
export function logOut(callback) {
	sessionStorage.setItem('usrn', '');
	sessionStorage.setItem('pass', '');
	sessionStorage.setItem('wsId', '');
	if (typeof callback === 'function') {
		callback();
	}
	return {
		type: LOG_OUT,
		payload: false
	};
}

/* Action to join a workshop.
@param workshopId of the workshop we are trying to join.
@param callback function.
*/
export function joinWorkshop(workshopId, callback) {
	return (dispatch) => {
		axios.get(`${ROOT_URL}/participant/create/${workshopId}`).then(function (response) {
			sessionStorage.setItem('wsId', workshopId);
			sessionStorage.setItem('userId',response.data);

			dispatch({
				type: JOIN_WORKSHOP,
				payload: response.data,
			});
			if (response.data != 'null') {
				callback();
			}
		}).catch((e) => {
			console.log(e);
		})
	}
}

/* Action to create a workshop.
@param values object with title and description
@param callback function.
*/
export function createWorkshop(values, callback) {
	return (dispatch) => {
		axios.get(`${ROOT_URL}/workshop/create?title=${values.title}&description=${values.description}`).then(function (response) {
			sessionStorage.setItem('wsId', response.data);

			dispatch({
				type: CREATE_WORKSHOP,
				payload: response.data
			});
			callback();
		}).catch((e) => {
			console.log(e);
		})
	}
}

/* Action which sets the current workshop id.
@param wsId workshop id.
*/
export function setWorkshopTo(wsId){
	return {
		type: SET_WORKSHOP_TO,
		payload: wsId,
	};
}

/* Action which sets the current participant id.
@param usrId participant id.
*/
export function setParticipantTo(usrId){
	return {
		type: SET_PARTICIPANT_TO,
		payload: usrId,
	};
}

/* Action which fetches all users in a workshop.
@param wsId workshop id.
*/
export function fetchUsers(wsId){
	return (dispatch) => {
		axios.get(`${ROOT_URL}/workshop/view/${wsId}/users`).then(function (response) {

			dispatch({
				type: FETCH_USERS,
				payload: response.data,
			});
		}).catch((e) => {
			console.log(e);
		})
	}
}

/* Action which fetches all ideas in a workshop from a user in a workshop.
@param userId user id.
*/
export function fetchIdeas(userId) {
	return (dispatch) => {
		axios.get(`${ROOT_URL}/participant/view/${userId}/ideas`).then(function (response) {

			dispatch({
				type: FETCH_IDEAS,
				payload: response.data,
			});
		}).catch((e) => {
			console.log(e);
		});
	}
}

/* Action which fetches all ideas in a workshop.
@param wsId workshop id.
*/
export function fetchAllIdeas(wsId){

	return (dispatch) => {

    axios.get(`${ROOT_URL}/workshop/view/${wsId}/ideas`).then(function (response) {

      dispatch({
				type: FETCH_ALL_IDEAS,
		    payload: response.data,
      });
    }).catch((e) => {
      console.log(e);
    })
  }
}

/* Action which makes call to create an idea.
@param values object containing title and explanation of idea.
@param userId the user id of the user that created the idea.
@param callback function.
*/
export function createIdea(values, userId, callback) {
	return (dispatch) => {
		axios.get(`${ROOT_URL}/idea/create/${userId}?title=${values.title}&description=${values.explanation}`).then(function (response) {

			dispatch({
				type: CREATE_IDEA,
				payload: response.data,
			});

			callback();
		}).catch((e) => {
			console.log(e);
		});
	}
}

/* Action that fetches and returns title, description and activity of a workshop.
@param wsId workshop id.
*/
export function getWorkshopInfo(wsId) {
	return(dispatch) => {
		axios.get(`${ROOT_URL}/workshop/view/${wsId}`).then(function (response) {
			dispatch({
				type: GET_WS_INFO,
				payload: response.data
			});
		}).catch((e) => {
			console.log(e);
		});
	};
}

/* Action which deletes a specific idea.
@param ideaId idea id of the idea ot be deleted.
*/
export function deleteIdea(ideaId, callback) {
	return (dispatch) => {

		axios.get(`${ROOT_URL}/idea/delete/${ideaId}`).then(function (response) {

			callback();

		}).catch((e) => {
			console.log(e);
		});
	}
}

// Action which cleans the cache.
export function cleanCache(){
	sessionStorage.setItem('userId','');
	return {
		type: 'CLEAN_CACHE',
	};
}

/* Action which fetches the user engagement analytic.
@param wsId workshop id.
*/
export function getUserEngagement(wsId){
	return (dispatch) => {

		axios.get(`${ROOT_URL}/analysis/userengagement/${wsId}`).then(function (response) {

			dispatch({
				type: USER_ENGAGEMENT,
				payload: response.data,
			});
		}).catch((e) => {
			console.log(e);
		});
	}
}

/* Action which fetches the word cloud analytic.
@param wsId workshop id.
*/
export function getWordCloudData(wsId){
	return (dispatch) => {

		axios.get(`${ROOT_URL}/analysis/wordcloud/${wsId}`).then(function (response) {

			dispatch({
				type: WORD_CLOUD,
				payload: response.data,
			});
		}).catch((e) => {
			console.log(e);
		});
	}
}

/* Action which sets a workshop to active.
@param wsId workshop id.
*/
export function activateWorkshop(wsId) {
	return (dispatch) => {
		axios.get(`${ROOT_URL}/workshop/set/${wsId}/active`).then(function (response) {


		}).catch((e) => {
			console.log(e);
		});
	}
}

/* Action which sets active to false for a workshop.
@param wsId workshop id.
*/
export function deactivateWorkshop(wsId) {
	return (dispatch) => {
		axios.get(`${ROOT_URL}/workshop/set/${wsId}/closed`).then(function (response) {


		}).catch((e) => {
			console.log(e);
		});
	}
}
