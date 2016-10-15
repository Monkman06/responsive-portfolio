var starwars = {

  newGame: 1, 
  playerSelected: 2, 
  defenderSelected: 3,
  attacking: 4,
  gameLost: 5,
  enemyDefeated: 6,
  gameWon: 7,

  state: this.newGame,

  player: {},   
  playerId: "",   
  defender: {}, 
  defenderId: "", 

  playersAvailable: {},
  enemiesAvailable: {},

  playerCount: 0,
  
  initGame: function() {
    this.state = this.newGame;
    this.player = {}, 
    this.defender = {},

    this.loadPlayersAvailable();
    this.clearEnemiesAvailable();

    this.playerCount = 4;
  },


  loadPlayersAvailable: function() {
    this.playersAvailable = {
      'kylo-ren': { name: 'Kylo Ren', healthPoints: 125, basePower: 10, attackPower: 30 },      
      'generalhux.': { name: 'General Hux', healthPoints: 90, basePower: 20, attackPower: 10 },      
      'finn': { name: 'Finn', healthPoints: 110, basePower: 30, attackPower: 20 },      
      'rey': { name: 'Rey', healthPoints: 150, basePower: 40, attackPower: 40 }      
    };
    
  },

 
  loadEnemiesAvailable: function() {

  },

 
  clearEnemiesAvailable: function() {

  },

  setPlayer: function(player) {
   
    this.playerId = player.id;

    this.player = this.playersAvailable[this.playerId];

   
    $('#' + this.playerId).remove();

   
    var playerDiv = $('#player');

   
    playerDiv.append('<div>' + this.player.name + '</div>');

    
    var playerImg = $('<img>');
    playerImg.attr('src', 'assets/images/' + this.playerId + '.jpg');
    playerImg.attr('alt', this.playerId);
    playerDiv.append(playerImg);

    
    playerDiv.append('<div id="player-health">' + this.player.healthPoints);

    this.playerCount--;
    this.state = this.playerSelected;
  },

  setDefender: function(defender) {
   
    this.defenderId = defender.id;

   
    this.defender = this.playersAvailable[this.defenderId];

    
    $('#' + this.defenderId).remove();

    
    var defenderDiv = $('#defender');

    
    defenderDiv.append('<div>' + this.defender.name + '</div>');

    
    var defenderImg = $('<img>');
    defenderImg.attr('src', 'assets/images/' + this.defenderId + '.jpg');
    defenderImg.attr('alt', this.defenderId);
    defenderDiv.append(defenderImg);

  
    defenderDiv.append('<div id="player-health">' + this.defender.healthPoints);

    this.playerCount--;
    this.state = this.defenderSelected;
  },

  attack: function() {
   
    console.log("starwars.play: attack button pressed");

    if (this.state != this.attacking) {
      if (this.state != this.defenderSelected) {
        
        return;
      }
      this.state = this.attacking;
    }

   
    if (this.player.healthPoints <= 0) {
      this.state = this.GameLost;
      return;
    }

    this.player.attackPower += this.player.basePower;

    if (this.defender.healthPoints > 0) {
      this.defender.healthPoints -= this.player.attackPower;
    }

    if (this.defender.healthPoints <= 0) {
     
      if (this.playerCount > 0) {
        this.state = this.enemyDefeated;  
        $('#defender').children(0).remove();
      }
      else {
        this.state = this.gameWon;
      }
    }
    else {
      this.counterAttack();
    }

    console.log("Defender HP: " + this.defender.healthPoints);
    $('#defender').children('#player-health').text(this.defender.healthPoints);
  },

  counterAttack: function() {
    
     console.log("method: counterAttack() called");

     this.player.healthPoints -= this.defender.basePower;

     if (this.player.healthPoints <= 0) {
      this.state = this.gameLost;
     }

    
     console.log("Player's HP: " + this.player.healthPoints);
    $('#player').children('#player-health').text(this.player.healthPoints);
  },

} 

$(document).ready(function(){

  starwars.initGame();

  $(".thumbnail").on("click", function(){
   

    if (starwars.state == starwars.newGame){
      starwars.setPlayer(this);
    }
    else if (starwars.state == starwars.playerSelected) {
      starwars.setDefender(this);
    }
    else if (starwars.state == starwars.enemyDefeated) {
      starwars.setDefender(this);
    }
    else if (starwars.state == starwars.defenderSelected ||
         starwars.state == starwars.attacking ||
         starwars.state == starwars.gameLost ||
         starwars.state == starwars.gameWon) {
      // ignore for now
    }
    else {
      console.log("Unable to select a character.  Invalid state: " + starwars.state);
    }
    });

    $(".attackButton").on("click", function(){
      starwars.attack();

      if (starwars.state == starwars.gameWon) {
        alert("Game Won!!");
        starwars.initGame();
      }
      else if (starwars.state == starwars.gameLost) {
        alert("Game Lost!!");
        starwars.initGame();
      }
      else if (starwars.state == starwars.enemyDefeated) {
        alert("Enemy Defeated!!  Choose another Enemy!");
      }
      else {
        console.log("Invalid state for Attacking: " + starwars.state);
      }
    });
})