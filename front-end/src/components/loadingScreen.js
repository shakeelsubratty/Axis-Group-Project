import React, { Component } from 'react';

/* Loading screen for users who have joined a workshop which is still not active.
Also used in case of connectivity issues.
*/
class LoadingScreen extends Component {
	constructor(props) {
		super(props)
	}

	// Render method for the component. Renders loading message and ws info if available.
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
