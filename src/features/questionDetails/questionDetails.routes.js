routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider.state('questionDetails', {
    url: '/question/:questionId',
    template: require('./questionDetails.html'),
    controller: 'QuestionDetailsController',
    controllerAs: 'questionDetails',
  });
}
