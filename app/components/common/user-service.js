"use strict";

angular.module('bmDemoConcorsiApp')
  .service('UserService', function ($firebaseAuth, $q, FIREBASE_APP, LoadingCounter, MessageService) {
    var _authObj = $firebaseAuth(FIREBASE_APP);

    var _showLoader = function (contest) {
      LoadingCounter.push(contest);
    };
    var _hideLoader = function (contest) {
      LoadingCounter.pop(contest);
    };

    var service = {
      login: function (email, password) {
        _showLoader('user-service-login');
        
        var deferred = $q.defer();
        _authObj.$authWithPassword({
            email: email,
            password: password
          })
          .then(function () {
            deferred.resolve();
          })
          .catch(function (error) {
            MessageService.error(error.message);
            deferred.reject();
          })
          .finally(function () {
            _hideLoader('user-service-login')
          });
        
        return deferred.promise;
      },
      register: function (email, password) {
        _showLoader('user-service-register');
        
        var deferred = $q.defer();
        _authObj.$createUser({
            email: email,
            password: password
          })
          .then(function () {
            deferred.resolve();
          })
          .catch(function (error) {
            MessageService.error(error.message);
            deferred.reject();
          })
          .finally(function () {
            _hideLoader('user-service-register')
          });
        
        return deferred.promise;
      },
      forgot: function (email) {
        _showLoader('user-service-email');

        var deferred = $q.defer();
        _authObj.$resetPassword({
            email: email
          })
          .then(function () {
            deferred.resolve();
          })
          .catch(function (error) {
            MessageService.error(error.message);
            deferred.reject();
          })
          .finally(function () {
            _hideLoader('user-service-email')
          });
        
        return deferred.promise;
      },
      logout: function () {
        _showLoader('user-service-logout');
        
        var deferred = $q.defer();
        _authObj.$unauth()
          .then(function () {
            deferred.resolve();
          })
          .catch(function (error) {
            MessageService.error(error.message);
            deferred.reject();
          })
          .finally(function () {
            _hideLoader('user-service-logout')
          });
        
        return deferred.promise;
      }
    };

    return service;
  });