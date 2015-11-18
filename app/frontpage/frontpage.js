angular.module('myApp.frontpage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/frontpage', {
      templateUrl: 'frontpage/frontpage.html',
      controller: 'FrontpageController'
  });
}])

.controller('FrontpageController', ['$http', '$scope', '$location', function($http, $scope, $location) {

  var API_URL = 'https://bonderapi.herokuapp.com/api';

  $scope.createUser = function(newUser) {
    $http.post(API_URL + '/users', {email: newUser.user_email, password: newUser.user_password, name: newUser.name})
    .then(function(response){
      localStorage.user_email = newUser.user_email;
      localStorage.user_id = response.data.userId;
      $location.url('/users');
    });
  };

  $scope.loginUser = function(user) {
    $http.post(API_URL + '/users/login', {email: user.user_email, password: user.user_password})
    .then(function(response) {
      localStorage.user_email = user.user_email;
      localStorage.user_id = response.data.Users[0].user_id;
      $location.url('/users');
    });
  }

}]);

