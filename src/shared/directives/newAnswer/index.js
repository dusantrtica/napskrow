import moment from 'moment';

export default function newAnswer() {
  return {
    restrict: 'E',
    template: require('./newAnswer.html'),
    controller: [
      '$scope',
      function($scope) {
        $scope.newAnswerText = '';
        $scope.handleSave = function() {
          const newAnswer = {
            Answer: $scope.newAnswerText,
            created_at: moment().format('dd/MMM/YY HH:mm'),
            'Question-Id': $scope.questionId,
            upvotes: 0,
            downvotes: 0,
          };

          $scope.onSaveNewAnswer({ newAnswer });

          // This should happen on promise resolve.
          $scope.newAnswerText = '';
        };
      },
    ],

    scope: {
      onSaveNewAnswer: '&',
      questionId: '=',
    },
  };
}
