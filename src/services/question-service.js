import firebase from 'firebase';
import moment from 'moment';

const getQuestionList = async (limit = 10) => {
  const questions = await firebase.database().ref('questions').limitToLast(limit).once('value');
  return questions.val();
}

const createQuestion = async ({ _id, title, description, imageUrl, choices }) => {
  firebase.database().ref(`questions/${_id}`).set({
      title,
      description,
      imageUrl,
      choices,
      created: moment().format(),
  });
}

const voteByQuestionId = async (_id, choiceIndex) => {
  const choicesRef = firebase.database().ref(`questions/${_id}/choices/${choiceIndex}`);
  choicesRef.transaction(function(choice) {
    if (choice) {
      if (choice.vote) {
        choice.vote++;
      } else {
        choice.vote = 1
      }
    }
    return choice;
  });
}

export {
  getQuestionList,
  createQuestion,
  voteByQuestionId,
}