import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { logOut, attemptLogIn, createWorkshop } from '../actions';

/* Component displayed when creating a workshop. Two input fields are displayed
(title and description) and a submit and logout button. When user input is valid
it will create a new workshop.
*/
export class CreateWorkshop extends Component {

	// Method which is called before the component renders.
	componentWillMount() {
		if ((sessionStorage.getItem('usrn') == '') || (sessionStorage.getItem('pass') == '' )) {
			if (!this.props.isLogged) {
				this.props.history.push('/login-failed');
			}
		}
		else {
			const usrn = sessionStorage.getItem('usrn');
			const pass = sessionStorage.getItem('pass');
			this.props.attemptLogIn(usrn,pass, ()=>{
				if (!this.props.isLogged) {
					// If you try to inject invalid login credentials
					this.props.history.push('/login-failed');
				}
			});
		}
	}

	// Method which renders a text input field to input the description of the WS.
	renderTextInputField(field) {
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

	// Method which renders a text area field to input the description of the WS.
	renderTextAreaField(field){
		const { meta: {touched, error} } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`
		return (
			<div className={className}>
			<span>{field.label}</span>
			<textarea className='form-control' type='text' {...field.input}/>
			<div className='text-help'>
			{touched ? error : ''}
			</div>
			</div>
		);
	}

	// Method that is executed when the form (to create a workshop) is submitted.
	onSubmit(values){
		this.props.createWorkshop(values, () => {
			this.props.history.push('/moderator-wait');
		});
	}

	// Renders create workshop scene, two text inputs and two buttons.
	render() {
		const { handleSubmit } = this.props;
		return (
			<div className='main'>
				<div className='wrapper'>
					<div className='card card-big' style={{minHeight:'50%'}}>
						<h1 className='card-title' style={{textAlign:'center', width:'100%'}}>Create Workshop</h1>
						<div className='card-body'>
							<form className='form-group' style={{display:'flex',flexDirection:'column', height:'60%'}} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
								<Field name='title' component={this.renderTextInputField} label='Title'/>
								<Field name='description' component={this.renderTextAreaField} label='Description'/>
								<div style={{width:'100%', textAlign:'center'}}>
									<button type='submit' className='btn btn-primary' style={{margin:5, width:"99%"}}>Submit</button>
								</div>
							</form>
						</div>
						<div style={{width:'100%', textAlign:'right'}}>
						<Link className='btn' style={{marginRight:'10%'}} to='/login' onClick={() => {this.props.logOut()}}>Log Out</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// function which validates user input and sets the error strings.
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
// Redux methods to manage global state of the app and actions.
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
