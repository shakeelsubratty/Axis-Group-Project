import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchIdeas } from '../actions';
import UserIdea from '../components/userIdea'

class IdeaGeneration extends Component {

	componentDidMount() {
		this.props.fetchIdeas();
	}

	renderIdeas() {
		const jj = Object.keys(this.props.ideas).map((item)=>{
			return (
				<div key={this.props.ideas[item].id}>
					<UserIdea
						title={this.props.ideas[item].title}

					>{this.props.ideas[item].explanation}
				</UserIdea>
				</div>
			)
		});
		console.log('ideasss=>>',jj);

		return jj
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
						<div className="col-sm-6" style={{ backgroundColor: 'red'}}>{this.renderIdeas()}</div>
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
