import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createIdea } from '../actions'

class NewPost extends Component {

	renderTitleField(field) {
		const { meta: {touched, error}} = field;
		const className = `${touched && error ? 'has-danger' : ''}`
		return(
			<div className={className}>
				<label>{field.label}</label>
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
		event.preventDefault();
		this.props.createIdea(values);

	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div className='card'>
				<h1 className='card-header' style={{ textAlign: 'left'}}>Ideas </h1>
				<div className="card-body">
					<div className='form-group'>
						<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
							<Field
								name="ideaTitle"
								component={this.renderTitleField}
								label="Idea Title:"
								placeholder="Tell us about your idea."
								/>
							<Field
								name="ideaExplanation"
								component={this.renderExplanationField}
								label="Explanation:"
								placeholder="Expand on your thoughts."
								/>
							<div className="button-box" >
								<button type="submit" className="btn btn-primary" >Save</button>
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

	if (!values.ideaTitle) {
		errors.ideaTitle = "Please enter a title to continue."
	}

	if (!values.ideaExplanation) {
		errors.ideaExplanation = "Please provide a bit of clarification on your ideas."
	}

	return errors;
}

export default reduxForm({
	validate,
	form: 'CreateIdea'
})(
	connect(null, {createIdea})(NewPost)
);
