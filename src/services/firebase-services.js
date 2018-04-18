import * as firebase from 'firebase';
import uuid from 'uuid/v1';

const firebaseInitializer = () => {
    var config = {
        apiKey: "<API_KEY>",
        authDomain: "<PROJECT_ID>.firebaseapp.com",
        databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
        projectId: "<PROJECT_ID>",
        storageBucket: "<BUCKET>.appspot.com",
        messagingSenderId: "<SENDER_ID>",
      };
    firebase.initializeApp(config);
    return firebase;
}

const createQuestion = ({ title, description, imageUrl, options }) => {
    firebase.database().ref('questions').push({
        _id: uuid(),
        title,
        description,
        imageUrl,
        options,
    });
}

const createOption = ({ _id, title, description, imageUrl }) => {
    firebase.database().ref('options/' + _id).set({
        title,
        description,
        imageUrl,
        vote: 0
    })
}

const getQuestion = () => {
    return firebase.database().ref('questions').once('value').then((snapshot) => {
        if (!snapshot.val()) return null;
        return snapshot.val();
    })
}

export {
    firebaseInitializer,
    createQuestion,
    createOption,
    getQuestion
};