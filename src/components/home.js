import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div className='TypeSelector'>
        <div className='wrapper' style={{flex: 7}}>
          <div className='content'>
            <h3>Select What To Do Now! </h3>
            <div className='button-box' style={{flex:1}} >
              <Link className='btn btn-secondary' to='/login'>
                Create Workshop
              </Link>
              <Link className='btn btn-secondary link' to='/enter-workshop'>
                Enter Workshop
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
