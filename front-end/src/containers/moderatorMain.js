import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { WorkshopIdea, LoadingScreen, WordCloud } from '../components';
import { deactivateWorkshop, getWorkshopInfo, setWorkshopTo, attemptLogIn, logOut, fetchAllIdeas, getUserEngagement, getWordCloudData } from '../actions';

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
      this.props.getWordCloudData(this.props.wsId);
    }
    if (this.state.isLogged) {
      window.intervalWsId = setInterval(() => {
        this.props.fetchAllIdeas(this.props.wsId);
        this.props.getUserEngagement(this.props.wsId);
        this.props.getWordCloudData(this.props.wsId);
      }, 4000);
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

  // We render the groups by iterating wsIdeas, which is grouped by groups
  renderIdeaGroups(){
    return Object.keys(this.props.wsIdeas).map((item,index)=>{
			return (
				<div key={index}>
          <h5><u>Group {index + 1}</u></h5>
          {this.renderIdeas(this.props.wsIdeas[item])}
				</div>
			)
		});
  }

  // We render the ideas in each group by mapping through each group
  renderIdeas(group) {
		return Object.keys(group).map((idea)=>{
      return(
        <div key={group[idea]._id}>
        <WorkshopIdea
					id = {group[idea]._id}
					title={group[idea].title}
          data={this.props.wordCloudData}
        >
          {group[idea].description}
				</WorkshopIdea>
      </div>
      )
    });
	}

  renderUserEngagementData(){
    if (!this.props.userEngagement || this.props.userEngagement.status == 500) {
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
              <span style={{flex:1}}>{this.props.userEngagement[3] * 100 + '%'}</span>
            </div>
            <div style={{flex:1, textAlign:'left', display:'flex'}}>
              <span style={{flex:3,fontSize:'11pt', textAlign:'left'}}>Engaged:</span>
              <span style={{flex:1}}>{this.props.userEngagement[2] * 100 + '%'}</span>
            </div>
            <div style={{flex:1, textAlign:'left', display:'flex'}}>
              <span style={{flex:3,fontSize:'11pt', textAlign:'left'}}>Unengaged:</span>
              <span style={{flex:1}}>{this.props.userEngagement[1] * 100 + '%'}</span>
            </div>
            <div style={{flex:1, textAlign:'left', display:'flex'}}>
              <span style={{flex:3,fontSize:'11pt', textAlign:'left'}}>Really Unengaged:</span>
              <span style={{flex:1}}>{this.props.userEngagement[0] * 100 + '%'}</span>
            </div>
          </div>
          <div className='flexColumnCenter' style={{flex:1}}>
            <h3 style={{color:userEngagementColor}}>{this.props.userEngagement[4] * 100 + '%'}</h3>
            <h5>Overall</h5>
          </div>
        </div>
      );
    }
  }

  renderWordCloud(){
    if (!this.props.wordCloudData || _.isEmpty(this.props.wordCloudData) ) {
      return(
        <h5 style={{textAlign:'center'}}>Loading...</h5>
      );
    } else {
      return(
        <WordCloud className='tag-cloud' data={this.props.wordCloudData}/>
      );
    }
  }


  renderDataBox(){

    return(
      <div className='card card-big dataBox'>
        <div className='card flexColumnCenter' style={{flex:1, backgroundColor:'#f5f5f5 !important'}}>
          {this.props.wsInfo.description}
        </div>
        {this.renderUserEngagementData()}
        <div className='card flexColumnCenter' style={{flex:1, backgroundColor:'#f5f5f5 !important', padding:'3%'}}>
          {this.renderWordCloud()}
        </div>
      </div>
    );
  }

  renderIdeaPanel(){
    return(
      <div className='card card-big' style={{flex:1,borderRadius:0,borderBottom:'none',marginBottom:0,paddingBottom:'2%'}}>
        <h3 className='card-title' style={{textAlign:'left', marginTop:'2%'}}><u>{this.props.wsTitle}</u></h3>
        <div className='card-body' style={{flex:6,marginTop:'2%', alignItems:'stretch', overflowY:'scroll'}}>
          <div style={{flex:1}}>
            {this.renderIdeaGroups()}
          </div>
        </div>
        <div
          className='flexRowCenter card'
          style={{backgroundColor:'#e8edf4',border:'none', marginTop:'2%', alignItems:'flex-end'}}
        >
          <div style={{flex:2.5, textAlign:'right'}}>
            <button className='btn btn-danger' style={{fontSize:'12pt'}} onClick={() => {
              var r = confirm("Are you sure you want to close the workshop?\nYou won't be able to open it again...");
              if (r == true) {
                this.props.logOut(() => {
                  this.props.deactivateWorkshop(this.props.wsId);
                });
                this.props.history.push('/');
              }
            }}>
              Close Workshop
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
    userEngagement: state.app.userEngagement,
    wordCloudData: state.app.wordCloudData
  };
}

const mapDispatchToProps = {
  getWorkshopInfo,
  attemptLogIn,
  logOut,
  setWorkshopTo,
  fetchAllIdeas,
  getUserEngagement,
  getWordCloudData,
  deactivateWorkshop
};

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorMain);
