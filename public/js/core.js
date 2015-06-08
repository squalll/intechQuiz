'use strict';

var app = angular.module('app', ['ngRoute', 'appControllers', 'appServices','ngMaterial', 'ngAnimate']);

var appServices = angular.module('appServices', []);

var appControllers = angular.module('appControllers', []);


var options = {};
options.api = {};
options.api.base_url = "http://localhost:3580";


app.config(['$locationProvider', '$routeProvider', 
            function($location, $routeProvider) {
              $routeProvider.
                  when('/', {
                      templateUrl: 'partials/reponse.html',
                      controller: 'ReponseCtrl'
                  }).
                  when('/response', {
                      templateUrl: 'partials/reponse.html',
                      controller: 'ReponseCtrl'
                  }).
                  when('/admin', {
                      templateUrl: 'partials/admin.html',
                      controller: 'AdminCtrl'
                  }).
                  otherwise({
                      redirectTo: '/'
                  });
  }]);




