angular.module('myApp.event', ['ngRoute', 'ui.gravatar'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/event', {
      templateUrl: 'event/event.html',
      controller: 'EventController'
  });
}])

.controller('EventController', ['$http', '$scope', '$location', 'CONFIG', '$q',
            function($http, $scope, $location, CONFIG, $q) {

  $scope.event = {};

  $http.get(CONFIG.API_URL + 'events/' + localStorage.event_id)
  .then(function(response) {
    $scope.event = response.data.Event[0];
  });

}]);

