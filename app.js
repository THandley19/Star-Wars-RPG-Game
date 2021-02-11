(function main() {
  // Possible Characters to Use/Defeat
  let characters = [
    {
      name: "Obi-Wan",
      health: "200",
      image: "./assets/obi-wan.jpg",
      maxHit: 35,
    },
    {
      name: "Darth Vadar",
      health: "250",
      image: "./assets/darth-vadar.jpg",
      maxHit: 50,
    },
    {
      name: "Luke Skywalker",
      health: "300",
      image: "./assets/luke-skywalker.jpg",
      maxHit: 60,
    },
    {
      name: "Kylo Ren",
      health: "180",
      image: "./assets/kylo-ren.png",
      maxHit: 45,
    },
  ];

  function createCharacterCards() {
    // Generates Cards for each available Character
    for (let i = 0; i < characters.length; i++) {
      $("#characterChoice").append(`<div class="col-md-3">
          <div class="choice-text" id="charchoices">
            <div class="card" style="width: 10rem">
              <h5 class="character-name" style="color: black">${characters[i].name}</h5>
              <img src=${characters[i].image} class="card-img-top" alt="obi-wan" />
              <h6 class="power-level" id="obi-wan-power" style="color: black">
                ${characters[i].health}
              </h6>
            </div>
          </div>
        </div>`);
    }
  }

  function userCharacterChoice(character) {
    // adds user selected character to user character div
    $("#userchar").append(`<div id="selected-character" class="col-md-3">
          <div class="choice-text" id="charchoices">
            <div class="card" style="width: 10rem">
              <h5 class="character-name" style="color: black">${character.name}</h5>
              <img src=${character.image} class="card-img-top" alt="obi-wan" />
              <h6 class="selected-character-health" id="obi-wan-power" style="color: black">
                ${character.health}
              </h6>
            </div>
          </div>                
        </div>`);
    enemyCharacterChoice(character);
  }

  function enemyCharacterChoice(character) {
    // random enemy is selected from characters array
    let enemy = characters[Math.floor(Math.random() * characters.length)];

    // checks to make sure that the enemy character is not the same as the character the user selected
    // if it is the same character, it will call the function again to get another character
    if (character.name == enemy.name) {
      enemyCharacterChoice(character);
    } else {
      // adds to enemy character div
      $("#enemychar").append(`<div  id="selected-enemy"class="col-md-3">
          <div class="choice-text" id="charchoices">
            <div class="card" style="width: 10rem">
              <h5 class="character-name" style="color: black">${enemy.name}</h5>
              <img src=${enemy.image} class="card-img-top" alt="obi-wan" />
              <h6 class="enemy-health" style="color: black">
                ${enemy.health}
              </h6>
            </div>
          </div>
        </div>`);
    }
    // calls function to start the battle between the two characters
    battle(character, enemy);
  }

  function criticalHit(initDamage) {
    // randomly picks a number between 0 - 10
    let criticalHit = Math.floor(Math.random() * 10);

    // if the number is 0, the initial damage done by the character is increased by 30%
    if (criticalHit == 0) {
      initDamage += Math.round(initDamage * 0.3);
    }

    return initDamage;
  }

  function checkHealth(user, enemy) {
    // if either the user or enemy has their fall below or equal to 0 the game ends, sends the user a message letting them know if they won or not and refreshes the page to start the next game
    if (user <= 0) {
      alert("You have lost!");
      location.reload();
    } else if (enemy <= 0) {
      alert(`You have won`);
      location.reload();
    }
  }

  function battle(user, enemy) {
    // initial health values for each character
    let userHealth = user.health;
    let enemyHealth = enemy.health;

    // this function is only called when the attack button is selected by the user
    $("#attack-button").on("click", () => {
      // grabs random numbers to see how much damage the characters will do to each other
      let userDamage = Math.floor(Math.random() * user.maxHit);
      let enemyDamage = Math.floor(Math.random() * 20);

      // checks to see if the attack will gain extra damage via a critical hit
      userDamage = criticalHit(userDamage);
      enemyDamage = criticalHit(enemyDamage);

      // the enemy and user lose health based on the amount of damage dealt
      userHealth = userHealth - enemyDamage;
      enemyHealth = enemyHealth - userDamage;

      // the health section on each of the characters card is dynamically updated
      $(".selected-character-health").text(userHealth);
      $(".enemy-health").text(enemyHealth);

      // messages are displayed to show much damage each character did
      $("#user-messages").text(`${user.name} did ${userDamage} damage`);
      $("#enemy-messages").text(`${enemy.name} did ${enemyDamage} damage`);

      // checks to see if each character has any remaining health
      checkHealth(userHealth, enemyHealth);
    });
  }

  $(document).ready(function () {
    // create character cards for selection by the user
    createCharacterCards();
    // listens to see which character is selected by the user
    $(".choice-text").on("click", (evt) => {
      // stores the name of the character in a varaible
      let characterName = evt.currentTarget.children[0].children[0].innerText;
      // looks in the characters array to see what character the user selected
      let characterCheck = characters.find(
        ({ name }) => name === characterName
      );
      // calls the userCharacterChoice function to move the character card that was selected by the user to the userchar div
      userCharacterChoice(characterCheck);
    });
  });
})();
