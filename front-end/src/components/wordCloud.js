import React, { Component } from 'react';
import { TagCloud } from 'react-tagcloud';

const data = [
  { value: "JavaScript", count: 38, color:'#000'}, //by adding color you can make it a specific color
  { value: "React", count: 30 },
  { value: "Nodejs", count: 28 },
  { value: "Express.js", count: 25 },
  { value: "HTML5", count: 33 },
  { value: "MongoDB", count: 18 },
  { value: "CSS3", count: 20 }
];

class WordCloud extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <TagCloud minSize={12}
                maxSize={35}
                tags={this.props.data}
                onClick={tag => alert(`'${tag.value}' was selected!`)} />
    );
  }
}

export default WordCloud;
