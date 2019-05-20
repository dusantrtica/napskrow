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
}

QuestionController.$inject = ['questionService', '$stateParams', '$scope'];
