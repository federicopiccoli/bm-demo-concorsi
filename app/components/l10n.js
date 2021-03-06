"use strict";

angular.module('bmDemoConcorsiApp')
  .constant('AVAILABLE_LANGUAGES', ['it', 'en', 'sw'])
  .config(function ($translateProvider, AVAILABLE_LANGUAGES) {
    $translateProvider
      .useSanitizeValueStrategy(null)
      .useStaticFilesLoader({
        prefix: '/l10n/',
        suffix: '.json'
      })
      .useSanitizeValueStrategy(null)
      .registerAvailableLanguageKeys(AVAILABLE_LANGUAGES, {
        'en_US': 'en',
        'en_UK': 'en',
        'it_IT': 'it',
        'it_CH': 'it',
        'sw_TZ': 'sw'
      })
      .fallbackLanguage(['it', 'en'])
      .determinePreferredLanguage();
  });