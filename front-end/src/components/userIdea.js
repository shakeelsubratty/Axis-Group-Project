import React from 'react';
import PropTypes from 'prop-types';

class UserIdea extends React.Component {

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
        const {title, children} = this.props;
        const {isExpanded, height} = this.state;
        const currentHeight = isExpanded ? height : 0;
        return (
            <div className={`card panel ${isExpanded ? 'is-expanded' : ''}`} onClick={(event) => this.toggle(event)}>
                <div className="card-header panel-heading">
                    <h2>{title}</h2>
                </div>
                <div className="panel-collapse" style={{height: currentHeight+'px'}}>
                    <div className="panel-body" ref="inner">
                        {children}
                    </div>
                </div>
            </div>
        )
    }

}

UserIdea.propTypes = {
    title: PropTypes.string,
};

export default UserIdea;
