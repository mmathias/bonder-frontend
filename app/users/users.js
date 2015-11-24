angular.module('myApp.users', ['ngRoute', 'ui.gravatar'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users', {
      templateUrl: 'users/users.html',
      controller: 'UsersController'
  });
}])

.controller('UsersController', ['$http', '$scope', '$location', 'CONFIG', '$q',
            function($http, $scope, $location, CONFIG, $q) {

  $scope.users = [];

  $http.get(CONFIG.API_URL + '/users')
  .then(function(response) {
    $scope.users = response.data.Users;
    for (var i = 0; i < $scope.users.length; i++) {
      var user = $scope.users[i];

      if (user.user_email === localStorage.user_email) {
          $scope.users.splice(i, 1);
          break;
      }
    }
  })
  .then(function() {
    var requests = [];

    for (var i = 0; i < $scope.users.length; i++) {
      requests.push($http.get(CONFIG.API_URL + '/users/' + $scope.users[i].user_id + '/answers'));
    }

    return $q.all(requests)
      .then(function(responses) {
        var reqs = [], response;
        for (var i = 0; i < responses.length; i++) {
          response = responses[i]
          if (response.data.Answers && response.data.Answers.length) {
            $scope.users[i].total = response.data.Answers.length;
            reqs.push($http.get(CONFIG.API_URL + 'users/' + localStorage.user_id + '/score/' + $scope.users[i].user_id));
          }
        }

        $q.all(reqs).then(function(responses) {
          for(var i = 0; i<responses.length; i++) {
            $scope.users[i].score = responses[i].data.Score[0].score;
          }
        });
      });
  });

  $scope.openChallenge = function(user) {
    localStorage.challenged_user_id = user.user_id;
    $location.url("/challenge");
  }

}]);

