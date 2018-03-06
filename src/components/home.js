import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const axisLogo = 'https://s3.eu-west-2.amazonaws.com/axis-logo/axis_logo2.png';

export default class Home extends Component {
  render() {
    return (
      <div className='main home'>
        <div className='wrapper' style={{flex: 1}}>
          <div className='card card-big animated bounceInDown' style={{alignItems:'center'}}>
            <img className='img-fluid' src={axisLogo} style={{backgroundColor:'transparent'}} />
            <h3 className='card-title' style={{textAlign:'center', marginTop:'5%'}}>What would you like to do?</h3>
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
