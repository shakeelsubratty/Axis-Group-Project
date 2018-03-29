import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Component which user is redirected to if login fails.
export default class LoginFailed extends Component {

	// Renders a error meesage and a button to log in again.
	render(){
   	return(
      	<div className='main'>
        		<div className='wrapper'>
          		<div className='card card-big'>
            		<h2 style={{textAlign:'center'}}>Oops...It looks like you are not logged in...</h2>
            		<div className='card-body' style={{width:'100%', textAlign:'center'}}>
              			<Link className='btn btn-primary' style={{margin:'5%', width:'50%'}} to='/login'>
               			Log in now
              			</Link>
            		</div>
          		</div>
        		</div>
      	</div>
    	);
  	}
}
