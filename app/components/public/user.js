"use strict";

angular.module('bmDemoConcorsiApp')
  .controller('UserCtrl', function ($scope, User, UserService) {
    $scope.user = User;


    $scope.login = function () {
      delete $scope.error;
      UserService.login($scope.user.email, $scope.user.password)
        .then(function (authData) {
          $scope.user = {};
          //redirect su applicazione
        }).catch(function (error) {
          $scope.error = error;
        });
    };

    $scope.register = function () {
      delete $scope.error;

      UserService.register($scope.user.email, $scope.user.password)
        .then(function (userData) {
          $scope.login();
        }).catch(function (error) {
          $scope.error = error;
        });
    };

    $scope.forgot = function () {
      delete $scope.message;
      delete $scope.error;
      UserService.forgot($scope.user.email)
        .then(function () {
          $scope.user = {};
          $scope.message = 'PASSWORD_RESET_SUCCESS';
        }).catch(function (error) {
          $scope.error = error;
        });
    };
  });