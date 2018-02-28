import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../actions';

class CreateWorkshop extends Component {
  render() {

    if (!this.props.isLogged) {
      return(
        <div>
          <h1>
            Oops...It looks like you are not logged in...
          </h1>
          <Link
            className='btn btn-secondary'
            style={{margin:5, width:'50%'}}
            to='/login'
          >
            Log in now
          </Link>
        </div>
      );
    }

    return (
      <div className='main'>
        <div className='wrapper'>
          <div className='card card-big'>
            <h1 className='card-header' style={{flex:1, textAlign:'center'}}>
              Create Workshop
            </h1>
            <div className='card-body' style={{flex:4}}>
              <form style={{height: '100%', width: '80%', display: 'flex', flexDirection:'column', justifyContent:'center', margin:'0 auto'}}>
                <span> Type </span>
                <input type='text' name='username' placeholder='...'style={{margin:5}} onChange={(event) => this.setState({user: event.target.value})}/>
                <span> Short Description </span>
                <input type='text' name='password' placeholder='...' style={{margin:5}} onChange={(event) => this.setState({pass: event.target.value})}/>
              </form>
            </div>
            <div className='card-footer button-box'>
              <Link
              className='btn btn-primary'
              style={{margin:5, width:'50%'}}
              to='/login'
              onClick={() => {
                this.props.logOut();
              }}
              >
                Log Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogged: state.app.isLogged,
    comment: state.app.comment
  };
}

const mapDispatchToProps = {
  logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateWorkshop);
