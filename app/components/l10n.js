"use strict";

angular.module('bmDemoConcorsiApp')
  .config(function ($translateProvider) {
    $translateProvider
      .useStaticFilesLoader({
        prefix: '/l10n/',
        suffix: '.json'
      })
      .registerAvailableLanguageKeys(['it', 'en', 'sw'], {
        'en_US': 'en',
        'en_UK': 'en',
        'it_IT': 'it',
        'it_CH': 'it',
        'sw_TZ': 'sw'
      })
      .fallbackLanguage(['it', 'en'])
      .determinePreferredLanguage();
  });