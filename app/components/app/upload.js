"use strict";

angular.module('bmDemoConcorsiApp')
  .controller('UploadCtrl', function ($scope, $filter, $firebaseArray, FIREBASE_APP, UserService, MessageService) {
    $scope.uploadText = '';
    var list = $firebaseArray(FIREBASE_APP);
    
    $scope.upload = function () {
      list.$add({
        text: $scope.uploadText,
        type: 'upload-subimt',
        uid: UserService.isLogged().uid
      }).then(function () {
          $scope.uploadText = '';
          MessageService.info($filter('translate')('UPLOAD_SUCCESS'));
        }, function (error) {
          MessageService.error(error.description);
        });

    };
  });