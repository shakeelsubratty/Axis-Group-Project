import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div className='main'>
        <div className='wrapper' style={{flex: 1}}>
          <div className='card card-big' style={{alignItems:'center'}}>
            <h1 className='card-title' style={{textAlign:'center'}}>Select What To Do Now! </h1>
            <div className='button-box' style={{flex:1}} >
              <Link className='btn btn-primary' to='/login'>
                Create Workshop
              </Link>
              <Link className='btn btn-primary' to='/enter-workshop'>
                Enter Workshop
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
