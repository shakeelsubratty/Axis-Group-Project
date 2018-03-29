import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions';

const axisLogo = 'https://s3.eu-west-2.amazonaws.com/axis-logo/axis_logo2.png';

// Component that will allow a user to choose between being a participant or facilitator.
export class Home extends Component {

	// All functions called before the component renders.
	componentWillMount() {
		// User is logged out directly for security purposes.
   	this.props.logOut();
  	}

	// Render method for the component. Renders two buttons to enter or create a ws.
  render() {
    return (
      <div className='main'>
        <div className='wrapper' style={{flex: 1}}>
          <div className='card card-big animated slideInDown' style={{alignItems:'center'}}>
            <img className='img-fluid' src={axisLogo} style={{backgroundColor:'transparent'}} />
            <h3 className='card-title' style={{textAlign:'center', marginTop:'5%'}}>What would you like to do?</h3>
            <div className='button-box' style={{flex:1}} >
              <Link className='btn btn-primary' to='/login'>Create Workshop</Link>
              <Link className='btn btn-primary' to='/enter-workshop'>Enter Workshop</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {logOut})(Home)
