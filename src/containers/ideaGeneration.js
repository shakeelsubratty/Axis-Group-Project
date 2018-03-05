import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchIdeas } from '../actions';
import { UserIdea } from '../components'

class IdeaGeneration extends Component {

	componentDidMount() {
		this.props.fetchIdeas();
	}

	renderIdeas() {
		return _.map(this.props.ideas, idea => {
			return (
				<UserIdea title={idea.title} description={idea.description} />
			);
		});
	}

	render() {
		console.log('this.props.ideas=>',this.props.ideas)
		return (
			<div className='main'>
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm" style={{ textAlign: 'center', backgroundColor: 'yellow'}}>100%</div>
					</div>

					<div className="row">
						<div className="col-sm-6" style={{ backgroundColor: 'red'}}>50%</div>
						<div className="col-sm-6" style={{ backgroundColor: 'orange' }}>50%</div>
					</div>
				</div>
			</div>


		);
	}
}

function mapStateToProps(state) {
	return { ideas: state.ideas };
}

export default connect(mapStateToProps, {fetchIdeas})(IdeaGeneration);
