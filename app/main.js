import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Editor from 'react-medium-editor';
import toMarkdown from './to-markdown';

let Markdown = React.createClass({
  render(){
    return (
      <div className="left">
        <div className="markdown">
          <pre>
            { toMarkdown(this.props.text) }
          </pre>
        </div>
      </div>
    );
  }
});

let EditableContent = React.createClass({
  render(){
    return (
      <div className="right">
            <Editor text={ this.props.text } onChange={this.props.handleChange } />
      </div>
    );
  }
});

let Main = React.createClass({
  getInitialState() {
    return {
      'text': 'Fusce dapibus, tellus ac cursus commodo'
    };
  },
  handleChange(text, medium) {
    this.setState({
      'text': text
    });
  },
  render() {
    return (
      <div className="container">
        <h1>React Markdown Editor</h1>
        <div className="row">
          <Markdown text={this.state.text} />
          <EditableContent text={this.state.text} onChange ={this.handleChange} />
        </div>
      </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById('app'));
