import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { attemptLogIn } from '../actions';

class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      user:'',
      pass:''
    }
  }

  onFormSubmit(uss,pass){
    console.log(uss + pass);
    alert(`User => ${this.state.user}, Pass=> ${this.state.pass}`);
    this.setState({})
  }

  render() {
    console.log(`isLogged==> ${this.props.isLogged}`)
    return (
      <div className='Home'>
        <div className='wrapper' style={{flex:1}}>
          <h1 style={{textAlign: 'center', marginTop:5}}>
            Login
          </h1>
          <form className='login-form'>
            <input type='text' name='username' placeholder='Username'style={{margin:5}} onChange={(event) => this.setState({user: event.target.value})}/>
            <input type='password' name='password' placeholder='Password' style={{margin:5}} onChange={(event) => this.setState({pass: event.target.value})}/>
            <div className='button-box'>
              <Link
                className='btn btn-secondary link'
                type='submit'
                style={{margin:5, width:'50%'}}
                to='/create-workshop'
                onClick={() => {
                  this.onFormSubmit(this.state.user,this.state.pass);
                  this.props.attemptLogIn(true);
                }}
              >
                Submit
              </Link>
              <Link
                className='btn btn-secondary link'
                style={{margin: 5, width:'50%'}}
                to='/'
              >
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogged: state.app.isLogged,
    firstTry: state.app.firstTry
  };
}

const mapDispatchToProps = {
  attemptLogIn
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
