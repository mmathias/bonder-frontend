angular.module('myApp.invitation', ['ngRoute', 'ui.gravatar'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/invitation', {
      templateUrl: 'invitation/invitation.html',
      controller: 'InvitationController'
  });
}])

.controller('InvitationController', ['$http', '$scope', '$location', 'CONFIG', '$q',
            function($http, $scope, $location, CONFIG, $q) {

  $scope.invitation = {};

  $http.get(CONFIG.API_URL + 'invitations/' + localStorage.invitation_id)
  .then(function(response) {
    $scope.invitation = response.data.Invitation[0];
  });

}]);

