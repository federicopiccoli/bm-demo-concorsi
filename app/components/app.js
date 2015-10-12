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
  .module('bmDemoConcorsiApp', [
    'ui.router', 
    'dsg.loadingCounter', 
    'pascalprecht.translate'
  ])
  .controller('AppCtrl', function ($scope, $translate, AVAILABLE_LANGUAGES) {
    $scope.availableLanguages = AVAILABLE_LANGUAGES;
    $scope.currentLanguage = $translate.use();
    
    $scope.changeLanguage = function (lang) {
      $translate.use(lang);
      $scope.currentLanguage = lang;
    };
  });