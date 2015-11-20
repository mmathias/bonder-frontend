angular.module('myApp.events', ['ngRoute', 'ui.gravatar'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/events', {
      templateUrl: 'events/events.html',
      controller: 'EventsController'
  });
}])

.controller('EventsController', ['$http', '$scope', '$location', 'CONFIG', '$q',
            function($http, $scope, $location, CONFIG, $q) {

  $scope.events = [];

  $http.get(CONFIG.API_URL + 'events')
  .then(function(response) {
    $scope.events = response.data.Events;
  });

  $scope.openEvent = function(event) {
    localStorage.event_id = event.id;
    $location.url("/event");
  }

}]);

