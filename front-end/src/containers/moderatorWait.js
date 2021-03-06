import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { activateWorkshop,
			getWorkshopInfo,
			setWorkshopTo,
			attemptLogIn,
			logOut,
			fetchUsers } from '../actions';
import { LoadingScreen } from '../components';

/*
Class which displays infomration about the workshop as well as the users currently
in.
*/
export class ModeratorWait extends Component {
	constructor(props){
   	super(props);
    	this.state = {
      	showingId: true
    	};
  	}

	// Function that runs before we go into another scene.
	componentWillMount() {
   	if (sessionStorage.getItem('wsId') == '') {
      	if (!this.props.wsId) {
        		// If you try to get here from login without creating a workshop
        		this.props.history.push('/create-workshop')
      	}
    	} else {
      	this.props.setWorkshopTo(sessionStorage.getItem('wsId'))
    	} // If you refresh

    	if ((sessionStorage.getItem('usrn') == '' || sessionStorage.getItem('pass') == '')) {
      	if (!this.props.isLogged) {
        		// If you try to bypass login
        		this.props.history.push('/login-failed');
      	}
    	} else {
      	const usrn = sessionStorage.getItem('usrn');
      	const pass = sessionStorage.getItem('pass');
      	this.props.attemptLogIn(usrn,pass, ()=>{
        		if (!this.props.isLogged) {
         		// If you try to inject invalid login credentials
         		this.props.history.push('/login-failed');
        		}
      	});
    	}
  	}

	// Function that runs before you get new props, with a variable called next props.
  	componentWillReceiveProps(nextProps){
   	if (this.props.wsId != nextProps.wsId) {
      	this.props.getWorkshopInfo(nextProps.wsId);
   	}
  	}

	// Function that runs after the component renders.
  	componentDidMount() {
   	if (this.props.wsId != '') {
      	this.props.getWorkshopInfo(this.props.wsId);
   	}

    	window.intervalWaitId = setInterval(() => {
      	if (!this.state.showingId) {
         	this.props.fetchUsers(this.props.wsId);
        	}
   	}, 3000);
  	}

	// Function that runs before we go into another scene.
	componentWillUnmount(){
   	clearInterval(window.intervalWaitId);
 	}

	// Function which maps the users array to display the users that are in the ws.
	renderUsers(){
   	return _.map(this.props.wsUsers, id => {
			return (
			  <div className='card userCard' style={{minWidth:'30%'}} key={id._id}>
					<span style={{fontSize:'11pt'}}>{id._id}</span>
				</div>
			);
		});
  	}

	// Function which renders the ws id and title of the workshop.
	renderContent(){
   	if (this.state.showingId) {
      	return (
	      	<div className='card-body flexRowCenter' style={{alignItems:'stretch', width:'100%', paddingLeft:'3%'}}>
	         	<div className='flexColumnCenter' style={{justifyContent:'space-around', alignItems:'stretch', marginLeft:'2.5%'}}>
	            	<div style={{flex:1,textAlign:'center', marginTop:'5%'}}>
	              		<h4 className='wsIdTitle'><u>Workshop Id</u></h4>
	              		<h5 style={{marginTop:'2%'}}>{this.props.wsId}</h5>
	            	</div>
	            	<div style={{flex:2,textAlign:'center', marginTop:'3%'}}>
	              		<h4 className='wsDesTitle'><u>Description</u></h4>
	              		<div style={{textAlign:'center', padding:'1% 3%'}}>
	                		{this.props.wsDescription}
	              		</div>
	            	</div>
	          	</div>
	          	<button
	            	className='btnSide btn-secondary'
	            	style={{backgroundColor:'#e8edf4', borderColor:'#bfbebe'}}
	            	onClick={() => {
	              		window.animateLeftToRight('moderatorWaitPanel');
	              		{this.setState({showingId: !this.state.showingId})}
	              		{this.props.fetchUsers(this.props.wsId);}
	            	}}
	          	>
	            	<b>&gt;</b>
	         	</button>
	        	</div>
	      );
	   } else {
	      return (
	        	<div className='card-body flexRowCenter' style={{alignItems:'stretch', width:'100%', paddingRight:'3%'}}>
	         	<button
	            	className='btnSide btn-secondary'
	            	style={{backgroundColor:'#e8edf4', borderColor:'#bfbebe'}}
	            	onClick={() => {
	              		window.animateRightToLeft('moderatorWaitPanel');
	              		{this.setState({showingId: !this.state.showingId})}
	            	}}
	          	>
	            	<b>&lt;</b>
	          	</button>
	          	<div className='flexRowCenter' style={{alignItems:'flex-start'}}>
	            	<div style={{flex:1,textAlign:'center', margin:'5% 2.5% 0 0'}}>
	              		<h4><u>Connected Users</u></h4>
	              		<div className='flexRowCenter' style={{flex:1, flexWrap:'wrap', margin:'3% 0 5%', maxHeight:'200px', overflowY:'scroll'}}>
	                		{this.renderUsers()}
	              		</div>
	            	</div>
	          	</div>
	        	</div>
	      );
	   }
  	}

	// Renders buttons to log out and to activate workshop.
	renderLinks(){
   	return (
      	<div className='button-box' style={{padding: `${this.state.showingId ? '1% 1% 0 0' : '1% 0 0 0'}`, width:'100%'}}>
        		<Link className='btn btn-danger' to='/' onClick={() => {
          		this.props.logOut();
        		}}>
		  			Exit
        		</Link>
        		<Link className='btn btn-success' to='/moderator-main' onClick={() => {
         		this.props.activateWorkshop(this.props.wsId);
				}}>Start</Link>
      	</div>
    	);
  	}

	// Render method for the component. Renders buttons, users and ws info.
 	render() {
   	if (this.props.wsInfo == '' && false) {
			return(
        		<div className='main'>
          		<div className='wrapper'>
            	<LoadingScreen/>
          	</div>
        	</div>
      	);

    	} else {
      	return(
        		<div className='main'>
          		<div className='wrapper'>
            		<div className='card' style={{width:'80%', backgroundColor:'#e8edf4', minHeight:'8%', textAlign:'center'}}>
              		<h1 style={{margin:5}}>{this.props.wsTitle}</h1>
            		</div>
            	<div
              		id='moderatorWaitPanel'
              		className='card card-big'
              		style={{alignItems:'center', minHeight:'70%', paddingRight:0, paddingLeft:0}}
            	>
              		{this.renderContent()}
              		{this.renderLinks()}
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
		isLogged: state.app.isLogged,
		wsId: state.app.wsId,
		wsInfo: state.app.wsInfo,
		wsTitle: state.app.wsInfo.title,
		wsDescription: state.app.wsInfo.description,
		wsUsers: state.app.wsUsers,
  	};
}

const mapDispatchToProps = {
	getWorkshopInfo,
	attemptLogIn,
	logOut,
	setWorkshopTo,
 	fetchUsers,
	activateWorkshop
}

export default connect(mapStateToProps,mapDispatchToProps)(ModeratorWait);
