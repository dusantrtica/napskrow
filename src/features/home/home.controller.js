import * as R from "ramda";
import moment from "moment";
import {
  upVoteQuestion,
  downVoteQuestion,
  saveAnswer,
  lensById
} from "../../utils";

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
    const { newAnswerText } = R.find(
      R.propEq("Id", questionId),
      this.questions
    );

    this.answers = saveAnswer(questionId, newAnswerText, this.answers);

    // Reset newAnswerText, reset draft.
    this.questions = R.over(
      lensById(questionId, this.questions),
      R.omit(["newAnswerText"]),
      this.questions
    );
  }
}

HomeController.$inject = ["questionService"];
