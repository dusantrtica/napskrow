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

  saveAnswer(questionId, newAnswer) {
    this.answers = saveAnswer(questionId, newAnswer, this.answers);
  }
}

HomeController.$inject = ['questionService', '$scope', '$sce'];
