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
        LoadingCounter.push('user-service-logout');
        var deferred = $q.defer();
        _authObj.$unauth();
        _authObj.$onAuth(function(authData) {
          if (!authData) {
            deferred.resolve();
          }
          LoadingCounter.pop('user-service-logout');
        });
        return deferred.promise;
      },
      isLogged: function () {
        return _authObj.$getAuth();
      },
      changePassword: function (oldPassword, newPassword) {
        _showLoader('user-service-change-password');
        var deferred = $q.defer();

        var auth = _authObj.$getAuth();
        if (auth) {
          var email = auth.password.email;
          _authObj.$changePassword({
              email: email,
              oldPassword: oldPassword,
              newPassword: newPassword
            }).then(function () {
              deferred.resolve()
            }).catch(function (error) {
              MessageService.error(error.code);
              deferred.reject();
            })
            .finally(function () {
              _hideLoader('user-service-change-password');
            });

        } else {
          deferred.reject();
        }

        return deferred.promise;
      }

    };

    return service;
  });