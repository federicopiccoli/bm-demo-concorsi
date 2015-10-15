angular.module('bmDemoConcorsiApp')
  .controller('ChangePwdCtrl', function ($scope, $filter, UserService, MessageService) {
    $scope.changePwd = function () {
      UserService.changePassword($scope.oldPassword, $scope.newPassword)
        .then(function () {
          MessageService.info($filter('translate')('PASSWORD_CHANGE_SUCCESS'));
          delete $scope.oldPassword;
          delete $scope.newPassword;
          delete $scope.confirmPassword;
        });
    };
  });