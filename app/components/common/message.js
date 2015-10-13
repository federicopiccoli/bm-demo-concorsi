"use strict";

angular.module('bmDemoConcorsiApp')
  .service('MessageService', function () {
    var service = {
      info: function (message) {
        _setMessage(message, {
          status: 'info'
        })
      },
      warning: function (message) {
        _setMessage(message, {
          status: 'warning'
        })
      },
      error: function (message) {
        _setMessage(message, {
          status: 'error'
        })
      }
    };

    var _setMessage = function (message, config) {
      service.message = message;
      service.status = config.status;
    };

    return service;
  })
  .directive('message', function (MessageService) {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: '/components/common/message.html',
      link: function (scope, elem) {
        scope.messageService = MessageService;
      }
    };
  });