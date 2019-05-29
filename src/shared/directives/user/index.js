const getUser = createdBy => {
  if (typeof createdBy === 'string') {
    return {
      Name: createdBy,
    };
  }

  const { Avatar = '', Id = 0, Name = 'Anonymous', Surname = 'Anonymous' } =
    createdBy || {};
  return {
    Avatar,
    Id,
    Name,
    Surname,
  };
};
export default function user() {
  return {
    restrict: 'E',
    template: require('./user.html'),
    scope: {
      createdBy: '=',
    },

    controller: [
      '$scope',
      $scope => {
        $scope.user = getUser($scope.createdBy);
      },
    ],
  };
}
