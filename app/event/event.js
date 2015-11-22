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
  $scope.users = [];

  $http.get(CONFIG.API_URL + 'events/' + localStorage.event_id)
  .then(function(response) {
    $scope.event = response.data.Event[0];
    return $http.get(CONFIG.API_URL + 'users');
  })
  .then(function(response) {
    $scope.users = response.data.Users;
  });

  $scope.pay = function(event) {

  }

  $scope.inviteAll = function(event) {
    var requests = [];
debugger;
    for (var i = 0; i < $scope.users.length; i++) {
      requests.push($http.post(CONFIG.API_URL + 'invitations',
          {
            event_id: event.id,
            inviter_id: localStorage.user_id,
            invited_id: $scope.users[i].user_id
          }
      ));
    }

    $q.all(requests);
  }

}]);

