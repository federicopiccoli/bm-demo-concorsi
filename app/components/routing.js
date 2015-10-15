"use strict";

angular.module('bmDemoConcorsiApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('public', {
        url: '/public',
        templateUrl: 'components/public.html',
        abstract: true,
        resolve: {
          User: function () {
            return {};
          }
        }
      })
      .state('public.login', {
        url: '/login',
        templateUrl: 'components/public/login.html',
        controller: 'UserCtrl'
      })
      .state('public.forgot', {
        url: '/forgot',
        templateUrl: 'components/public/forgot.html',
        controller: 'UserCtrl'
      })
      .state('public.register', {
        url: '/register',
        templateUrl: 'components/public/register.html',
        controller: 'UserCtrl'
      })
      .state('app', {
        url: '/app',
        templateUrl: 'components/app.html',
        abstract: true,
        resolve: {
          checkLogged: function ($q, $timeout, $state, UserService) {
            var auth = UserService.isLogged();
            if (auth) {
              if (auth.password.isTemporaryPassword) {
                $timeout(function () {
                  $state.go('app.change-pwd');
                });
                $q.reject();
              } else {
                $q.when();
              }
            } else {
              $timeout(function () {
                $state.go('public.login');
              });
              $q.reject();
            }
          }
        }
      })
      .state('app.welcome', {
        url: '/welcome',
        templateUrl: 'components/app/welcome.html',
        controller: 'WelcomeCtrl'
      })
      .state('app.change-pwd', {
        url: '/change-pwd',
        templateUrl: 'components/app/change-pwd.html',
        controller: 'ChangePwdCtrl'
      })
      .state('app.upload', {
        url: '/upload',
        templateUrl: 'components/app/upload.html',
        controller: 'UploadCtrl'
      });

    $urlRouterProvider.otherwise('/app/welcome');
  });