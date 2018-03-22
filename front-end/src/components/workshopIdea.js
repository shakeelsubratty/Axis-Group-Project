import React, { Component } from 'react';
//import PropTypes from 'prop-types';

class WorkshopIdea extends Component {

    constructor(props){
        super(props)
        this.state = {
            isExpanded: false
        }
    }

    toggle(event){
        event.preventDefault();
        this.setState({
            isExpanded: !this.state.isExpanded,
            height: this.refs.inner.clientHeight
        })
    }

    render(){
        const {title, children, id} = this.props;
        const {isExpanded, height} = this.state;
        const currentHeight = isExpanded ? height : 0;
        return (
            <div className={`card panel ${isExpanded ? 'is-expanded' : ''}`} >
                <div className="card-header panel-heading" style={{display: 'flex'}} onClick={(event) => this.toggle(event)} >
						      <h4>{title}</h4>
                </div>
                <div className="panel-collapse" style={{height: currentHeight+'px'}}>
                    <div className="card-body panel-body" ref="inner" style={{padding: '3%'}}>
                        {children}
                    </div>

                </div>
            </div>
        )
    }

}

// WorkshopIdea.propTypes = {
//     title: PropTypes.string,
// };

export default WorkshopIdea;
