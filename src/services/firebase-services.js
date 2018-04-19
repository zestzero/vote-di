import * as firebase from 'firebase';
import uuid from 'uuid/v1';

const firebaseInitializer = () => {
    firebase.initializeApp({
        apiKey: process.env.FIREBASE_APP_API_KEY,
        authDomain: process.env.FIREBASE_APP_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_APP_DATABASE_URL,
        projectId: process.env.FIREBASE_APP_PROJECT_ID,
        storageBucket: process.env.FIREBASE_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_APP_MSG_SENDER_ID,
    });
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