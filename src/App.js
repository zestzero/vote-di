import _ from 'lodash';
import uuid from 'uuid/v1';

import React, { Component } from 'react';
import { createQuestion, getQuestionList } from './services/question-service';
import { Question } from './components/Question';

const DEFAULT_STATE = {
  title: '',
  description: '',
  imageUrl: '',
}

class App extends Component {
  componentWillMount () {
    this.fetchQuestions();
  }

  state = {
    questions: [],
    optionNumber: 0,
    question: DEFAULT_STATE,
    choices: [],
  }

  fetchQuestions = async () => {
    const questions = await getQuestionList();
    this.setState({ questions });
  }

  onSubmit = () => {
    const _id = uuid();
    const choices = this.state.choices;
    createQuestion({ _id, ...this.state.question, choices });
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

  onChoiceChange = (choiceNum) => (e) => {
    const choices = _.assign([], this.state.choices, {
      [choiceNum]: { title: e.target.value }
    });
    this.setState({ choices })
  }

  renderQuestionList = () => {
    if (!this.state.questions) return null;
    const orderedList = _.orderBy(this.state.questions, question => question.created, ['desc']);

    return _.map(orderedList, question => (
      <Question {...question} />
    ))
  }

  renderOption = () => {
    const optionForm = [];
    for (let i = 0; i < this.state.optionNumber; i ++) {
      optionForm.push(
        [ <label>Option {i+1}</label>, <input type="text" onChange={this.onChoiceChange(i)} /> ]
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
        {this.renderQuestionList()}
      </div>
    );
  }
}

export default App;
