'use strict';

angular
  .module('bnePaymentsOldFashionedApp', [
    'ngRoute',
    'angucomplete'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
