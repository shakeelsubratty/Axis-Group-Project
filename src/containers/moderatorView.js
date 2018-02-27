import React, { Component } from 'react';
import { connect } from 'react-redux';

class ModeratorView extends Component {
  render() {
    return (
      <div>
        <h1>
          Moderator View
        </h1>
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


export default connect (mapStateToProps, mapDispatchToProps)(ModeratorView);
