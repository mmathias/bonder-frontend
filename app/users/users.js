angular.module('myApp.users', ['ngRoute', 'ui.gravatar'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users', {
      templateUrl: 'users/users.html',
      controller: 'UsersController'
  });
}])

.controller('UsersController', ['$http', '$scope', function($http, $scope) {

  $scope.users = [];
  var API_URL = 'https://bonderapi.herokuapp.com/api';

  $http.get(API_URL + '/users').then(function(response) {
    $scope.users = response.data.Users;
    for (var i = 0; i < $scope.users.length; i++) {
      var user = $scope.users[i];
      if (user.user_email === localStorage.user_email) {
          $scope.users.splice(i, 1);
          break;
      }
    }
  });
}]);

