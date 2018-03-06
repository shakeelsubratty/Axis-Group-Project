import _ from 'lodash';
import { FETCH_IDEAS, CREATE_IDEA } from '../actions';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_IDEAS:
			return _.mapKeys(action.payload,'id');

		default:
			return state;
	}
}
