import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { logOut, attemptLogIn, createWorkshop } from '../actions';

class CreateWorkshop extends Component {

  componentWillMount(){
    if ((sessionStorage.getItem('usrn') == "null") || (sessionStorage.getItem('pass') == "null")) {
      if (!this.props.isLogged) {
        // If you try to bypass login
        this.props.history.push('/login-failed');
      }
    } else {
      const usrn = sessionStorage.getItem('usrn');
      const pass = sessionStorage.getItem('pass');
      if (!this.props.attemptLogIn(usrn,pass)) {
        // If you try to inject invalid login credentials
        this.props.history.push('/login-failed');
      }
    }
  }

  renderField(field){
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <span>{field.label}</span>
        <input className='form-control' type='text' {...field.input}/>
        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values){
    event.preventDefault();
    // Change to next container when ready
    this.props.createWorkshop(values);
		this.props.history.push('/moderator-wait');
  }

  render() {
    console.log(`isLogged==> ${this.props.isLogged}`)
    const { handleSubmit } = this.props;
    return (
      <div className='main'>
        <div className='wrapper'>
          <div className='card card-big' style={{minHeight:'50%'}}>
            <h1 className='card-title' style={{textAlign:'center', width:'100%'}}> Create Workshop</h1>
            <div className='card-body'>
              <form className='form-group' style={{display:'flex',flexDirection:'column', height:'60%'}} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field name='title' component={this.renderField} label='Title'/>
                <Field name='description' component={this.renderField} label='Description'/>
              <button type='submit' className='btn btn-primary' style={{margin:5}}>Submit</button>
              </form>
            </div>
            <div style={{width:'100%', textAlign:'right'}}>
              <Link className='btn' style={{marginRight:'10%'}} to='/login' onClick={() => {this.props.logOut()}}>
                Log Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = "Please input a title to continue."
	}

  if (!values.description) {
		errors.description = "Please input a description to continue."
	}

	return errors;
}

function mapStateToProps(state) {
  return {
    isLogged: state.app.isLogged,
    comment: state.app.comment
  };
}

const mapDispatchToProps = {
  logOut,
  createWorkshop,
  attemptLogIn
}

export default reduxForm({
  validate,
	form: 'createWorkshopForm'
})(
	connect(mapStateToProps, mapDispatchToProps)(CreateWorkshop)
);
