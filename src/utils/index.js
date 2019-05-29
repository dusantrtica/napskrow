import moment from 'moment';
import * as R from 'ramda';

const answerCreatedDateFormat = 'DD/MMM/yy HH:mm';

const momentFromDate = R.curry((format, date) => moment(date, format));

export const sortAnswers = R.compose(
  R.reverse,
  R.sortBy(
    R.compose(
      momentFromDate(answerCreatedDateFormat),
      R.prop('created_at'),
    ),
  ),
);

export const lensById = R.curry((id, entities) => {
  const index = R.findIndex(R.propEq('Id', id), entities);
  if (index >= 0) {
    return R.lensIndex(index, entities);
  }
});

const upvoteLens = R.lens(R.propOr(0, 'upvotes'), R.assoc('upvotes'));
const downVoteLens = R.lens(R.propOr(0, 'downvotes'), R.assoc('downvotes'));

const updateQuestionVote = (questionId, questions, voteLens) => {
  const lens = lensById(questionId, questions);
  return lens
    ? R.over(
        R.compose(
          lens,
          voteLens,
        ),
        R.add(1),
        questions,
      )
    : questions;
};

export const upVoteQuestion = (questionId, questions) =>
  updateQuestionVote(questionId, questions, upvoteLens);

export const downVoteQuestion = (questionId, questions) =>
  updateQuestionVote(questionId, questions, downVoteLens);

export const saveAnswer = (questionId, newAnswer, answers) => {
  const lensByKey = R.lens(R.propOr([], questionId), R.assoc(questionId));

  /** Since we dont store answer on server, inserting it as a very first element should maintain
   * the order - most recent answer on the top., and we return new collection
   */
  return R.over(lensByKey, R.insert(0, newAnswer), answers);
};
