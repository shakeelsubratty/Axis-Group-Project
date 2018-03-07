import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchIdeas, getWorkshopInfo } from '../actions';
import UserIdea from '../components/userIdea'
import NewIdea from './newIdea'

class IdeaGeneration extends Component {

	componentDidMount() {
		this.props.fetchIdeas();
		this.props.getWorkshopInfo();

	}

	renderIdeas() {
		return Object.keys(this.props.ideas).map((item)=>{
			return (
				<div key={this.props.ideas[item].id}>
					<UserIdea
						title={this.props.ideas[item].title}

						>{this.props.ideas[item].explanation}
					</UserIdea>
				</div>
			)
		});
	}

	render() {
		console.log('this.props.ideas=>',this.props.ideas)
		return (
			<div className='main'>
				<div className="container-fluid">
					<div className="row">
						<h1 className="col-sm" style={{ textAlign: 'center', padding: '20px', color: 'white'}}>{this.props.wsTitle}</h1>
					</div>
					<div className="row">

						<div className="col-sm-6" style={{ display: 'flex', justifyContent: 'flex-end'}}>
							<div style={{width: '40vw'}}>
								<NewIdea/>
							</div>
						</div>

						<div className="col-sm-6">
							<div  style={{width: '40vw'}}>
								{this.renderIdeas()}
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		ideas: state.ideas,
		wsTitle: state.app.wsInfo.title,
	};
}

const mapDispatchToProps = {
  fetchIdeas,
  getWorkshopInfo
}

export default connect(mapStateToProps,mapDispatchToProps)(IdeaGeneration);
