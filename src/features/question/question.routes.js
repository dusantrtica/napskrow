routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider.state('question', {
    url: '/question/:questionId',
    template: require('./question.html'),
    controller: 'QuestionController',
    controllerAs: 'question',
  });
}
