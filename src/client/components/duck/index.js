//TYPES
export const EDIT_ANSWER_FORM = 'EDIT_ANSWER_FORM';
export const CLEAR_ANSWER_FORM = 'CLEAR_ANSWER_FORM';
export const ADD_REPLY_ANSWER_FORM = 'ADD_REPLY_ANSWER_FORM';

export const editAnswerForm = (key, value) => ({
  type: EDIT_ANSWER_FORM,
  key,
  value,
});

export const clearAnswerForm = () => ({
  type: CLEAR_ANSWER_FORM,
});

export const addReplyAnswerForm = (replyId) => ({
  type: ADD_REPLY_ANSWER_FORM,
  replyId,
});

//REDUCER
const answerForm = (
  state = { title: '', text: '', sage: false, files: [] },
  action
) => {
  switch (action.type) {
    case EDIT_ANSWER_FORM:
      return { ...state, [action.key]: action.value };

    case CLEAR_ANSWER_FORM:
      return { title: '', text: '', sage: false, files: [] };

    case ADD_REPLY_ANSWER_FORM:
      return { ...state, text: `${state.text}<p>>>${action.replyId}</p>` };

    default:
      return state;
  }
};

export default answerForm;
