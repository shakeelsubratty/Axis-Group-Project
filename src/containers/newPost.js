import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NewPost extends Component {

	renderField(field) {
		const { meta: {touched, error}} = field;
		const className = `${touched && error ? 'has-danger' : ''}`
		return(
			<div className={className}>
				<label>Idea Title:</label>
				<input
					className='form-control'
					type='text'
					placeholder='Place your title here.'
					{...field.input}
					/>
				<label style={{marginTop: '20px'}}>Explanation: </label>
					<input
						className='form-control'
						type='text'
						placeholder='Expand on your thoughts a bit more...'
						{...field.input}
						/>
				<div className='text-help'>
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values) {
		event.preventDefault();
		this.props.history.push('/');
		this.props.joinWorkshop(values);
	}


	render() {
		return (
			<div className='card'>
				<h1 className='card-header' style={{ textAlign: 'left'}}>Ideas </h1>
				<div className="card-body">
					<div className='form-group'>
						<form>
							<Field
								name="workshopId"
								component={this.renderField}
								/>
							<div className="button-box" >
								<button type="submit" className="btn btn-primary">Submit</button>
								<Link to='/' type="button" className="btn btn-danger">Cancel</Link>
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

	if (!values.workshopId) {
		errors.workshopId = "Please input your Workshop ID to continue."
	}

	if (values.workshopId && values.workshopId.length != STRING_ID_LENGTH) {
		errors.workshopId = `Enter a valid Workshop ID (a ${STRING_ID_LENGTH} character string.)`
	}

	return errors;
}

export default reduxForm({
	validate,
	form: 'CreatePost'
})(
	connect(null, null)(NewPost)
);
