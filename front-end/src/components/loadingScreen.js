import React, { Component } from 'react';

class LoadingScreen extends Component {
	constructor(props) {
		super(props)
	}

  render(){

		if ( this.props.wsTitle != '' && this.props.wsDes != '') {

			return (
				<div className='main'>
					<div className='wrapper' style={{alignItems:'center', padding:'2%'}}>
					<h1 style={{color:'white'}}>{this.props.wsTitle}</h1>
					<h5 style={{color:'white', padding:'5px'}}>{this.props.wsDes}</h5>
					<div className='loader'/>
				</div>
				</div>
			);
		} else {
			return(
				<div className='main'>
					<div className='wrapper' style={{alignItems:'center', padding:'2%'}}>
					<h1 style={{color:'white'}}>Loading...</h1>
					<div className='loader'/>
				</div>
				</div>
			);
		}
  }


}
export default LoadingScreen;
