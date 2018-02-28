import React, { Component } from 'react';

export default class EnterWorkshop extends Component {
  render() {
    return (
      <div className='main' style={{ backgroundColor: 'red' }}>

			<div className='wrapper'>
				<div className='card' style={{ width: '80%'}}>
					<h1 className='card-header' style={{ textAlign: 'center', padding: '5%'}}>Join the workshop</h1>
					<div className="card-body">
						<div className='form-group'>
							<form >
								<label >Workshop ID:</label>
								<input
									className='form-control'
									type='text'
									name='workshopIdInput'
									placeholder='Place your workshop id here.'

								/>
								<div className="button-box" >
									<button type="button" className="btn btn-primary">Submit</button>
									<button type="button" className="btn btn-primary">Cancel</button>
								</div>
							</form>
						</div>
					</div>

				</div>
			</div>
      </div>
    );
  }
}
