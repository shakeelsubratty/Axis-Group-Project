import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reducers from './reducers';
import ReduxPromise from 'redux-promise';
import {
  LoginFailed
} from './components';
import {
	Home,
	EnterWorkshop,
  Login,
  CreateWorkshop,
  IdeaGeneration,
  ModeratorWait,
	ModeratorMain
} from './containers';
import ReduxThunk from 'redux-thunk';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise,ReduxThunk)(createStore);

ReactDom.render(

  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
			  <Route path='/workshop:id' component={IdeaGeneration}/>
        <Route path='/login-failed' component={LoginFailed} />
        <Route path='/login' component={Login} />
        <Route path='/create-workshop' component={CreateWorkshop} />
        <Route path='/enter-workshop' component={EnterWorkshop} />
        <Route path='/moderator-wait' component={ModeratorWait} />
				<Route path='/moderator-main' component={ModeratorMain} />
        <Route path='/' component={Home} />
      </Switch>
    </BrowserRouter>

  </Provider>
  , document.querySelector('.container'));
