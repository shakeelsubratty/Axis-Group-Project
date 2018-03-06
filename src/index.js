import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reducers from './reducers';
import ReduxPromise from 'redux-promise';
import {
  Home,
  ParticipantView,
  LoginFailed
} from './components';
import {
EnterWorkshop,
  Login,
  CreateWorkshop,
  ModeratorView,
  ModeratorWait
} from './containers';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path='/login-failed' component={LoginFailed} />
        <Route path='/login' component={Login} />
        <Route path='/create-workshop' component={CreateWorkshop} />
        <Route path='/enter-workshop' component={EnterWorkshop} />
        <Route path='/participant' component={ParticipantView} />
        <Route path='/moderator-wait' component={ModeratorWait} />
        <Route path='/moderator' component={ModeratorView} />
        <Route path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
