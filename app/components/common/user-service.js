"use strict";

angular.module('bmDemoConcorsiApp')
  .service('UserService', function ($firebaseAuth, FIREBASE_APP, LoadingCounter) {
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
        return _authObj.$authWithPassword({
          email: email,
          password: password
        })
        .finally(function(){
          _hideLoader('user-service-login')
        });
      },
      register: function (email, password) {
        _showLoader('user-service-register');
        return _authObj.$createUser({
          email: email,
          password: password
        })
        .finally(function(){
          _hideLoader('user-service-register')
        });
      },
      forgot: function (email) {
        _showLoader('user-service-email');
        return _authObj.$resetPassword({email: email})
        .finally(function(){
          _hideLoader('user-service-email')
        });
      },
      logout: function () {
        _showLoader('user-service-logout');
        return _authObj.$unauth()
        .finally(function(){
          _hideLoader('user-service-logout')
        });
      }
    };

    return service;
  });