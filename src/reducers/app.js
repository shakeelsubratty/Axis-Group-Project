import { GET_WS_TITLE } from '../actions'

const INITIAL_STATE = {
  isLogged: false,
  comment: 'hello World!'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LOGGED_TO":
    return { ...state, isLogged: action.data}
    case "LOG_OUT":
    return { ...state, isLogged: false }
    default:
	 case GET_WS_TITLE:
	 return { ...state, wsTitle: action.payload}
      return state;
  }
};
