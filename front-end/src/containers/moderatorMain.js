import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { WorkshopIdea } from '../components';
import { getWorkshopInfo, setWorkshopTo, attemptLogIn, logOut, fetchIdeas } from '../actions';

class ModeratorMain extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
    this.props.fetchIdeas();
  }

  renderIdeas() {
    console.log(this.props.ideas);
		return Object.keys(this.props.ideas).map((item)=>{
			return (
				<div key={this.props.ideas[item].id}>
					<WorkshopIdea
						id = {this.props.ideas[item].id}
						title={this.props.ideas[item].title}
					>
            {this.props.ideas[item].explanation}
					</WorkshopIdea>
				</div>
			)
		});
	}


  renderDataBox(){
    return(
      <div className='card card-big' style={{flex:1,  minHeight:'65%', borderRadius:0, borderBottom:'none', flexDirection:'column', justifyContent:'space-evenly', marginBottom:0, paddingBottom:'2%'}}>
        <div className='card flexColumnCenter' style={{flex:1, display: 'flex !important', backgroundColor:'#f5f5f5 !important'}}> Data one </div>
        <div className='card flexColumnCenter' style={{flex:1, display: 'flex !important', backgroundColor:'#f5f5f5 !important'}}> Data two </div>
        <div className='card flexColumnCenter' style={{flex:1, display: 'flex !important', backgroundColor:'#f5f5f5 !important', marginBottom:0}}> Data three </div>
      </div>
    );
  }

  renderIdeaPanel(){
    return(
      <div className='card card-big' style={{flex:1, minHeight:'60%', borderRadius:0, borderBottom:'none', marginBottom:0, paddingBottom:'2%'}}>
        <div style={{textAlign:'right'}}>
          <Link className='' to='/' onClick={() => {this.props.logOut()}}>
            Exit
          </Link>
        </div>
        <h3 className='card-title' style={{textAlign:'left'}}><u>{this.props.wsTitle}</u></h3>
        <div className='card-body' style={{flex:6,marginTop:'2%', alignItems:'stretch', overflowY:'scroll'}}>
          <div style={{flex:1}}>
            {this.renderIdeas()}
          </div>
        </div>
        <div className='flexRowCenter card' style={{flex:1, display:'flex !important', borderRadius:0, border:'none',backgroundColor:'#e8edf4 !important', marginTop:'2%', alignItems:'flex-end'}}>
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

function mapStateToProps(state){
  return {
    wsId: state.app.wsId,
    wsTitle: state.app.wsInfo.title,
    ideas: state.ideas,
  };
}

const mapDispatchToProps = {
  getWorkshopInfo,
  attemptLogIn,
  logOut,
  setWorkshopTo,
  fetchIdeas
};

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorMain);
