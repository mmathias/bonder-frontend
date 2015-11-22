angular.module('myApp.invitations', ['ngRoute', 'ui.gravatar'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/invitations', {
      templateUrl: 'invitations/invitations.html',
      controller: 'InvitationsController'
  });
}])

.controller('InvitationsController', [
'$http', '$scope', '$location', 'CONFIG', '$q',
function($http, $scope, $location, CONFIG, $q) {
  $scope.invitations = [];

  $http.get(CONFIG.API_URL + 'invitations')
  .then(function(response) {
    $scope.invitations = response.data.Invitations;
  });

  $scope.openInvitation = function(invitation) {
    localStorage.invitation_id = invitation.id;
    $location.url("/invitation");
  }

}]);

