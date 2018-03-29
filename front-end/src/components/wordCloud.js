import React, { Component } from 'react';
import { TagCloud } from 'react-tagcloud';

// Component that displays WordCloud
class WordCloud extends Component {
  constructor(props){
    super(props);
  }

  // Render method for the component. Renders ideas and form to submit them.
  render(){
    return(
      <TagCloud
        minSize={16}
        maxSize={36}
        tags={this.props.data}
        shuffle={false}
        onClick={tag => alert(`'${tag.value}' was selected!`)}
      />
    );
  }
}

export default WordCloud;
