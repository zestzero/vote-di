import * as firebase from 'firebase';

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

export {
    firebaseInitializer,
};