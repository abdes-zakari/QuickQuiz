var app = angular.module('quizApp', []);


app.directive('quiz', function(quizFactory,$timeout) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
                scope.playedQuestions=[];
				scope.getQuestion();
				scope.timer=20;
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}
			var tmr;

			scope.stopTimer = function() {
               $timeout.cancel(tmr);
            };

			scope.updateTimer = function() {
				console.log('inside Timer');
				scope.timer--;
				tmr=$timeout(scope.updateTimer, 1000);
                if (scope.timer==0) {
                	  scope.stopTimer();
                	  scope.id++;
                	  scope.nextQuestion();
                }
            };

        

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.numOfQuestion = q.numOfQuestion;
					// scope.timer=5;
					scope.stopTimer();
					scope.updateTimer();
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

	
            // var playedQuestions = [];
            scope.testBtnDiv = function() {
            	alert('hola');
            }

            scope.scoppa = function() {
            	var start = new Date().getTime();
                  for (var i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > 4000){
                      break;
                    }
                  }
            }

            function isInArray(array,value) {return array.indexOf(value) > -1;}


			scope.checkQuestionDiv = function($event) {

				  scope.stopTimer();
				  var ans = $($event.target).data('answer');// get klciked Answer

				  
				  if (!isInArray(scope.playedQuestions,scope.numOfQuestion)) { //for Edge browser or IE
				  // if (!scope.playedQuestions.includes(scope.numOfQuestion)) {
				      scope.playedQuestions.push(scope.numOfQuestion);
				     if(ans == scope.options[scope.answer]) {
				     	scope.success=true;
				     	scope.failed=false;
				     	// scope.score++;
				     	scope.score=scope.score+10;

				     } else {
				     	scope.success=false;
				     	scope.failed=true;
				     }
				     console.log('This is New Question');
				     scope.id++;
				  }else{
				  	console.log('Question has ben answerd!');
				  }
                
				scope.answerMode = false;
				
				$timeout(function () {
                    scope.nextQuestion();
                },4000);
			};


			scope.nextQuestion = function() {
                scope.timer=20;
				scope.success=false;
                scope.failed=false;
				// scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: "What is the capital city of Morocco?",
			options: ["Madrid", "Rabat", "Beijing", "Paris"],
			numOfQuestion:1,
			answer: 1// position of the correct answer
		},
		{
			question: "in which continent is Morocco?",
			options: ["Asia", "Europa", "Africa", "South America"],
			numOfQuestion:2,
			answer: 2
		},
		{
			question: "What is the capital city of Italy?",
			options: ["Berlin", "Istanbul", "Athens", "Roma"],
			numOfQuestion:3,
			answer: 3
		},
		{	
			question: "Who invented the light bulb?",
			options: ["Thomas Alva Edison","Albert Einstein",  "Isaac Newton", "Lionel Messi"],
			numOfQuestion:4,
			answer: 0
		},
		{
			question: "Which was the first country to issue paper currency?",
			options: ["USA", "France", "Italy", "China"],
			numOfQuestion:5,
			answer: 3
		},
		{
			question: "Who won the World Cup in 2014?",
			options: ["USA", "Germany", "Brasil", "England"],
			numOfQuestion:6,
			answer: 1
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});