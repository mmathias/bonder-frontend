angular.module('myApp.challenge', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/challenge', {
      templateUrl: 'challenge/challenge.html',
      controller: 'ChallengeController'
  });
}])

.controller('ChallengeController', ['$http', '$scope', '$q', '$location', 'CONFIG', function($http, $scope, $q, $location, CONFIG) {

  var currentIndex = 0;

  $http.get(CONFIG.API_URL + '/users/' + localStorage.user_id + '/questions?challenged=' + localStorage.challenged_user_id)
  .then(function(response) {
    $scope.questions = response.data.Questions || [];

    if ($scope.questions.length) {
      $scope.current = $scope.questions[currentIndex++];
    }

    var requests = [];
    for (var i = 0; i < $scope.questions.length; i++) {
      requests.push($http.get(CONFIG.API_URL + '/questions/' + $scope.questions[i].id + '/options'));
    }

    return $q.all(requests)
    .then(function(response) {
      for (var i = 0; i < response.length; i++) {
        $scope.questions[i].options = response[i].data.Options || [];
      }
    });
  });

  $scope.answer = function(questionId, optionId) {
    $http.post(CONFIG.API_URL + '/answers',
              {
                question_id: questionId,
                user_id: localStorage.user_id,
                option_id: optionId,
                challenged_user_id: localStorage.challenged_user_id
              })
    .then(function(response) {
      if ($scope.questions[currentIndex]) {
        $scope.current = $scope.questions[currentIndex];
        currentIndex++;
      } else {
        if (localStorage.challenged_user_id) {
          $location.url('/results');
        } else {
          $location.url('/users');
        }
      }
    });
  };

}]);

