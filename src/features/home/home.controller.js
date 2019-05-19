import * as R from "ramda";

const lensById = R.curry((id, entities) =>
  R.lensIndex(R.findIndex(R.propEq("Id", id), entities))
);

const upvoteLens = R.lens(R.prop("upvotes"), R.assoc("upvotes"));
const downVoteLens = R.lens(R.prop("downvotes"), R.assoc("downvotes"));

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
}

HomeController.$inject = ["questionService"];
