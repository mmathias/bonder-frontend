'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.users',
  'myApp.frontpage',
  'myApp.questions',
  'myApp.challenge',
  'myApp.events',
  'myApp.event',
  'myApp.results',
  'myApp.version'
])
.config(['$routeProvider', 'gravatarServiceProvider', function($routeProvider, gravatarServiceProvider) {
  $routeProvider.otherwise({redirectTo: '/frontpage'});

  gravatarServiceProvider.defaults = {
    size: 100,
    'default': 'mm'
  }

}])
.constant("CONFIG", {
  API_URL: "https://bonderapi.herokuapp.com/api/"
});
