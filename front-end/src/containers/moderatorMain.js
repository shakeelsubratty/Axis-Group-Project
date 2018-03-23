import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { WorkshopIdea, LoadingScreen } from '../components';
import { getWorkshopInfo, setWorkshopTo, attemptLogIn, logOut, fetchAllIdeas } from '../actions';

class ModeratorMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false
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
      console.log('wsId - Session ==>', sessionStorage.getItem('wsId'));
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
        console.log('this.props.isLogged->',this.props.isLogged);
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
      }, 3000);
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props.wsId != nextProps.wsId) {
      console.log('componentWillReceiveProps -->',nextProps.wsId);
      this.props.getWorkshopInfo(nextProps.wsId);
      this.props.fetchAllIdeas(this.props.wsId);
    }
  }

  componentWillUnmount(){
    clearInterval(window.intervalWsId);
  }

  renderIdeas() {
    console.log('this.props.wsIdeas ->',this.props.wsIdeas);
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


  renderDataBox(){
    return(
      <div className='card card-big dataBox'>
        <div className='card flexColumnCenter' style={{backgroundColor:'#f5f5f5 !important'}}>
          Data one
        </div>
        <div className='card flexColumnCenter' style={{backgroundColor:'#f5f5f5 !important'}}>
          Data two
        </div>
        <div className='card flexColumnCenter' style={{backgroundColor:'#f5f5f5 !important', marginBottom:0}}>
          Data three
        </div>
      </div>
    );
  }

  renderIdeaPanel(){
    return(
      <div className='card card-big' style={{flex:1,borderRadius:0,borderBottom:'none',marginBottom:0,paddingBottom:'2%'}}>
        <div style={{textAlign:'right'}}>
          <Link className='' to='/' onClick={() => {
            this.props.logOut(() => {
              console.log('CLEARING');
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
  };
}

const mapDispatchToProps = {
  getWorkshopInfo,
  attemptLogIn,
  logOut,
  setWorkshopTo,
  fetchAllIdeas
};

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorMain);
