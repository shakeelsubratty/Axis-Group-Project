import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { deleteIdea, fetchIdeas, getWorkshopInfo, createWorkshop, setWorkshopTo, setParticipantTo} from '../actions';
import UserIdea from '../components/userIdea'
import NewIdea from './newIdea'

export class IdeaGeneration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isInThisPage: false
		}
		this.updateIdeas = this.updateIdeas.bind(this);
		this.updateDeleteIdea = this.updateDeleteIdea.bind(this);

	}

	componentWillMount() {
		this.setState({isInThisPage: true});

		if (sessionStorage.getItem('wsId') == '') {
			if (!this.props.wsId) {
				this.props.history.push('/enter-workshop')
			}
		} else {
			//console.log('wsId - Session ==>', sessionStorage.getItem('wsId'));
			this.props.setWorkshopTo(sessionStorage.getItem('wsId'));
			//console.log('hi friend wsId->', this.props.wsId);
		}

		if (sessionStorage.getItem('userId') == '') {
			this.props.history.push('/enter-workshop')
		} else {
			//console.log('userId - Session ==>', sessionStorage.getItem('userId'));
			this.props.setParticipantTo(sessionStorage.getItem('userId'));
			//console.log('userId->', this.props.userId);
		}
	}

	componentWillReceiveProps(nextProps){
		if (this.props.wsId != nextProps.wsId) {
			//console.log('componentWillReceiveProps wsId-->',nextProps.wsId);
			this.props.getWorkshopInfo(nextProps.wsId);
		}
		if (this.props.userId != nextProps.userId) {
			//console.log('componentWillReceiveProps userId -->',nextProps.userId);
			this.props.fetchIdeas(nextProps.userId);
		}
	}

	componentDidMount(){
		if (this.props.wsId != '') {
			this.props.getWorkshopInfo(this.props.wsId);
		}
		if (this.props.userId != '') {
			this.props.fetchIdeas(this.props.userId);
		}
		//console.log('here with wsId->',this.props.wsId);
		if (this.state.isInThisPage) {
			window.intervalUserId = setInterval(() => {
				if (!document.hasFocus()) {
					// TODO: Make api call to tell the backend the user has switched tabs
					//console.log('USER SWITCHED TAB');
				}
			}, 1000);
		}
	}

	componentWillUnmount(){
	clearInterval(window.intervalUserId);
	}

	updateIdeas() {
		console.log('UPDATE Ideas CALLED');
	//	this.props.deleteIdea(childId)
		this.props.fetchIdeas(this.props.userId);
	}

	updateDeleteIdea(childId) {
		console.log('UPDATE delete Ideas CALLED');
		this.props.deleteIdea(childId,() => {
			this.props.fetchIdeas(this.props.userId);
		});
	//this.props.fetchIdeas(this.props.userId);

	}

	renderIdeas() {
		//console.log('ideasss=>',this.props.ideas);
		if (_.isEmpty(this.props.ideas)) {
			console.log('array is empty.');
			return (
				<div className='card card-big' style={{textAlign:'center', width:'100%', border:'solid 1px #a09a9a'}}>
					<h5>{this.props.wsDescription}</h5>
					<br />
					Input your first Idea on the left!

				</div>
			)
		} else {
			return Object.keys(this.props.ideas).map((item)=>{
				return (
					<div key={this.props.ideas[item]._id}>
						<UserIdea
							callback={this.updateDeleteIdea}
							id = {this.props.ideas[item]._id}
							title={this.props.ideas[item].title}

							>{this.props.ideas[item].description}
						</UserIdea>
					</div>
				)
			});
		}
	}

	render() {
		//console.log('idea generation user id',this.props.userId);
		//console.log('idea generation ws id', this.props.wsId);
		return (
			<div className='main'>
				<div className='wrapper' style={{alignItems:'stretch', padding:'2%'}}>
					<div className='card' style={{backgroundColor:'#e8edf4', margin:0}}>
						<h1 style={{ textAlign: 'center', padding: '20px'}}>{this.props.wsTitle}</h1>
					</div>
					<div className='ideaGen' style={{display:'flex', flex:5.5, marginTop:'2%', flexDirection:'row'}}>
						<NewIdea
							className='card card-big dataBox'
							callbackUpdate={this.updateIdeas}
							userId={this.props.userId}
						/>
						<div className='ideaGenerationPanel' style={{borderRadius:'0px 0.25rem 0.25rem 0px', borderLeft:'solid 1px #b1b1b1'}}>
							<div className='card-body ideaGenRight' style={{flex:1,marginTop:'5%', alignItems:'stretch', overflowY:'scroll'}}>
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
		wsDescription: state.app.wsInfo.description,
		wsId: state.app.wsId,
		userId: state.app.userId,

	};
}

const mapDispatchToProps = {
	deleteIdea,
	fetchIdeas,
	getWorkshopInfo,
	createWorkshop,
	setWorkshopTo,
	setParticipantTo
}

export default connect(mapStateToProps,mapDispatchToProps)(IdeaGeneration);
