import { JOIN_WORKSHOP, CREATE_WORKSHOP, ATTEMPT_LOGIN, LOG_OUT, GET_WS_INFO, SET_WORKSHOP_TO  } from '../actions';

const INITIAL_STATE = {
  isLogged: false,
  wsId: '',
  wsInfo: ''
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
    case SET_WORKSHOP_TO:
    return { ...state, wsId: action.payload}
    default:
      return state;
  }
};
