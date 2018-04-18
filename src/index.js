import React from 'react';
import ReactDOM from 'react-dom';

import { firebaseInitializer } from './services/firebase-services';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

firebaseInitializer();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
