import firebase from 'firebase';
import moment from 'moment';

const getQuestionList = async (limit = 10) => {
  const questions = await firebase.database().ref('questions').limitToLast(limit).once('value');
  return questions.val();
}

const createQuestion = async ({ _id, title, description, imageUrl, choices }) => {
  firebase.database().ref('questions').push({
      _id,
      title,
      description,
      imageUrl,
      choices,
      created: moment().format(),
  });
}

export {
  getQuestionList,
  createQuestion,
}