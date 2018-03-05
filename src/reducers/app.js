import { JOIN_WORKSHOP, CREATE_WORKSHOP, ATTEMPT_LOGIN, LOG_OUT } from '../actions';

const INITIAL_STATE = {
  isLogged: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ATTEMPT_LOGIN:
    return { ...state, isLogged: action.data}
    case LOG_OUT:
    return { ...state, isLogged: false }
    default:
      return state;
  }
};
