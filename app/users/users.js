angular.module('myApp.users', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users', {
      templateUrl: 'users/users.html',
      controller: 'UsersController'
  });
}])

.controller('UsersController', ['$http', '$scope', function($http, $scope) {

  $scope.edittingUser = false;
  $scope.users = [];

  $http.get('http://localhost:3000/api/users').then(function(response) {
    $scope.users = response.data.Users;
  });

  $scope.updateUser = function(user) {
    $http.put('http://localhost:3000/api/users', {email: user.user_email, password: user.new_password})
    .then(function(response) {
      user.edittingUser = false;
    });
  };

  $scope.deleteUser = function(user_email) {
    $http.delete('http://localhost:3000/api/users/' + user_email)
    .then(function(response) {
      $scope.users
      for (var i = 0; i < $scope.users.length; i++) {
        var user = $scope.users[i];
        if (user.user_email === user_email) {
            $scope.users.splice(i, 1);
            break;
        }
      }

    });
  };

  $scope.createUser = function(newUser) {
    $http.post('http://localhost:3000/api/users', {email: newUser.user_email, password: newUser.user_password})
    .then(function(response){
      $scope.users.push(newUser);
    });
  };

}]);

