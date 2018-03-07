import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchIdeas, getWorkshopTitle } from '../actions';

import { UserIdea } from '../components'
import { NewIdea } from './'

class IdeaGeneration extends Component {
	constructor(props) {
		super(props);

		this.update = this.update.bind(this);
	}

	componentWillMount() {
		this.props.fetchIdeas();
		this.props.getWorkshopTitle();

	}

	update() {
		this.props.fetchIdeas();
		this.props.getWorkshopTitle();
	}


	renderIdeas() {
		return Object.keys(this.props.ideas).map((item)=>{
			return (
				<div key={this.props.ideas[item].id}>
					<UserIdea
						title={this.props.ideas[item].title}

						>{this.props.ideas[item].explanation}
					</UserIdea>
				</div>
			)
		});
	}

	render() {

		return (
			<div className='main bg1'>
				<div className="container-fluid">
					<div className="row">
						<h1 className="col-sm" style={{ textAlign: 'center', padding: '20px', color: 'white'}}>{this.props.wsTitle}</h1>
					</div>
					<div className="row">

						<div className="col-sm-6" style={{ display: 'flex', justifyContent: 'flex-end'}}>
							<div style={{width: '40vw'}}>
								<NewIdea callback={this.update} urlId={this.props.match.params.id}/>
							</div>
						</div>

						<div className="col-sm-6">
							<div  style={{width: '40vw'}}>
								{this.renderIdeas()}
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		ideas: state.ideas,
		wsTitle: state.app.wsTitle
	};
}

const mapDispatchToProps = {
  fetchIdeas,
  getWorkshopTitle
}

export default connect(mapStateToProps,mapDispatchToProps)(IdeaGeneration);
