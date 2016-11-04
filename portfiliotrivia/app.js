var panel = $('#quiz-area');
var countStartNumber = 30;

///////////////////////////////////////////////////////////////////////////////
//CLICK EVENTS
///////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});
///////////////////////////////////////////////////////////////////////////////
//Question set
///////////////////////////////////////////////////////////////////////////////

var questions = [{
  question: "On the surface, the world portrayed in this novel is perfect: however, it's probably the most nightmarish scenario imaginable.",
  answers: ['The Sleeper Awakes', 'WE', '1984', 'Brave New World'],
  correctAnswer: "Brave New World",
  image:"images/bravenewworld.jpg"
}, {
  question: "What anti-hero was sent into a super-max prison to rescue the President from a warlord?",
  answers: ['Snake Plissken', 'John Preston', 'Bernard Marx', 'Professor Cavor'],
  correctAnswer: "Snake Plissken",
  image:"images/snake.jpg"
}, {
  question: "What bleak satire of Stalinism takes place in a glass city state and happens 1000 yrs after the 200 year war?",
  answers: ['WE', 'THX 1138', 'Equilibrium', 'The Time Machine'],
  correctAnswer: "WE",
  image:"images/we.jpg"
}, {
  question: "The protagoinst of this film escaped from prison in a sterile underground city.",
  answers: ['THX 1138', 'LUH 3417', 'Bernard Marx', 'John Savage'],
  correctAnswer: "THX 1138",
  image:"images/thx1138.jpg"
}, {
  question: "What post WWIII society was brought down by a high ranking secret police agent.",
  answers: ['Libria', 'One State', 'Metropolis', 'Mega City One'],
  correctAnswer: "libria",
  image:"images/preston.jpg"
}, {
  question: "What London based surrogate relative persistantly monitors your activities?",
  answers: ["Control", "Mustafa Monds", "Big Brother", "Father"],
  correctAnswer: "Big Brother",
  image:"images/brother.jpg"
}, {
  question: "In conclusion, the realtive equality of all beings is derived from the superior equality of a select few.",
  answers: ["Rossums Universal Robots", "Brave New World", "We", "Animal Farm"],
  correctAnswer: "Animal Farm",
  image:"images/farm.jpg"
}, {
  question: "What Eastern European play coined the colloquial term for mass produced, artificially intelligent beings .",
  answers: ['Rossums Universal Robots', 'Metropolis', 'Do Androids Dream of Electric Sheep', 'Animal Farm'],
  correctAnswer: "Rossums Universal Robots",
  image:"images/rur.jpg"
}];


var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};