$(document).ready(function){
//create 4 charecters with objects
    var characters = {
'Finn': {
      name: 'Finn',
      health: 120,
      attack: 20,
      imageUrl: "finn.jpg",
      enemyAttackBack: 15
    },
    'General Hux': {
      name: 'General Hux',
      health: 100,
      attack: 20,
      imageUrl: "generalhux.jpg",
      enemyAttackBack: 10
    },
    'Kylo Ren': {
      name: 'Kylo Ren',
      health: 150,
      attack: 30,
      imageUrl: "kylo-ren.jpg",
      enemyAttackBack: 10
    },
    'Rey': {
      name: 'Rey',
      health: 180,
      attack: 40,
      imageUrl: "rey.jpg",
      enemyAttackBack: 20
    }
  };
    var currSelectCharacter;
    var currDefender;
    var combatants = [];
    var indexOfSelChar;
    var attackResult;
    var turnCount = 1;
    var killCount = 0;
    //create function to render to dom
var renderOne = function(character, renderArea, makeChar) {
  //charecter: obj, renderArea: class/id, makeChar: string
var charDiv =$("<div class='character' data-name'"+character.name+"'>");
var charName = $("<div class='character-name'>").text(character.name);
var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
var charHealth = $("<div class='character-health'>").text(character.health);
charDiv.append(charName).append(charImage).append(charHealth);  
$(renderArea).append(charDiv); 
    // conditional render
if (makeChar == 'enemy'){
  $(charDiv).addClass("enemy");
} else if (makeChar == 'defender'){
currDefender = character;
$(charDiv).addClass("target-enemy");
};

