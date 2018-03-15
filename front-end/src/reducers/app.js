import { JOIN_WORKSHOP, CREATE_WORKSHOP, ATTEMPT_LOGIN, LOG_OUT, GET_WS_INFO, SET_WORKSHOP_TO, FETCH_USERS, FETCH_ALL_IDEAS  } from '../actions';

const INITIAL_STATE = {
  isLogged: false,
  wsId: '',
  wsInfo: '',
  wsUsers: null,
  wsIdeas: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ATTEMPT_LOGIN:
    return { ...state, isLogged: action.payload}
    case LOG_OUT:
    return { ...state, isLogged: false }
	  case GET_WS_INFO:
		return { ...state, wsInfo: action.payload}
    case CREATE_WORKSHOP:
    return { ...state, wsId: action.payload}
    case SET_WORKSHOP_TO:{
      console.log('reducer with ->',action.payload);
      return { ...state, wsId: action.payload}
    }
    case FETCH_USERS:
    return { ...state, wsUsers: action.payload}
    case FETCH_ALL_IDEAS:
    return { ...state, wsIdeas: _.mapKeys(action.payload,'_id')}
    default:
      return state;
  }
};
