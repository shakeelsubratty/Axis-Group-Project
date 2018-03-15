import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchIdeas, getWorkshopInfo, createWorkshop, setWorkshopTo} from '../actions';
import UserIdea from '../components/userIdea'
import NewIdea from './newIdea'

class IdeaGeneration extends Component {
	constructor(props) {
		super(props);

		this.update = this.update.bind(this);
	}

	componentWillMount() {
		if (sessionStorage.getItem('wsId') == '') {
			// console.log('gets here');
			if (!this.props.wsId) {
				this.props.history.push('/')
			}
		} else {
			console.log('wsId - Session ==>', sessionStorage.getItem('wsId'));
			this.props.setWorkshopTo(sessionStorage.getItem('wsId'))
			console.log('hi friend ->', this.props.wsId);
		}
	}

	componentWillReceiveProps(nextProps){
		if (this.props.wsId != nextProps.wsId) {
			console.log('componentWillReceiveProps -->',nextProps.wsId);
			this.props.getWorkshopInfo(nextProps.wsId);
		//	this.props.fetchIdeas(this.props.wsId);
		}
	}

	componentDidMount(){
		if (this.props.wsId != '') {
			this.props.getWorkshopInfo(this.props.wsId);
			this.props.fetchIdeas(this.props.wsId);
		}
		console.log('here with wsId->',this.props.wsId);
		// var intervalId = setInterval(() => {
		// 	this.props.fetchIdeas(this.props.wsId);
		// }, 3000);
	}

	componentWillUnmount(){
	//	clearInterval(this.intervalId);
	}

	update() {
		console.log('update called');
		this.props.fetchIdeas(this.props.wsUserId);
	}


	renderIdeas() {
		console.log('ideasss=>',this.props.ideas);
		return Object.keys(this.props.ideas).map((item)=>{
			return (
				<div key={this.props.ideas[item]._id}>
					<UserIdea
						callback = {this.update}
						id = {this.props.ideas[item]._id}
						title={this.props.ideas[item].title}

						>{this.props.ideas[item].description}
					</UserIdea>
				</div>
			)
		});
	}

	render() {
		console.log('idea generation user id',this.props.wsUserId);
		return (
			<div className='main'>
				<div className="container-fluid">
					<div className="row">
						<h1 className="col-sm" style={{ textAlign: 'center', padding: '20px', color: 'white'}}>{this.props.wsTitle}</h1>
					</div>
					<div className="row">

						<div className="col-sm-6" style={{ display: 'flex', justifyContent: 'flex-end'}}>
							<div style={{width: '40vw'}}>
								<NewIdea
									callback={this.update}
									userId={this.props.wsUserId}/>
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
		wsId: state.app.wsId,
		wsUserId: state.app.wsUserId,

	};
}

const mapDispatchToProps = {
	fetchIdeas,
	getWorkshopInfo,
	createWorkshop,
	setWorkshopTo
}

export default connect(mapStateToProps,mapDispatchToProps)(IdeaGeneration);
