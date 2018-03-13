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

// TODO: Change from boolean into userId
export function joinWorkshop(workshopId) {
	const ret = axios.get(`http://localhost:3000/participant/create/${workshopID}`);
	console.log('joinWorkshop Api -->', ret);
	const request = true;
	console.log('joinWorkshop action called, id is ==> ',workshopId);
	// we should make the post API call here.

	return {
		type: JOIN_WORKSHOP,
		payload: request
	};
}

export function createWorkshop(values) {
	// let result = null;
	// const ret =
	// 	console.log(response.data);
	// 	result = data.
  // });
	//
	// const request = '0123456789';
	// console.log('createWorkshop action called, values is ==> ',values);
	//
  // sessionStorage.setItem('wsId', result);
	// console.log('createWorkshop Api -->',result);
	//
	// return {
	// 	type: CREATE_WORKSHOP,
	// 	payload: result
	// };

	return (dispatch) => {

    axios.get(`http://localhost:3000/workshop/create?title=${values.title}&description=${values.description}`).then(function (response) {

			console.log('createWorkshop Api -->',response.data);
			sessionStorage.setItem('wsId', response.data);

      dispatch({
				type: CREATE_WORKSHOP,
				payload: response.data
      });
    }).catch((e) => {
      console.log(e);
    })
  }
}

export function setWorkshopTo(wsId){
  return {
    type: SET_WORKSHOP_TO,
    payload: wsId,
  };
}

// Api ready
export function fetchUsers(wsId){
	const ret = axios.get(`http://localhost:3000/workshop/view/${wsId}/users`);
	console.log('fetchUsers Api -->', ret);
  const request = currentDataUsers;
  console.log('fetchUsers returns==>', request);

  return {
    type: FETCH_USERS,
    payload: request,
  }
}

export function fetchIdeas(userId) {
	const ret = axios.get(`http://localhost:3000/participant/view/${userId}/ideas`);
	console.log('fetchIdeas Api -->', ret);

	let request = currentDataIdeas;
	console.log('fetchIdeas is called request ==>',request);

	return {
		type: FETCH_IDEAS,
		payload: request
	}
}

export function fetchAllIdeas(wsId){
	const ret = axios.get(`http://localhost:3000/workshop/view/${wsId}/ideas`);
	console.log('fetchAllIdeas Api -->', ret);

	let request = currentAllIdeas;
	console.log('fetchAllIdeas is called request ==>',request);

	return {
		type: FETCH_ALL_IDEAS,
		payload: request
	}
}

// TODO: Add userId and wsId as a value passed return idea id
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

export function getWorkshopInfo(wsId) {

	const ret = axios.get(`http://localhost:3000/workshop/view/${wsId}`);
	console.log('getWorkshopInfo Api -->', ret);

	const request = { title: 'May the force be with you', description: 'Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not. It’s not a story the Jedi would tell you. It’s a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life…'}
	return {
		type: GET_WS_INFO,
		payload: request
	}
}

// TODO: id of idea and id of user
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
