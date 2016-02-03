import React from 'react';
import ReactDOM from 'react-dom';
import Editor from 'react-medium-editor';
import toMarkdown from './to-markdown';

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
        <div className="row">
          <div className="col-xs-12">
            <h1>React Markdown Editor</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            { toMarkdown(this.state.text) }
          </div>
          <div className="col-xs-6">
            <Editor text={ this.state.text } onChange={ this.handleChange } />
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById('app'));
