import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { WorkshopIdea, LoadingScreen } from '../components';
import { getWorkshopInfo, setWorkshopTo, attemptLogIn, logOut, fetchAllIdeas, getUserEngagement } from '../actions';

export class ModeratorMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
    };
    var intervalWsId = '';
  }

  componentWillMount(){
    if (sessionStorage.getItem('wsId') == '') {
      if (!this.props.wsId) {
        // If you try to get here from login without creating a workshop
        this.props.history.push('/create-workshop')
      }
    } else {
      this.props.setWorkshopTo(sessionStorage.getItem('wsId'))
      this.setState({isLogged:true})
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

  componentDidMount(){
    if (this.props.wsId != '') {
      this.props.getWorkshopInfo(this.props.wsId);
      this.props.fetchAllIdeas(this.props.wsId);
    }
    if (this.state.isLogged) {
      window.intervalWsId = setInterval(() => {
        this.props.fetchAllIdeas(this.props.wsId);
        this.props.getUserEngagement(this.props.wsId);
      }, 3000);
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props.wsId != nextProps.wsId) {
      this.props.getWorkshopInfo(nextProps.wsId);
      this.props.fetchAllIdeas(this.props.wsId);
    }
  }

  componentWillUnmount(){
    clearInterval(window.intervalWsId);
  }

  renderIdeas() {
		return Object.keys(this.props.wsIdeas).map((item)=>{
			return (
				<div key={this.props.wsIdeas[item].id}>
					<WorkshopIdea
						id = {this.props.wsIdeas[item].id}
						title={this.props.wsIdeas[item].title}
					>
            {this.props.wsIdeas[item].description}
					</WorkshopIdea>
				</div>
			)
		});
	}

  renderUserEngagementData(){
    if (!this.props.userEngagement) {
      return(
        <div className='card flexColumnCenter' style={{flex:1, backgroundColor:'#f5f5f5 !important', padding:'2%', alignItems:'stretch'}}>
          <h5 style={{textAlign:'center'}}>Loading...</h5>
        </div>
      );
    } else {
      let userEngagementColor = 'black';

      if (this.props.userEngagement.overallEngagement > 0.7) {
        userEngagementColor = 'green';
      } else if (this.props.userEngagement.overallEngagement < 0.4) {
        userEngagementColor = 'red';
      }

      return(
        <div className='card flexRowCenter' style={{flex:1, backgroundColor:'#f5f5f5 !important', padding:'3%', alignItems:'stretch'}}>
          <div className='flexColumnCenter' style={{flex:1, alignItems:'stretch', borderRight:'1px solid black '}}>
            <div style={{flex:1, textAlign:'left', display:'flex'}}>
              <span style={{flex:3, fontSize:'11pt', textAlign:'left'}}>Really Engaged:</span>
              <span style={{flex:1}}>{this.props.userEngagement.superEngaged * 100 + '%'}</span>
            </div>
            <div style={{flex:1, textAlign:'left', display:'flex'}}>
              <span style={{flex:3,fontSize:'11pt', textAlign:'left'}}>Engaged:</span>
              <span style={{flex:1}}>{this.props.userEngagement.engaged * 100 + '%'}</span>
            </div>
            <div style={{flex:1, textAlign:'left', display:'flex'}}>
              <span style={{flex:3,fontSize:'11pt', textAlign:'left'}}>Unengaged:</span>
              <span style={{flex:1}}>{this.props.userEngagement.unengaged * 100 + '%'}</span>
            </div>
            <div style={{flex:1, textAlign:'left', display:'flex'}}>
              <span style={{flex:3,fontSize:'11pt', textAlign:'left'}}>Really Unengaged:</span>
              <span style={{flex:1}}>{this.props.userEngagement.superUnengaged * 100 + '%'}</span>
            </div>
          </div>
          <div className='flexColumnCenter' style={{flex:1}}>
            <h3 style={{color:userEngagementColor}}>{this.props.userEngagement.overallEngagement * 100 + '%'}</h3>
            <h5>Overall</h5>
          </div>
        </div>
      );
    }
  }


  renderDataBox(){

    return(
      <div className='card card-big dataBox'>
        {this.renderUserEngagementData()}
        <div className='card flexColumnCenter' style={{flex:1, backgroundColor:'#f5f5f5 !important'}}>
          Data two
        </div>
        <div className='card flexColumnCenter' style={{flex:1, backgroundColor:'#f5f5f5 !important', marginBottom:0}}>
          Data three
        </div>
      </div>
    );
  }

  renderIdeaPanel(){
    return(
      <div className='card card-big' style={{flex:1,borderRadius:0,borderBottom:'none',marginBottom:0,paddingBottom:'2%'}}>
        <div style={{textAlign:'right'}}>
          <Link to='/' onClick={() => {
            this.props.logOut(() => {
              clearInterval(this.intervalWsId);
            });
          }}>
            Exit
          </Link>
        </div>
        <h3 className='card-title' style={{textAlign:'left'}}><u>{this.props.wsTitle}</u></h3>
        <div className='card-body' style={{flex:6,marginTop:'2%', alignItems:'stretch', overflowY:'scroll'}}>
          <div style={{flex:1}}>
            {this.renderIdeas()}
          </div>
        </div>
        <div
          className='flexRowCenter card'
          style={{backgroundColor:'#e8edf4',border:'none', marginTop:'2%', alignItems:'flex-end'}}
        >
          <div style={{flex:2.5, textAlign:'right'}}>
            <button className='btn btn-success'>
              Submit Workshop
            </button>
          </div>
        </div>
      </div>
    );
  }

  render(){
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
          <div className='wrapper' style={{alignItems:'stretch', padding:'2%'}}>
            <div style={{display:'flex', flex:5.5, marginTop:'2%', flexDirection:'row'}}>
              {this.renderDataBox()}
              {this.renderIdeaPanel()}
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state){
  return {
    isLogged: state.app.isLogged,
    wsId: state.app.wsId,
    wsInfo: state.app.wsInfo,
    wsTitle: state.app.wsInfo.title,
    wsIdeas: state.app.wsIdeas,
    userEngagement: state.app.userEngagement
  };
}

const mapDispatchToProps = {
  getWorkshopInfo,
  attemptLogIn,
  logOut,
  setWorkshopTo,
  fetchAllIdeas,
  getUserEngagement
};

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorMain);
