import * as R from 'ramda';
import moment from 'moment';

export default class QuestionController {
  constructor(questionService, $stateParams, $scope) {
    this.questionService = questionService;
    this.$scope = $scope;
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
      Text: newAnswerText,
      created_at: moment().format('dd/MMM/YY HH:mm'),
      'Question-Id': questionId,
      upvotes: 0,
      downvotes: 0,
    };

    this.answers = R.insert(0, newAnswer, this.answers);

    this.question = R.omit(['newAnswerText'], this.question);
  }
}

QuestionController.$inject = ['questionService', '$stateParams', '$scope'];
