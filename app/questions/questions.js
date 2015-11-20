angular.module('myApp.questions', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/questions', {
      templateUrl: 'questions/questions.html',
      controller: 'QuestionsController'
  });
}])

.controller('QuestionsController', ['$http', '$scope', 'CONFIG', function($http, $scope, CONFIG) {

  $http.get(CONFIG.API_URL + '/questions').then(function(response) {
    $scope.questions = response.data.Questions || [];
  });

  $scope.updateQuestion = function(question) {
    $http.put(CONFIG.API_URL + '/questions',
              {
                id: question.id,
                question: question.question,
                firstOption: question.firstOption,
                secondOption: question.secondOption
              })
    .then(function(response) {
      question.edittingQuestion = false;
    });
  };

  $scope.deleteQuestion = function(questionId) {
    $http.delete(CONFIG.API_URL + '/questions/' + questionId)
    .then(function(response) {
      for (var i = 0; i < $scope.questions.length; i++) {
        var question = $scope.questions[i];
        if (question.id === questionId) {
            $scope.questions.splice(i, 1);
            break;
        }
      }
    });
  };

  $scope.createQuestion = function(newQuestion) {
    $http.post(CONFIG.API_URL + '/questions',
               {question: newQuestion.question,
                firstOption: newQuestion.firstOption,
                secondOption: newQuestion.secondOption
              })
    .then(function(response){
      $scope.questions.push(newQuestion);
    });
  };

}]);

