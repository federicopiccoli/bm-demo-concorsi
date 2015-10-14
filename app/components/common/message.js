"use strict";

angular.module('bmDemoConcorsiApp')
  .service('MessageService', function () {
    var levels = ['info', 'warning', 'error']
    var service = {
      info: function (message) {
        _setMessage(message, {
          status: levels[0]
        })
      },
      warning: function (message) {
        _setMessage(message, {
          status: levels[1]
        })
      },
      error: function (message) {
        _setMessage(message, {
          status: levels[2]
        })
      },
      clear: function () {
        delete service.message;
        delete service.status;
      },
      getLevels: function () {
        return angular.copy(levels);
      }
    };

    var _setMessage = function (message, config) {
      service.message = message;
      service.status = config.status;
    };

    return service;
  })
  .directive('message', function ($timeout, MessageService) {
    return {
      restrict: 'E',
      scope: {
        'closeText' : '=',
        'hideInfoOnTimeout': '='
      },
      templateUrl: '/components/common/message.html',
      link: function (scope, elem) {
        scope.messageService = MessageService;
        scope.closeText = scope.closeText || 'Close';
        scope.close = function () {
          MessageService.clear();
        };
        
        var infoLevel = MessageService.getLevels()[0];
        
        //primo parametro è una expression
        //il watch serve a monitorare lo stato di una variabile e lanciare una funzione se cambia
        //esiste anche il deep watch che monitora anche le proprietà di un oggetto complesso
        scope.$watch('messageService.status', function(newVal, oldVal) {
          if (angular.isDefined(newVal) && newVal === infoLevel && scope.hideInfoOnTimeout > 0) {
            $timeout(scope.close, scope.hideInfoOnTimeout);
          }
        });
      }
    };
  });