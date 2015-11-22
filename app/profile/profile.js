angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
      templateUrl: 'profile/profile.html',
      controller: 'ProfileController'
  });
}])

.controller('ProfileController', ['$http', '$scope', 'CONFIG', function($http, $scope, CONFIG) {

  $http.get(CONFIG.API_URL + 'users/' + localStorage.user_id).then(function(response) {
    $scope.user = response.data.Users[0] || [];
  });

  $scope.updateUser = function(user) {
    debugger;
    $http.put(CONFIG.API_URL + '/users',
              {
                name: user.name,
                password: user.user_password,
                email: user.user_email
              })
    .then(function(response) {
      user.edittingUser = false;
    });
  };

}]);

