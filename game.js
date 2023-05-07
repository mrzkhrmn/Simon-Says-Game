const wrongSound = new Audio("./sounds/wrong.mp3")
var level = 0;
var gameStarted = false;
var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour = [];

function nextSequence() {
  resetUserClickedPattern();
  var randomNumber = Math.random() * 3;
  randomNumber = Math.round(randomNumber);
  randomChosenColour = buttonColours[randomNumber];
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  console.log("gamepattern: ", gamePattern);
  console.log("userclickedpattern: ", userClickedPattern);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  $("#level-title").html("Level " + (level + 1));
  level++;
  console.log(level);
}

$(".btn").on("click", handleClick);

function handleClick() {
  if (gameStarted) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

document.addEventListener("keypress", (event) => {
  if (event.key && !gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    resetGame();
  }
  console.log("userclickedpattern: ", userClickedPattern);
  console.log("gamepattern: ", gamePattern);
}

function resetGame() {
  wrongSound.play();
  $("body").addClass("game-over")
  setTimeout(() => {
    $("body").removeClass("game-over")
  }, 200);
  level = 0;
  $("#level-title").html("Press A Key to Start");
  gamePattern = [];
  userClickedPattern = [];
  randomChosenColour = [];
  gameStarted = false;
}

function resetUserClickedPattern() {
  userClickedPattern = [];
}
