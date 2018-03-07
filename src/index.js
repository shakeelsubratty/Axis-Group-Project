import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reducers from './reducers';
import ReduxPromise from 'redux-promise';
import {
	Home,
  LoginFailed
} from './components';
import {
	EnterWorkshop,
	Login,
	CreateWorkshop,
	IdeaGeneration
} from './containers';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(

  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
		 <div>
      <Switch>
			<Route path='/workshop:id' component={IdeaGeneration}/>
        <Route path='/login-failed' component={LoginFailed} />
        <Route path='/login' component={Login} />
        <Route path='/create-workshop' component={CreateWorkshop} />
        <Route path='/enter-workshop' component={EnterWorkshop} />
        <Route path='/' component={Home} />
      </Switch>
	</div>
    </BrowserRouter>

  </Provider>
  , document.querySelector('.container'));
