"use strict";

angular.module('bmDemoConcorsiApp')
  .controller('UserCtrl', function ($scope, User, UserService, MessageService) {
    $scope.user = User;


    $scope.login = function () {
      UserService.login($scope.user.email, $scope.user.password)
        .then(function (authData) {
          $scope.user = {};
          //redirect su applicazione
          MessageService.info('LOGIN_SUCCESS');
        });
    };

    $scope.register = function () {
      UserService.register($scope.user.email, $scope.user.password)
        .then(function (userData) {
          $scope.login();
          MessageService.info('REGISTER_SUCCESS');
        });
    };

    $scope.forgot = function () {
      delete $scope.message;
      UserService.forgot($scope.user.email)
        .then(function () {
          $scope.user = {};
          MessageService.info('PASSWORD_RESET_SUCCESS');
        });
    };
  });