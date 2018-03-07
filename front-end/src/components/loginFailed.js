import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LoginFailed extends Component {

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
