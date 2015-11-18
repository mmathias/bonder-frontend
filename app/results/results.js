angular.module('myApp.results', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/results', {
      templateUrl: 'results/results.html',
      controller: 'ResultsController'
  });
}])

.controller('ResultsController', ['$http', '$scope', '$location', function($http, $scope, $location) {

  var API_URL = 'https://bonderapi.herokuapp.com/api';

  $http.get(API_URL + '/users/' + localStorage.challenged_user_id + '/answers')
  .then(function(response) {
    if (response.data.Answers && response.data.Answers.length) {
      $score.total = response.data.Answers.length;
      return $http.get(API_URL + '/users/' + localStorage.user_id + '/score/' + localStorage.challenged_user_id)
      .then(function(response) {
        $scope.score = response.data.Score[0].score;
      });
    }
  });

  $scope.openQuestions = function() {
    localStorage.challenged_user_id = null;
    $location.url("/challenge");
  }

}]);

