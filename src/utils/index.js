import moment from 'moment';
import * as R from 'ramda';

const answerCreatedDateFormat = 'dd/MMM/yy HH:mm';

const momentFromDate = R.curry((format, date) => moment(date, format));

export const sortAnswers = R.sortBy(
  R.compose(
    momentFromDate(answerCreatedDateFormat),
    R.prop('created_at'),
  ),
);

export const lensById = R.curry((id, entities) =>
  R.lensIndex(R.findIndex(R.propEq('Id', id), entities)),
);

const upvoteLens = R.lens(R.propOr(0, 'upvotes'), R.assoc('upvotes'));
const downVoteLens = R.lens(R.propOr(0, 'downvotes'), R.assoc('downvotes'));

export const upVoteQuestion = (questionId, questions) => {
  const lens = lensById(questionId, questions);
  return R.over(
    R.compose(
      lens,
      upvoteLens,
    ),
    R.add(1),
    questions,
  );
};

export const downVoteQuestion = (questionId, questions) => {
  const lens = lensById(questionId, questions);
  return R.over(
    R.compose(
      lens,
      downVoteLens,
    ),
    R.add(-1),
    questions,
  );
};

export const saveAnswer = (questionId, answerText, answers) => {
  const lensByKey = R.lens(R.propOr([], questionId), R.assoc(questionId));

  const newAnswer = {
    Text: answerText,
    created_at: moment().format('dd/MMM/YY HH:mm'),
    'Question-Id': questionId,
    upvotes: 0,
    downvotes: 0,
  };

  /** Since we dont store answer on server, inserting it as a very first element should maintain
   * the order - most recent answer on the top., and we return new collection
   */
  return R.over(lensByKey, R.insert(0, newAnswer), answers);
};
