import _ from 'lodash';
import uuid from 'uuid/v1';

import React, { Component } from 'react';
import { createQuestion, getQuestionList, voteByQuestionId } from './services/question-service';
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
    const enterNumber = e.target.value;
    if (enterNumber > 0 && enterNumber <= 5) this.setState({ optionNumber: e.target.value })
  }

  onChoiceChange = (choiceNum) => (e) => {
    const choices = _.assign([], this.state.choices, {
      [choiceNum]: { title: e.target.value }
    });
    this.setState({ choices })
  }

  onVote = (questionId, choiceIndex) => () => {
    voteByQuestionId(questionId, choiceIndex);
    this.fetchQuestions();
  }

  renderQuestionList = () => {
    if (!this.state.questions) return null;

    return Object.keys(this.state.questions).map((qId) => {
      return (
        <Question key={qId} _id={qId} {...this.state.questions[qId]} onVote={this.onVote} />
      )
    })
  }

  renderOption = () => {
    const optionForm = [];
    for (let i = 0; i < this.state.optionNumber; i ++) {
      optionForm.push(
        [
          <label key={`label-${i}`}>Option {i+1}</label>,
          <input key={`input-${i}`} type="text" onChange={this.onChoiceChange(i)} />
        ]
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
        <br />
        <label>Description</label>
        <input type="text" onChange={this.onTextChange('description')} value={this.state.question.description} />
        <br />
        <label>Image URL</label>
        <input type="text" onChange={this.onTextChange('imageUrl')} value={this.state.question.imageUrl} />
        <br />
        <label>Option number (maximum is 5)</label>
        <input type="text" onChange={this.onOptionNumberChange} />
        {this.renderOption()}
        <br />
        <button onClick={this.onSubmit}>Submit</button>
        <button onClick={this.onCancel}>Cancel</button>
        {this.renderQuestionList()}
      </div>
    );
  }
}

export default App;
