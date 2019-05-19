import * as R from "ramda";
import moment from "moment";

const lensById = R.curry((id, entities) =>
  R.lensIndex(R.findIndex(R.propEq("Id", id), entities))
);

const upvoteLens = R.lens(R.propOr(0, "upvotes"), R.assoc("upvotes"));
const downVoteLens = R.lens(R.propOr(0, "downvotes"), R.assoc("downvotes"));

const upVoteQuestion = (questionId, questions) => {
  const lens = lensById(questionId, questions);
  return R.over(
    R.compose(
      lens,
      upvoteLens
    ),
    R.add(1),
    questions
  );
};

const downVoteQuestion = (questionId, questions) => {
  const lens = lensById(questionId, questions);
  return R.over(
    R.compose(
      lens,
      downVoteLens
    ),
    R.add(-1),
    questions
  );
};

export default class HomeController {
  constructor(questionService) {
    this.name = "World";
    this.questionService = questionService;
  }

  changeName() {
    this.name = "angular-tips";
    this.questionService.getAnswers().then(answers => {
      this.answers = answers;
    });
    this.questionService.getQuestions().then(questions => {
      this.questions = questions;
    });
  }

  upVoteQuestion(questionId) {
    this.questions = upVoteQuestion(questionId, this.questions);
  }

  downVoteQuestion(questionId) {
    this.questions = downVoteQuestion(questionId, this.questions);
  }

  saveAnswer(questionId) {
    const lensByKey = R.lens(R.propOr([], questionId), R.assoc(questionId));
    const { newAnswerText } = R.find(
      R.propEq("Id", questionId),
      this.questions
    );

    const newAnswer = {
      Text: newAnswerText,
      created_at: moment().format("dd/MMM/yy HH:mm"),
      "Question-Id": questionId,
      upvotes: 0,
      downvotes: 0
    };

    /** Since we dont store answer on server, inserting it as a very first element should maintain
     * the order - most recent answer on the top.
     */
    this.answers = R.over(lensByKey, R.insert(0, newAnswer), this.answers);

    // Reset newAnswerText, reset draft.
    this.questions = R.over(
      lensById(questionId, this.questions),
      R.omit(["newAnswerText"]),
      this.questions
    );

    this.newAnswer = "";
  }
}

HomeController.$inject = ["questionService"];
