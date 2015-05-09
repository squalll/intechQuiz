'use strict';

var app = angular.module('app', ['ngRoute', 'appControllers', 'appServices']);

var appServices = angular.module('appServices', []);

var appControllers = angular.module('appControllers', []);


var options = {};
options.api = {};
options.api.base_url = "http://localhost:3580";


app.config(['$locationProvider', '$routeProvider', 
            function($location, $routeProvider) {
              $routeProvider.
                  when('/', {
                      templateUrl: 'partials/config.html',
                      controller: 'ConfigCtrl'
                  }).
                  otherwise({
                      redirectTo: '/'
                  });
  }]);




