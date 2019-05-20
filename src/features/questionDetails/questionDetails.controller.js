import * as R from 'ramda';
import moment from 'moment';

export default class QuestionDetailsController {
  constructor(questionService, $stateParams, $scope, $sce) {
    this.questionService = questionService;
    this.$scope = $scope;
    this.$sce = $sce;
    const { questionId } = $stateParams;
    this.questionId = questionId;
  }

  $onInit() {
    Promise.all([
      this.questionService.getQuestionById(this.questionId),
      this.questionService.getQuestionAnswers(this.questionId),
    ]).then(([question, answers]) => {
      this.$scope.$apply(() => {
        this.question = question;
        this.answers = answers;
      });
    });
  }

  upVoteQuestion() {
    const upVoteLens = R.lens(R.propOr(0, 'upvotes'), R.assoc('upvotes'));
    this.question = R.over(upVoteLens, R.add(1), this.question);
  }

  downVoteQuestion() {
    const downVoteLens = R.lens(R.propOr(0, 'downvotes'), R.assoc('downvotes'));
    this.question = R.over(downVoteLens, R.add(1), this.question);
  }

  saveAnswer() {
    const { newAnswerText, Id: questionId } = this.question;

    const newAnswer = {
      Answer: newAnswerText,
      created_at: moment().format('dd/MMM/YY HH:mm'),
      'Question-Id': questionId,
      upvotes: 0,
      downvotes: 0,
    };

    this.answers = R.insert(0, newAnswer, this.answers);

    this.question = R.omit(['newAnswerText'], this.question);
  }
}

QuestionDetailsController.$inject = [
  'questionService',
  '$stateParams',
  '$scope',
  '$sce',
];
