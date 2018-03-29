import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class WorkshopClosed extends Component {
	constructor(props) {
		super(props)
	}

  render(){

		if ( this.props.wsTitle != '') {

			return (
				<div className='main'>
					<div className='wrapper' style={{alignItems:'center', padding:'2%'}}>
		       <h1 style={{color:'white'}}>{this.props.wsTitle}</h1>
            <h5 style={{color:'white', padding:'5px'}}>This workshop has been closed</h5>
            <Link className='btn btn-danger' to='/enter-workshop'>
              Exit
            </Link>
          </div>
				</div>
			);
		} else {
			return(
        <div className='main'>
					<div className='wrapper' style={{alignItems:'center', padding:'2%'}}>
            <h5 style={{color:'white', padding:'5px'}}>This workshop has been closed</h5>
            <Link className='btn btn-danger' to='/enter-workshop'>
              Exit
            </Link>
          </div>
				</div>
			);
		}
  }
}
export default WorkshopClosed;
