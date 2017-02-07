/**
 * Created by marc on 3/10/16.
 */

angular.module('paletaApp').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('dashboard', {
      url: '/',
      templateUrl: 'js/main/dashboard.html',
      controller: 'DashboardCtrl',
      controllerAs: 'vc'
    });

}]);
