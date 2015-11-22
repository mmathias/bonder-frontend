angular.module('myApp.results', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/results', {
      templateUrl: 'results/results.html',
      controller: 'ResultsController'
  });
}])

.controller('ResultsController', ['$http', '$scope', '$location', 'CONFIG', function($http, $scope, $location, CONFIG) {

  $scope.openQuestionsAboutYou = false;

  $http.get(CONFIG.API_URL + '/users/' + localStorage.challenged_user_id + '/answers')
  .then(function(response) {
    if (response.data.Answers && response.data.Answers.length) {
      $scope.total = response.data.Answers.length;
      return $http.get(CONFIG.API_URL + 'users/' + localStorage.user_id + '/score/' + localStorage.challenged_user_id)
      .then(function(response) {
        $scope.score = response.data.Score[0].score;
      });
    }
  }).then(function() {
    $http.get(CONFIG.API_URL + '/users/' + localStorage.user_id + '/questions?challenged=null')
    .then(function(response) {
      if (response.data.Questions && response.data.Questions.length) {
        $scope.openQuestionsAboutYou = true;
      }
    });

  });

  $scope.openQuestions = function() {
    delete localStorage.challenged_user_id;
    $location.url("/challenge");
  }

  $scope.openUsers = function() {
    delete localStorage.challenged_user_id;
    $location.url("/users");
  }

}]);

