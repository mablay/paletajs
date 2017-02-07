'use strict';

var requiredModules = [
  'ui.router',
  'ngResource',
  'ngStorage'
];

angular.module('paletaApp', requiredModules)
  .config(['$localStorageProvider', function($localStorageProvider) {
    $localStorageProvider.setKeyPrefix('pal-');
  }])
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
  }])
  .config(['$urlRouterProvider', function($urlRouterProvider) {
    // Default Route
    $urlRouterProvider.otherwise("/");
  }]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['paletaApp'], {
    strictDi: true
  });
});
