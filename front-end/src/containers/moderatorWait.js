import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWorkshopInfo, setWorkshopTo, attemptLogIn, logOut, fetchUsers } from '../actions';
import { LoadingScreen } from '../components';

class ModeratorWait extends Component {
  constructor(props){
    super(props);
    this.state = {
      showingId: true
    }
  }

  componentWillMount(){
    if (sessionStorage.getItem('wsId') == '') {
      console.log('gets here');
      if (!this.props.wsId) {
        // If you try to get here from login without creating a workshop
        this.props.history.push('/create-workshop')
      }
    } else {
      console.log('wsId - Session ==>', sessionStorage.getItem('wsId'));
      this.props.setWorkshopTo(sessionStorage.getItem('wsId'))
      console.log('hi friend ->', this.props.wsId);
    } // If you refresh

    if ((sessionStorage.getItem('usrn') == '' || sessionStorage.getItem('pass') == '')) {
      if (!this.props.isLogged) {
        // If you try to bypass login
        this.props.history.push('/login-failed');
      }
    } else {
      const usrn = sessionStorage.getItem('usrn');
      const pass = sessionStorage.getItem('pass');
      if (!this.props.attemptLogIn(usrn,pass)) {
        // If you try to inject invalid login credentials
        this.props.history.push('/login-failed');
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props.wsId != nextProps.wsId) {
      console.log('componentWillReceiveProps -->',nextProps.wsId);
      this.props.getWorkshopInfo(nextProps.wsId);
    }
  }

  componentDidMount(){
    if (this.props.wsId != '') {
      this.props.getWorkshopInfo(this.props.wsId);
    }
    console.log('here with wsId->',this.props.wsId);
    var intervalId = setInterval(() => {
        if (!this.state.showingId) {
          this.props.fetchUsers(this.props.wsId);
        }
    }, 3000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  renderUsers(){
    return _.map(this.props.wsUsers, id => {
      console.log(id);
			return (
			  <div className='card userCard' key={id._id}>
					{id._id}
				</div>
			);
		});
  }

  renderContent(){
    console.log('showingId==>', this.state.showingId);
    if (this.state.showingId) {
      return (
        <div className='card-body flexRowCenter' style={{alignItems:'stretch', width:'100%', paddingLeft:'3%'}}>
          <div className='flexColumnCenter' style={{justifyContent:'space-around', marginLeft:'2.5%'}}>
            <div style={{flex:1,textAlign:'center', marginTop:'5%'}}>
              <h4><u>Workshop Id</u></h4>
              <h2>
                {this.props.wsId}
              </h2>
            </div>
            <div style={{flex:2,textAlign:'center', marginTop:'3%'}}>
              <h4><u>Description</u></h4>
              <div style={{textAlign:'-webkit-auto', padding:'1% 3%'}}>
                {this.props.wsDescription}
              </div>
            </div>
          </div>
          <button
            className='btn btn-secondary'
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
            className='btn btn-secondary'
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
              <h4><u>Who's In</u></h4>
              <div className='flexRowCenter' style={{flex:1, flexWrap:'wrap', margin:'3% 0 5%', maxHeight:'200px', overflowY:'scroll'}}>
                {this.renderUsers()}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  renderLinks(){
    return (
      <div className='button-box' style={{padding: `${this.state.showingId ? '1% 1% 0 0' : '1% 0 0 0'}`, width:'100%'}}>
        <Link className='btn btn-danger' to='/' onClick={() => {
          this.props.logOut();
          clearInterval(this.intervalId);
        }}>
          Exit
        </Link>
        <Link className='btn btn-success' to='/moderator-main'> Start</Link>
      </div>
    );
  }

  render(){
    console.log('wsInfo -->', this.props.wsInfo);
    // I think we should take the loader OUT
    // for the most part is just distracting and its never more than a sec
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
              <h1>
                {this.props.wsTitle}
              </h1>
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

function mapStateToProps(state) {
  console.log('mapStateToProps with ->',state.app.wsId);
  return {
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
  fetchUsers
}

export default connect(mapStateToProps,mapDispatchToProps)(ModeratorWait);
