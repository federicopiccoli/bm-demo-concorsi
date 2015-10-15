"use strict";

angular.module('bmDemoConcorsiApp')
  .controller('WelcomeCtrl', function ($scope, $state, UserService) {
    $scope.user = UserService.isLogged();
    
  });