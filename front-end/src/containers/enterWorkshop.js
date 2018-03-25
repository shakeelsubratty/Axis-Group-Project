import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { joinWorkshop, cleanCache } from '../actions'

const STRING_ID_LENGTH = 24;

export class EnterWorkshop extends Component {

	componentWillMount(){
		this.props.cleanCache();
	}

	renderField(field) {
		const { meta: {touched, error}} = field;
		const className = `${touched && error ? 'has-danger' : ''}`
		return(
			<div className={className}>
				<label>Workshop ID: </label>
				<input
					className='form-control'
					type='text'
					placeholder='Place your workshop id here.'
					{...field.input}
				/>
				<div className='text-help'>
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.joinWorkshop(values.workshopId, () => {
			this.props.history.push('/workshop1');
		});
	}

  render() {
	  const { handleSubmit } = this.props;


    return (
      <div className='main'>
			<div className='wrapper'>
				<div className='card card-big' style={{width:'80%'}}>
					<h1 className='card-title' style={{textAlign: 'center', padding: '5%'}}>Join Workshop</h1>
					<div className="card-body">
						<div className='form-group'>
							<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
								<Field
									name="workshopId"
									component={this.renderField}
								/>
								<div className="button-box" style={{marginTop:'2%'}} >
									<button type="submit" className="btn btn-primary">Submit</button>
									<Link to='/' type="button" className="btn btn-danger">Cancel</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
      </div>
    );
  }
}

// function that checks for errors. If errors is empty, then there is no errors.
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
	form: 'JoinWorkshopForm'
})(
	connect(null, { joinWorkshop, cleanCache })(EnterWorkshop)
);
