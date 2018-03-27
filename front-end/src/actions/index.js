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

const ROOT_URL = 'http://localhost:3000';

export function attemptLogIn(username, password, callback) {
  return (dispatch) => {

		axios.get(`http://localhost:3000/auth/login/${username}/${password}`).then(function (response) {

			console.log('attemptLogIn Api -->', response.data);
			sessionStorage.setItem('usrn', username);
		  sessionStorage.setItem('pass', password);

			dispatch({
				type: ATTEMPT_LOGIN,
				payload: response.data,
			});
			callback(response.data);
			console.log('after createWS API and dispatch');
		}).catch((e) => {
			console.log(e);
		})
	}
}

export function logOut(callback) {
	console.log('LOGGING OUT');
	sessionStorage.setItem('usrn', '');
	sessionStorage.setItem('pass', '');
	sessionStorage.setItem('wsId', '');
	if (typeof callback === 'function') {
		console.log('Callback is function');
		callback();
	}
	return {
		type: LOG_OUT,
		payload: false
	};
}

export function joinWorkshop(workshopId, callback) {
	console.log('join ws action is called');

	return (dispatch) => {

		axios.get(`http://localhost:3000/participant/create/${workshopId}`).then(function (response) {

			console.log('joinWorkshop Api -->', response.data);
			sessionStorage.setItem('wsId', workshopId);
			sessionStorage.setItem('userId',response.data);

			dispatch({
				type: JOIN_WORKSHOP,
				payload: response.data,
			});
			if (response.data != 'null') {
				callback();
			}
			console.log('after createWS API and dispatch');
		}).catch((e) => {
			console.log(e);
		})
	}

	// const request = true;
	// console.log('joinWorkshop action called, id is ==> ',workshopId);
	// we should make the post API call here.

}

export function createWorkshop(values, callback) {
	console.log('create ws action is called');

	return (dispatch) => {

		axios.get(`http://localhost:3000/workshop/create?title=${values.title}&description=${values.description}`).then(function (response) {

			console.log('createWorkshop Api -->',response.data);
			sessionStorage.setItem('wsId', response.data);

			dispatch({
				type: CREATE_WORKSHOP,
				payload: response.data
			});
			callback();
			console.log('after createWS API and dispatch');
		}).catch((e) => {
			console.log(e);
		})
	}
}

export function setWorkshopTo(wsId){
	console.log('setWorkshopTo action is called ->', wsId);
	return {
		type: SET_WORKSHOP_TO,
		payload: wsId,
	};
}

export function setParticipantTo(id){
	console.log('setParticipantTo action is called ->', id);
	return {
		type: SET_PARTICIPANT_TO,
		payload: id,
	};
}

// Api ready
export function fetchUsers(wsId){
	console.log('fetchUsers action is called');

	return (dispatch) => {

		axios.get(`http://localhost:3000/workshop/view/${wsId}/users`).then(function (response) {

			console.log('fetchUsers Api -->', response.data);

			dispatch({
				type: FETCH_USERS,
				payload: response.data,
			});
		}).catch((e) => {
			console.log(e);
		})
	}
}

export function fetchIdeas(userId) {
	console.log('fetchIDeas action is called');
	return (dispatch) => {

		axios.get(`${ROOT_URL}/participant/view/${userId}/ideas`).then(function (response) {

		//	console.log('fecth user ideas response.data-->', response.data);

			dispatch({
				type: FETCH_IDEAS,
				payload: response.data,
			});
		}).catch((e) => {
			console.log(e);
		});
	}
}


export function fetchAllIdeas(wsId){
	console.log('fetchALLIDeas action is called');

	return (dispatch) => {

    axios.get(`http://localhost:3000/workshop/view/${wsId}/ideas`).then(function (response) {

			console.log('fetchAllIdeas Api -->', response.data);

      dispatch({
				type: FETCH_ALL_IDEAS,
		    payload: response.data,
      });
    }).catch((e) => {
      console.log(e);
    })
  }
}

// TODO: Add userId and wsId as a value passed return idea id
export function createIdea(values, userId, callback) {
	console.log('createIdea action is called ==>',values,' ',userId);

	return (dispatch) => {

		axios.get(`${ROOT_URL}/idea/create/${userId}?title=${values.title}&description=${values.explanation}`).then(function (response) {

			console.log('createIdea response.data-->', response.data);

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

export function getWorkshopInfo(wsId) {
	console.log('GET_WS_INFO action is called');
	return(dispatch) => {
		axios.get(`http://localhost:3000/workshop/view/${wsId}`).then(function (response) {
			console.log('getWorkshopInfo Api -->', response.data);
			dispatch({
				type: GET_WS_INFO,
				payload: response.data
			});
		}).catch((e) => {
			console.log(e);
		});
	};
}

// TODO: id of idea and id of user
export function deleteIdea(id, callback) {
	console.log('deleteIdea action is called');
	return (dispatch) => {

		axios.get(`${ROOT_URL}/idea/delete/${id}`).then(function (response) {

			console.log('delete idea-->', response);

			callback();

		}).catch((e) => {
			console.log(e);
		});
	}
}

export function cleanCache(){
	console.log('CLEAN_CACHE');
	sessionStorage.setItem('userId','');
	return {
		type: 'CLEAN_CACHE',
	};
}

export function getUserEngagement(wsId){
	return (dispatch) => {

		axios.get(`${ROOT_URL}/analysis/userengagement/${wsId}`).then(function (response) {

			console.log('getUserEngagement API-->', response.data);

			dispatch({
				type: USER_ENGAGEMENT,
				payload: response.data,
			});
		}).catch((e) => {
			console.log(e);
		});
	}
}

export function getWordCloudData(wsId){
	return (dispatch) => {

		axios.get(`${ROOT_URL}/analysis/wordcloud/${wsId}`).then(function (response) {

			console.log('getWordCloudData API-->', response.data);

			dispatch({
				type: WORD_CLOUD,
				payload: response.data,
			});
		}).catch((e) => {
			console.log(e);
		});
	}
}

export function activateWorkshop(wsId) {
	// return (dispatch) => {
		console.log('activate ws called');
		axios.get(`${ROOT_URL}/workshop/set/${wsId}/active`);
		//.then(function (response) {
		//
		// 	console.log('getWordCloudData API-->', response.data);
		//
		// 	dispatch({
		// 		type: ACTIVATE_WORKSHOP,
		// 		payload: response.data,
		// 	});
		// }).catch((e) => {
		// 	console.log(e);
		// });
	// }
}
