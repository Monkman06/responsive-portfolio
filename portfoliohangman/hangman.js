var hangmanGame = { // word selection object
 wordsToPick: { 
  "war of the worlds": { //1
},
" the warriors": { //2
},
"trip to the moon": {//3
},
"the rock": {//4
},
"king kong": {//5
},
"thx 1138": {//6
},
"nosferatu": {//7
},
"the hangover": {//8
},
"inception" : {
},
"batman": {//9
},
"jurrasic world": {//10
 }
},
wordInPlay: null,
lettersOfTheWord: [],
matchedLetter: [],
guessesLetters: [],
guessesLeft: 0,
totalGuesses: 0,
letterGuessed: null,
wins: 0,
setupGame: function() {
  // Pick a random word
  var objKeys = Object.keys(this.wordsToPick);
   this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

   this.lettersOfTheWord = this.wordInPlay.split('');
   this.rebuildWordView();
   this.processUpdateTotalGuesses();
 },
 updatePage: function(letter) {
if (this.guessesLeft == 0){
  this.restartGame();
}else{
  this.updateGuesses(letter);
  this.updateMatchedLetters(letter);
  this.rebuildWordView();
if (this.updateWins() == true){
  this.restartGame();
   }
  }
 },
  updateGuesses: function(letter){
    // if the letter is not in the guessedLetters array & the letter is not in the lettersOfTheWord 
    //array then make guesses go down
 if ((this.guessedLetters.indexOf(letter) == -1) && (this.lettersOfTheWord.indexOf(letter) == -1)){
  this.guessedLetters.push(letter);
  this.guessesLeft--;

  document.querySelector('#guesses-remaining').innerHTML = this.guessesLeft;
  document.querySelection("#guessed-letters").innerHTML = this.guessedLetters.join(',');
 }
  },
 processUpdateTotalGuesses: function(){
  this.totalGuesses = this.lettersOfTheWord.length + 5;
  this.guessesLeft = this.totalGuesses;
// Render the guesses left
document.querySelector('#guesses-remaining').innerHTML =this.guessesLeft;
 },
updateMatchedLetters: function(letter){
for (var i = 0; i < this.lettersOfTheWord.length; i++){
  if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) == -1)){
this.matchedLetters.push(letter);
  };
};
},
rebuildWordView: function(){
  var wordView = "";
  for(var i=0; i < this.lettersOfTheWord.lenght; i++){
    if (this.matchedLetters.indexOf(this.lettersofTheWord[i]) != -1){
      wordView += this.letterOfTheWord[i];
  }else{ 
    wordView += '&nbsp;_&nbsp;';
}
}
 document.querySelector('#current-word').innerHTML = wordView;
},

restartGame : function(){
document.querySelector('#guessed-letters').innerHTML = '';
this.wordInPlay = null;
this.lettersofTheWord = [];
this.matchedLetters = [];
this.guessesLetters = [];
this.guessesLeft = 0;
this.totalGuesses = 0;
this.letterGuessed = null;
this.setupGame();
this.rebuildWordView();
},
updateWins: function() {
  //this won't work for words with double or tripple letters


  if (this.matchedLetters.length == 0){
    var win = false;
  }else{
    var win = true
  }

  for (var i=0; i < this.lettersofTheWord.length; i++){
    if (this.matchedLetters.indexOf(this.lettersofTheWord[i]) == -1){
      win = false;
    }
  }
  if (win == true){
    this.wins = this.wins + 1;

    document.querySelector('#wins').innerHTML = this.wins;

    return true;
  }else{
    return false;
  }
  }
};

hangmanGame.setupGame();

document.onkeyup = function(event) {
hangmanGame.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
hangmanGame.updatePage(hangmanGame.letterGuessed);
}
