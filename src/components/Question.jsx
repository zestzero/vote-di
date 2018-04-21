import React from 'react';
import moment from 'moment'

const Question = ({ _id, title, created, choices }) => {
  return (
    <div>
      <span>{title}</span>
      <span>Created: {moment(created).format('LLL')}</span>
      { choices && choices.map((choice, index) => (<button key={`${_id}-${index}`}>{choice.title}</button>)) }
    </div>
  )
}

Question.displayName = 'Question';
export { Question };