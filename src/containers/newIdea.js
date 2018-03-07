import React, {Component} from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createIdea, fetchIdeas} from '../actions'
import { renderIdeas } from './ideaGeneration'


class NewPost extends Component {
	constructor(props) {
		super(props)

	}

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
		this.props.createIdea(values, () => {
			this.props.callback();
		});
		this.props.reset();

	}

	render() {
		const { handleSubmit, reset, pristine, submitting } = this.props;
		return (
			<div className='card'>
				<h1 className='card-header' style={{ textAlign: 'left'}}>Ideas</h1>
				<div className="card-body">
					<div className='form-group' style={{padding: '1.5%'}}>
						<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
							<Field
								name="id"
								component={this.renderExplanationField}
								label="id:"
								placeholder="Expand on your thoughts."
								/>
							<div className="button-box" >
								<button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Save</button>
								<button type="button" className="btn btn-danger" onClick={reset} disabled={pristine || submitting} >Clear Values</button>
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
	withRouter(connect(null, {createIdea})(NewPost))
);
