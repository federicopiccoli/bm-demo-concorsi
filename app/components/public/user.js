"use strict";

angular.module('bmDemoConcorsiApp')
  .controller('UserCtrl', function ($scope, User, UserService, MessageService) {
    $scope.user = User;


    $scope.login = function () {
      delete $scope.error;
      UserService.login($scope.user.email, $scope.user.password)
        .then(function (authData) {
          $scope.user = {};
          //redirect su applicazione
          MessageService.info('LOGIN_SUCCESS');
        }).catch(function (error) {
          $scope.error = error;
          MessageService.error('error');
        });
    };

    $scope.register = function () {
      delete $scope.error;

      UserService.register($scope.user.email, $scope.user.password)
        .then(function (userData) {
          $scope.login();
          MessageService.info('REGISTER_SUCCESS');
        }).catch(function (error) {
          $scope.error = error;
          MessageService.error('error');
        });
    };

    $scope.forgot = function () {
      delete $scope.message;
      delete $scope.error;
      UserService.forgot($scope.user.email)
        .then(function () {
          $scope.user = {};
          MessageService.info('PASSWORD_RESET_SUCCESS');
        }).catch(function (error) {
          $scope.error = error;
          MessageService.error('error');
        });
    };
  });