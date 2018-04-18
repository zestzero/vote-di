import React, { Component } from 'react';
import { createQuestion, getQuestion } from './services/firebase-services';
import _ from 'lodash';

const DEFAULT_STATE = {
  title: '',
  description: '',
  imageUrl: '',
  options: [],
}

class App extends Component {
  componentWillMount () {
    this.fetchQuestions();
  }

  state = {
    questions: [],
    optionNumber: 0,
    question: DEFAULT_STATE
  }

  fetchQuestions = () => {
    getQuestion().then((questions) => {
      this.setState({ questions });
    });
  }

  onSubmit = () => {
    createQuestion(this.state.question);
    this.setState({ question: DEFAULT_STATE }, () => this.fetchQuestions());
  }

  onCancel = () => {
    this.setState({ question: DEFAULT_STATE });
  }

  onTextChange = (fieldName) => (e) => {
    this.setState({ question: _.assign(this.state.question, { [fieldName]: e.target.value }) });
  }

  onOptionNumberChange = (e) => {
    this.setState({ optionNumber: e.target.value })
  }

  onOptionChange = (optionNum) => (e) => {
    const options = { [optionNum]: e.target.value }
    this.setState({ question: _.merge(this.state.question, { options })})
  }

  renderObjectList = () => {
    if (!this.state.questions) return null;
    const sortedList = _.sortBy(this.state.questions, [ (o) => o._id ]);

    return (
      <ol>
        {_.map(sortedList, object => <li>{JSON.stringify(object)}</li>)}
      </ol>
    )
  }

  renderOption = () => {
    const optionForm = [];
    for (let i = 0; i < this.state.optionNumber; i ++) {
      optionForm.push(
        [ <label>Option {i+1}</label>, <input type="text" onChange={this.onOptionChange(i)} /> ]
      )
    }
    return optionForm;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Vote-Di</h1>
        </header>
        <p className="App-intro">
          An application that allow you to create your own poll for helping you to decide things from your friends.
        </p>
        <label>Title</label>
        <input type="text" onChange={this.onTextChange('title')} value={this.state.question.title} />
        <label>Description</label>
        <input type="text" onChange={this.onTextChange('description')} value={this.state.question.description} />
        <label>Image URL</label>
        <input type="text" onChange={this.onTextChange('imageUrl')} value={this.state.question.imageUrl} />
        <label>Option number</label>
        <input type="text" onChange={this.onOptionNumberChange} />
        {this.renderOption()}
        <button onClick={this.onSubmit}>Submit</button>
        <button onClick={this.onCancel}>Cancel</button>
        {this.renderObjectList()}
      </div>
    );
  }
}

export default App;
