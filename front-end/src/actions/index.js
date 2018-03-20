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

const ROOT_URL = 'http://localhost:3000';

let currentDataIdeas = [
	{ id: '0', title: "Elon Musk is a genious", explanation:'he has multiple successfull companies'},
	{ id: '1', title: "I should buy a Model S", explanation:'It is quick'},
	{ id: '2', title: "I should buy a Model X", explanation:'It is quick'},
];

let currentAllIdeas = [
	{ id: '0', title: "Elon Musk is a genious", explanation:'he has multiple successfull companies'},
	{ id: '1', title: "I should buy a Model S", explanation:'It is quick'},
	{ id: '2', title: "I should buy a Model X", explanation:'It is quick'},
	{ id: '3', title: "They are taking the hobbits to Isengard", explanation:'Saruman the White lives there'},
	{ id: '4', title: "I find your lack of faith disturbing.", explanation:'Dont be too proud of this technological terror you have constructed. The ability to destroy a planet is insignificant next to the power of the Force.'},
];

let currentDataUsers = [
	{ id: 1234567 },
	{ id: 4235433 },
	{ id: 3246346 },
	{ id: 5546473 },
	{ id: 4234254 },
	{ id: 4968573 },
	{ id: 4312142 },
	{ id: 4312143 },
	{ id: 9423342 },
	{ id: 4325463 },
	{ id: 9596734 },
	{ id: 6569234 },
	{ id: 4353452 },
	{ id: 1234552 },
	{ id: 6745634 },
	{ id: 1343242 },
];

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
			callback();
			console.log('after createWS API and dispatch');
		}).catch((e) => {
			console.log(e);
		})
	}
}

export function logOut() {
	console.log('LOGGING OUT');
	sessionStorage.setItem('usrn', '');
	sessionStorage.setItem('pass', '');
	sessionStorage.setItem('wsId', '');
	clearInterval()
	return {
		type: LOG_OUT,
		payload: false
	};
}

export function joinWorkshop(workshopId, callback) {
	return (dispatch) => {

		axios.get(`http://localhost:3000/participant/create/${workshopId}`).then(function (response) {

			console.log('joinWorkshop Api -->', response.data);
			sessionStorage.setItem('wsId', workshopId);
			sessionStorage.setItem('userId',response.data);

			dispatch({
				type: JOIN_WORKSHOP,
				payload: response.data,
			});
			callback();
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
	console.log('setWorkshopTo ->', wsId);
	return {
		type: SET_WORKSHOP_TO,
		payload: wsId,
	};
}

export function setParticipantTo(id){
	console.log('setParticipantTo ->', id);
	return {
		type: SET_PARTICIPANT_TO,
		payload: id,
	};
}

// Api ready
export function fetchUsers(wsId){

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

	return (dispatch) => {

		axios.get(`${ROOT_URL}/participant/view/${userId}/ideas`).then(function (response) {

			console.log('fecth user ideas response.data-->', response.data);

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
	console.log('calling createIdea action==>',values,' ',userId);

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
export function deleteIdea(id) {

	return (dispatch) => {

		axios.get(`${ROOT_URL}/idea/delete/${id}`).then(function (response) {

			console.log('delete idea-->', response.data);

			dispatch({
				type: FETCH_IDEAS,
				payload: response.data,
			});
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
