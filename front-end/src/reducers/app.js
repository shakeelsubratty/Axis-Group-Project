import { JOIN_WORKSHOP, CREATE_WORKSHOP, ATTEMPT_LOGIN, LOG_OUT, GET_WS_INFO, SET_WORKSHOP_TO, FETCH_USERS, FETCH_ALL_IDEAS, SET_PARTICIPANT_TO, USER_ENGAGEMENT, WORD_CLOUD } from '../actions';

const INITIAL_STATE = {
  isLogged: false,
  wsId: '',
  wsInfo: '',
  wsUsers: null,
  wsIdeas: '',
  userId: '',
  userEngagement:'',
  wordCloudData: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case JOIN_WORKSHOP:
			return { ...state, userId: action.payload }
    case SET_PARTICIPANT_TO:
        return { ...state, userId: action.payload}
		case ATTEMPT_LOGIN:
			return { ...state, isLogged: action.payload }
		case LOG_OUT:
			return { ...state, isLogged: false }
		case GET_WS_INFO:
			return { ...state, wsInfo: action.payload}
		case CREATE_WORKSHOP:
			return { ...state, wsId: action.payload}
		case SET_WORKSHOP_TO:
			return { ...state, wsId: action.payload}
		case FETCH_USERS:
			return { ...state, wsUsers: action.payload}
		case FETCH_ALL_IDEAS:
      return { ...state, wsIdeas: _.groupBy(action.payload,'group')}
    case USER_ENGAGEMENT:
      return { ...state, userEngagement: action.payload}
    case WORD_CLOUD:
      return { ...state, wordCloudData: action.payload}
		default:
			return state;
  }
};
