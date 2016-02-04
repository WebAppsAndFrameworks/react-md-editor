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
      'text':
        `
        <h1> Welcome to the React Markdown Editor</h1>

        <h2>Heading 2</h2>

        <h3>Heading 3</h3>

        <ul>
          <li>I am</li>
          <li>a list</li>
          <li>with 3 items</li>
        </ul>

        <ol>
          <li>I am</li>
          <li>a numbered list</li>
          <li>with 3 items</li>
        </ol>

        <blockquote>
        Here is a quote.
        - Someone important
        </blockquote>

        <p>Try it out for yourself. Start by editing the text here.</p>
        `
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
