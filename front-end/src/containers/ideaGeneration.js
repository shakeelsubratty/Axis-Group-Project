import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { deleteIdea, fetchIdeas, getWorkshopInfo, createWorkshop, setWorkshopTo, setParticipantTo} from '../actions';
import {UserIdea, LoadingScreen, WorkshopClosed } from '../components'
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

	// All functions called before the component renders.
	componentWillMount() {
		this.setState({isInThisPage: true});

		if (sessionStorage.getItem('wsId') == '') {
			if (!this.props.wsId) {
				this.props.history.push('/enter-workshop')
			}
		} else {
			this.props.setWorkshopTo(sessionStorage.getItem('wsId'));
		}

		if (sessionStorage.getItem('userId') == '') {
			this.props.history.push('/enter-workshop')
		} else {
			this.props.setParticipantTo(sessionStorage.getItem('userId'));
		}
	}

	// Function that runs before you get new props, with a variable called next props.
	componentWillReceiveProps(nextProps){
		if (this.props.wsId != nextProps.wsId) {
			this.props.getWorkshopInfo(nextProps.wsId);
		}

		if (this.props.userId != nextProps.userId) {
			this.props.fetchIdeas(nextProps.userId);
		}
	}

	// Function that runs after the component renders.
	componentDidMount(){
		if (this.props.wsId != '') {
			this.props.getWorkshopInfo(this.props.wsId);
		}

		if (this.props.userId != '') {
			this.props.fetchIdeas(this.props.userId);
		}

		if (this.state.isInThisPage) {
			window.intervalWaitId = setInterval(() => {
				this.props.getWorkshopInfo(this.props.wsId);
			}, 3000);
		}
	}

	// Funciton that runs before we go into another scene.
	componentWillUnmount(){
		clearInterval(window.intervalWaitId);
	}

	// Function that calls the API for new ideas.
	updateIdeas() {
		this.props.fetchIdeas(this.props.userId);
	}

	// Function which deletes an idea and pulls all the ideas from the API.
	updateDeleteIdea(childId) {
		this.props.deleteIdea(childId,() => {
			this.props.fetchIdeas(this.props.userId);
		});
	}

	// Renders all the ideas submitted by the user.
	renderIdeas() {
		if (_.isEmpty(this.props.ideas)) {
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

	// Render method for the component. Renders ideas and form to submit them.
	render() {

			if (!this.props.wsActive && !this.props.wsClosed) {
				return (
					<LoadingScreen
						wsTitle={this.props.wsTitle}
						wsDes={'Waiting for the workshop to be activated...'}
						/>
					);
			} else if (this.props.wsClosed) {
				return (
					<WorkshopClosed
						wsTitle={this.props.wsTitle}
						/>
					);
			} else {

			return (
				<div className='main'>
					<div className='wrapper' style={{alignItems:'stretch', padding:'2%'}}>
						<div className='card' style={{backgroundColor:'#e8edf4', margin:0}}>
							<h1 style={{ textAlign: 'center', padding: '20px'}}>{this.props.wsTitle}</h1>
						</div>
						<div className='ideaGenLeft' style={{display:'flex', flex:5.5, marginTop:'2%', flexDirection:'row'}}>
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
}

// Redux methods to manage global state of the app and actions.
function mapStateToProps(state) {
	return {
		ideas: state.app.usrIdeas,
		wsTitle: state.app.wsInfo.title,
		wsDescription: state.app.wsInfo.description,
		wsId: state.app.wsId,
		userId: state.app.userId,
		wsActive: state.app.wsInfo.active,
		wsClosed: state.app.wsInfo.closed,
		wsDescription: state.app.wsInfo.description,

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
