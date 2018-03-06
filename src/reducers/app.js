import { JOIN_WORKSHOP, CREATE_WORKSHOP, ATTEMPT_LOGIN, LOG_OUT, GET_WS_TITLE  } from '../actions';

const INITIAL_STATE = {
  isLogged: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ATTEMPT_LOGIN:
    return { ...state, isLogged: action.data}
    case LOG_OUT:
    return { ...state, isLogged: false }
	 case GET_WS_TITLE:
		 return { ...state, wsTitle: action.payload}
    default:
      return state;
  }
};
