import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { attemptLogIn, logOut } from '../actions';

export class Login extends Component {

  componentWillMount(){
    this.props.logOut();
  }

  onSubmit(values){
    this.props.attemptLogIn(values.username, values.password, (result) => {
      if (result == true) {
        this.props.history.push('/create-workshop');
      } else {
        this.props.history.push('/login-failed');
      }
    });
  }

  renderField(field){
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className} style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
        <div className='col-xs-6'>
          <input className='form-control' type={field.type} placeholder={field.placeholder} {...field.input}/>
          <div className='text-help'>
            {touched ? error : ''}
          </div>
        </div>

      </div>
    );
  }

  render() {
   console.log(`isLogged - Login==> ${this.props.isLogged}`);
    const { handleSubmit } = this.props;

    return (
      <div className='main'>
        <div className='wrapper'>
          <div className='card card-big'>
            <h1  className='card-title' style={{textAlign: 'center', width:'100%'}}>Login</h1>
            <form className='form-group row' style={{height:'60%'}} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field name='username' component={this.renderField} type='text' placeholder='Username'/>
              <Field name='password' component={this.renderField} type='password' placeholder='Password'/>
              <div className='button-box'>
                <Link className='btn btn-danger' to='/'>Back</Link>
                <button type='submit' className='btn btn-primary' style={{margin:5}}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "Please input a username"
  }

  if (!values.password) {
    errors.password = "Please input a password"
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    isLogged: state.app.isLogged,
  };
}

const mapDispatchToProps = {
  attemptLogIn,
  logOut
}

export default reduxForm({
  validate,
  form: 'facilitatorLoginForm'
})(
  connect(mapStateToProps,mapDispatchToProps)(Login)
);
