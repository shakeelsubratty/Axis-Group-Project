import React, {Component} from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createIdea, fetchIdeas} from '../actions';
import { renderIdeas } from './ideaGeneration';

export class NewIdea extends Component {

	renderTitleField(field) {
		const { meta: {touched, error}} = field;
		const className = `${touched && error ? 'has-danger' : ''}`
		return(
			<div className={className}>
				<label className='badge' >{field.label}</label>
				<input
					className='form-control'
					type='text'
					placeholder={field.placeholder}
					{...field.input}
					/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	renderExplanationField(field) {
		const { meta: {touched, error}} = field;
		const className = `${touched && error ? 'has-danger' : ''}`
		return(
			<div className={className} style={{marginTop: '10px'}}>
				<label>{field.label}</label>
				<textarea
					className='form-control'
					type='text'
					placeholder={field.placeholder}
					{...field.input}
					/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}


	onSubmit(values) {
		console.log('new idea user Id',this.props.userId);
		this.props.createIdea(values, this.props.userId, () => {
			this.props.callback();
		});
		this.props.reset();

	}

	render() {
		const { handleSubmit, reset, pristine, submitting } = this.props;
		return (
			<div className='ideaGenerationPanel' style={{borderRadius:'0.25rem 0px 0px 0.25rem'}}>
				<h1 className='card-header' style={{ textAlign: 'left', flex:1, backgroundColor:'#e8edf4', margin:0, borderBottom:'none'}}>Ideas</h1>
				<div className="card-body" style={{flex:5,backgroundColor:'#e8edf4 !important'}}>
					<div className='form-group' style={{padding: '1.5%', height:'100%'}}>
						<form
							onSubmit={handleSubmit(this.onSubmit.bind(this))}
							style={{display:'flex', flexDirection:'column', justifyContent:'space-around', height:'100%', padding:'3%'}}
						>
							<Field
								name="title"
								component={this.renderTitleField}
								label="Idea Title:"
								placeholder="Tell us about your idea."
								/>
							<Field
								name="explanation"
								component={this.renderExplanationField}
								label="Explanation:"
								placeholder="Expand on your thoughts."
								/>
							<div className="button-box" >
								<button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
								<button type="button" className="btn btn-danger" onClick={()=> {
									var r = confirm("Are you sure you want to exit this workshop?");
									if (r == true) {
										this.props.history.push('/enter-workshop');
									}
								}}>
									Exit Workshop
								</button>
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

	if (!values.title) {
		errors.title = "Please enter a title to continue."
	}

	if (!values.explanation) {
		errors.explanation = "Please provide a bit of clarification on your ideas."
	}

	return errors;
}

export default reduxForm({
	validate,
	form: 'CreateIdea'
})(
	withRouter(connect(null, {createIdea})(NewIdea))
);
