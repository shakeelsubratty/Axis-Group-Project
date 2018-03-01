import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../actions';

class CreateWorkshop extends Component {

  componentWillMount(){
  }

  render() {

    if (!this.props.isLogged) {
      return(
        <div className='main createWorkshop'>
          <div className='wrapper'>
            <div className='card card-big'>
              <h2 style={{textAlign:'center'}}>
                Oops...It looks like you are not logged in...
              </h2>
              <div className='card-body' style={{width:'100%', textAlign:'center'}}>
                <Link
                  className='btn btn-primary'
                  style={{margin:'5%', width:'50%'}}
                  to='/login'
                >
                  Log in now
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='main createWorkshop'>
        <div className='wrapper'>
          <div className='card card-big' style={{height:'50%'}}>
            <h1 className='card-title' style={{textAlign:'center', width:'100%'}}>
              Create Workshop
            </h1>
            <div className='card-body' style={{}}>
              <form style={{height: '60%', width: '80%', display: 'flex', flexDirection:'column', justifyContent:'center', margin:'0 auto'}}>
                <span> Type </span>
                <input type='text' name='username' placeholder='...'style={{margin:5}} onChange={(event) => this.setState({user: event.target.value})}/>
                <span> Short Description </span>
                <input type='text' name='password' placeholder='...' style={{margin:5}} onChange={(event) => this.setState({pass: event.target.value})}/>
                <button type='submit' className='btn btn-primary'>
                  Submit
                </button>
              </form>
            </div>
            <div style={{width:'100%', textAlign:'right'}}>
              <Link
              className='btn'
              style={{marginRight:'10%'}}
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
