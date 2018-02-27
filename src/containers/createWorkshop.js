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
      <div>
        <h1>
          Create Workshop
        </h1>
        <h2>
          Logged in!
        </h2>
        <Link
        className='btn btn-secondary'
        style={{margin:5, width:'50%'}}
        to='/login'
        onClick={() => {
          this.props.logOut();
        }}
        >
          Log Out
        </Link>
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
