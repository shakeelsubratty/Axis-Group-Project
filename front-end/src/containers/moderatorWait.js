import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWorkshopInfo, setWorkshopTo, attemptLogIn, logOut } from '../actions';

class ModeratorWait extends Component {
  constructor(props){
    super(props);
    this.state = {
      showingId: true
    }
  }

  componentWillMount(){
    if (sessionStorage.getItem('wsId') == 'null') {
      if (!this.props.wsId) {
        // If you try to get here from login without creating a workshop
        this.props.history.push('/create-workshop')
      }
    } else {
      console.log('wsId - Session ==>', sessionStorage.getItem('wsId'));
      this.props.setWorkshopTo(sessionStorage.getItem('wsId'))
    } // If you refresh

    if ((sessionStorage.getItem('usrn') == 'null' || sessionStorage.getItem('pass') == 'null')) {
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

    this.props.getWorkshopInfo(this.props.wsId);
  }

  renderContent(){
    console.log('showingId==>', this.state.showingId);
    if (this.state.showingId) {
      return (
        <div className='card-body' style={{flex:1,display:'flex', flexDirection:'row', width:'100%', paddingLeft:'3%'}}>
          <div style={{flex:1, display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-around'}}>
            <div className='.row' style={{flex:1,textAlign:'center', marginTop:'5%'}}>
              <h4><u>Workshop Id</u></h4>
                <h2>{this.props.wsId}</h2>
            </div>
            <div className='.row' style={{flex:2,textAlign:'center', marginTop:'3%'}}>
              <h4><u>Description</u></h4>
                <div style={{textAlign:'-webkit-auto', padding:'1% 3%'}}>{this.props.wsDescription}</div>
            </div>
          </div>
          <button className='btn btn-secondary' style={{backgroundColor:'#e8edf4', borderColor:'#bfbebe'}} onClick={() => {
            window.animateLeftToRight('moderatorWaitPanel');
            {this.setState({showingId: !this.state.showingId})}
          }}>
            >
          </button>
        </div>
      );
    } else {
      return (
        <div className='card-body' style={{flex:1,display:'flex', flexDirection:'row', width:'100%', paddingRight:'3%'}}>
          <button className='btn btn-secondary' style={{backgroundColor:'#e8edf4', borderColor:'#bfbebe'}} onClick={() => {
            window.animateRightToLeft('moderatorWaitPanel');
            {this.setState({showingId: !this.state.showingId})}
          }}>
            &lt;
          </button>
          <div style={{flex:1}}>
            Participant List
          </div>
        </div>
      );
    }
  }

  renderLinks(){
    return (
      <div className='button-box' style={{padding: '1% 3% 0 0', width:'100%'}}>
        <Link className='btn btn-success' to='/'> Start</Link>
        <Link className='btn btn-danger' to='/' onClick={() => {this.props.logOut()}}>
          Exit
        </Link>
      </div>
    );
  }

  render(){
    return(
      <div className='main'>
        <div className='wrapper'>
          <div className='card' style={{width:'80%', backgroundColor:'#e8edf4', minHeight:'8%', textAlign:'center'}}>
            <h1>{this.props.wsTitle}</h1>
          </div>
          <div id='moderatorWaitPanel' className='card card-big' style={{alignItems:'center', minHeight:'70%', paddingRight:0, paddingLeft:0}}>
            {this.renderContent()}
            {this.renderLinks()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    wsId: state.app.wsId,
    wsTitle: state.app.wsInfo.title,
    wsDescription: state.app.wsInfo.description
  };
}

const mapDispatchToProps = {
  getWorkshopInfo,
  attemptLogIn,
  logOut,
  setWorkshopTo
}

export default connect(mapStateToProps,mapDispatchToProps)(ModeratorWait);
