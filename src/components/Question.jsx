import React from 'react';
import moment from 'moment'

const Question = ({ _id, title, created, choices, onVote }) => {
  return (
    <div>
      <div>Topic: {title}</div>
      <div>Created: {moment(created).format('LLL')}</div>
      {
        choices && choices.map((choice, index) => (
          <button key={`${_id}-${index}`} onClick={onVote(_id, index)}>
            {choice.vote && `+${choice.vote}`} {choice.title}
          </button>
        ))
      }
      <hr />
    </div>
  )
}

Question.displayName = 'Question';
export { Question };