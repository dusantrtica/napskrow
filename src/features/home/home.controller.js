import * as R from 'ramda';
import {
  upVoteQuestion,
  downVoteQuestion,
  saveAnswer,
  lensById,
} from '../../utils';

export default class HomeController {
  constructor(questionService, $scope, $sce) {
    this.questionService = questionService;
    this.$scope = $scope;
    this.$sce = $sce;
  }

  $onInit() {
    Promise.all([
      this.questionService.getQuestions(),
      this.questionService.getAnswers(),
    ]).then(([questions, answers]) => {
      this.$scope.$apply(() => {
        this.questions = questions;
        this.answers = answers;
      });
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
      R.propEq('Id', questionId),
      this.questions,
    );

    this.answers = saveAnswer(questionId, newAnswerText, this.answers);

    // Reset newAnswerText, reset draft.
    this.questions = R.over(
      lensById(questionId, this.questions),
      R.omit(['newAnswerText']),
      this.questions,
    );
  }
}

HomeController.$inject = ['questionService', '$scope', '$sce'];
