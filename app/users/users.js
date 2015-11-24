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

      if (user.user_id == localStorage.user_id) {
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
          response = responses[i];
          if (response.data.Answers && response.data.Answers.length) {
            var userId = findUserIndex($scope.users, response.data.Answers[0].user_id, 'user_id');
            $scope.users[userId].total = response.data.Answers.length;
            reqs.push($http.get(CONFIG.API_URL + 'users/' + localStorage.user_id + '/score/' + $scope.users[userId].user_id));
          }
        }

        $q.all(reqs).then(function(responses) {
          for(var i = 0; i<responses.length; i++) {
            var response = responses[i];
            var userId = findUserIndex($scope.users, +response.data.Score[0].challenged_user_id, 'user_id');
            $scope.users[userId].score = response.data.Score[0].score;
            console.log($scope.users[userId].name);
            console.log($scope.users[userId].score);
            console.log($scope.users[userId].total);
          }
        });
      });
  });

  $scope.openChallenge = function(user) {
    localStorage.challenged_user_id = user.user_id;
    $location.url("/challenge");
  }

  var findUserIndex = function(array, value, property) {
    var i;
    for(i = 0; i < array.length; i++) {
      if (array[i][property] === value) {
        return i;
      }
    }
  }

}]);

