export default class QuestionController {
  constructor(questionService, $stateParams) {
    const { questionId } = $stateParams;

    questionService
      .getQuestionById(questionId)
      .then(question => (this.question = question));
    questionService
      .getQuestionAnswers(questionId)
      .then(answer => (this.answers = answer));
  }
}

QuestionController.$inject = ["questionService", "$stateParams"];
