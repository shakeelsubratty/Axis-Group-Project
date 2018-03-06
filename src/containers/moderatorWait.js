import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ModeratorWait extends Component {
  constructor(props){
    super(props);
    this.state = {
      front: true
    }
  }

  renderContent(){
    console.log('front==>', this.state.front);
    if (this.state.front) {
      return (
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center' }}>
          Workshop ID
          <button className='btn btn-primary' onClick={() => {
            window.animateBounceDownTwice('moderatorWaitPanel');
            setTimeout(this.flip.bind(this), 500);
          }}>
            Click me
          </button>
        </div>
      );
    } else {
      return (
        <div style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
          Participan List
        </div>
      );
    }

  }

  flip(){
    this.setState({front: !this.state.front});
  }

  renderLinks(){
    if (this.state.front) {
      return (
        <div className='button-box'>
          <Link className='btn btn-success' to='/'> Start</Link>
          <Link className='btn btn-danger' to='/create-workshop'> Exit</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link className='btn btn-success' to='/'> Start</Link>
          <button className='btn btn-danger' onClick={() => {
            window.animateBounceDownTwice('moderatorWaitPanel');
            setTimeout(this.flip.bind(this), 500);
          }}>
            Back
          </button>
        </div>
      );
    }
  }

  render(){
    return(
      // <div className='main moderatorWait' style={{flexDirection:'row', alignItems:'stretch'}}>
      //   <div className='wrapper' style={{alignItems:'stretch', padding:'5%', paddingBottom:'3%'}}>
      //     <div className='card' style={{textAlign:'center', height:'80%', backgroundColor:'#e8edf4 !important'}}>
      //       Left
      //     </div>
      //   </div>
      //   <div className='wrapper' style={{flex:3, padding: '5% 5% 3% 0'}}>
      //     <div className='card card-big' style={{alignItems:'center', minHeight:'60%'}}>
      //       Right
      //     </div>
      //   </div>
      // </div>
      <div className='main moderatorWait'>
        <div className='wrapper'>
          <div className='card' style={{width:'80%', backgroundColor:'#e8edf4', height:'8%', textAlign:'center'}}>
            <h1>Title of Workshop</h1>
          </div>
          <div id='moderatorWaitPanel' className='card card-big' style={{alignItems:'center', minHeight:'70%', marginBottom:'5%'}}>
            <div className='card-body' style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center' }}>
              {this.renderContent()}
            </div>
            {this.renderLinks()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps,mapDispatchToProps)(ModeratorWait);
