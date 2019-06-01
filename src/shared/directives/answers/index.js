export default function answers() {
  return {
    restrict: 'E',
    template: require('./answers.html'),
    controller: [
      '$scope',
      '$sce',
      ($scope, $sce) => {
        console.log({ $scope });
        $scope.$sce = $sce;
        $scope.toggleShow = () => {
          $scope.showAll = !$scope.showAll;
        };
      },
    ],

    scope: {
      questionAnswers: '=',
    },
  };
}
