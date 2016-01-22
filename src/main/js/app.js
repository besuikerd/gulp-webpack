require('./globals');
require('../styles/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends React.Component{
  render(){
    return <div> {this.props.text}</div>
  }
}

ReactDOM.render(<HelloWorld text="Hello World"/>, document.getElementById('content'));