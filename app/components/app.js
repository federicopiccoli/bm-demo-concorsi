'use strict';

/**
 * @ngdoc overview
 * @name bmDemoConcorsiApp
 * @description
 * # bmDemoConcorsiApp
 *
 * Main module of the application.
 */
angular
  .module('bmDemoConcorsiApp', ['ngCookies', 'ui.router', 'dsg.loadingCounter', 'pascalprecht.translate'])
  .constant('LANG_COOKIE_KEY', 'lang_cookie')
  .controller('AppCtrl', function ($scope, $cookies, $translate, AVAILABLE_LANGUAGES, LANG_COOKIE_KEY) {


    $scope.changeLanguage = function (lang) {
      $translate.use(lang);
      $scope.currentLanguage = $translate.proposedLanguage();
      $cookies.put(LANG_COOKIE_KEY, lang);
    }


    var cookieLang = $cookies.get(LANG_COOKIE_KEY);

    if (angular.isDefined(cookieLang)) {
      $scope.changeLanguage(cookieLang);
    }

    $scope.availableLanguages = AVAILABLE_LANGUAGES;
    $scope.currentLanguage = $translate.proposedLanguage();


  });