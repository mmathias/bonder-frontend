angular.module('myApp.frontpage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/frontpage', {
      templateUrl: 'frontpage/frontpage.html',
      controller: 'FrontpageController'
  });
}])

.controller('FrontpageController', ['$http', '$scope', '$location', 'CONFIG', function($http, $scope, $location, CONFIG) {

  $scope.createUser = function(newUser) {
    $http.post(CONFIG.API_URL + '/users', {email: newUser.user_email, password: newUser.user_password, name: newUser.name})
    .then(function(response){
      localStorage.user_email = newUser.user_email;
      localStorage.user_id = response.data.userId;
      $location.url('/users');
    });
  };

  $scope.loginUser = function(user) {
    $http.post(CONFIG.API_URL + '/users/login', {email: user.user_email, password: user.user_password})
    .then(function(response) {
      localStorage.user_email = user.user_email;
      localStorage.user_id = response.data.Users[0].user_id;
      $location.url('/users');
    });
  }

}]);

