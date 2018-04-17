import React, { Component } from 'react';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase';
import { firebaseInitializer } from './services/firebase-services';
class App extends Component {
  constructor () {
    super();
    // const ui = new firebaseui.auth.AuthUI(firebase.auth());
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
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
      </div>
    );
  }
}

export default App;
