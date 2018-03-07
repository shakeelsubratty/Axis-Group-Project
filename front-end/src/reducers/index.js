import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ReducerIdeas from './reducerIdeas';
import app from './app';

const rootReducer = combineReducers({
  app,
  ideas : ReducerIdeas,
  form : formReducer,
});

export default rootReducer;
