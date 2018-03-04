import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { logOut, createWorkshop } from '../actions';

class CreateWorkshop extends Component {

  componentWillMount(){
  }

  displayNotLogged(){
    return (
      <div className='wrapper'>
        <div className='card card-big'>
          <h2 style={{textAlign:'center'}}>Oops...It looks like you are not logged in...</h2>
          <div className='card-body' style={{width:'100%', textAlign:'center'}}>
            <Link className='btn btn-primary' style={{margin:'5%', width:'50%'}} to='/login'>
              Log in now
            </Link>
          </div>
        </div>
      </div>
    );
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
		this.props.history.push('/');
    this.props.createWorkshop(values);
  }

  render() {

    const { handleSubmit } = this.props;

    if (!this.props.isLogged) {
      return(
        <div className='main createWorkshop'>
          {this.displayNotLogged()}
        </div>
      );
    } else {
      return (
        <div className='main createWorkshop'>
          <div className='wrapper'>
            <div className='card card-big' style={{minHeight:'50%'}}>
              <h1 className='card-title' style={{textAlign:'center', width:'100%'}}> Create Workshop</h1>
              <div className='card-body'>
                <form className='form-group' style={{display:'flex',flexDirection:'column', height:'60%'}} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <Field name='type' component={this.renderField} label='Type'/>
                <Field name='description' component={this.renderField} label='Description'/>
                <button type='submit' className='btn btn-primary' style={{margin:5}}>Submit</button>
                </form>
              </div>
              <div style={{width:'100%', textAlign:'right'}}>
                <Link className='btn' style={{marginRight:'10%'}} to='/login' onClick={() => {this.props.logOut();}}>
                  Log Out
                </Link>

              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function validate(values) {
	const errors = {};

	if (!values.type) {
		errors.type = "Please input a type to continue."
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
  createWorkshop
}

export default reduxForm({
  validate,
	form: 'createWorkshopForm'
})(
	connect(mapStateToProps, mapDispatchToProps)(CreateWorkshop)
);
