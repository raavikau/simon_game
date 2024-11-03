var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var gameStart = false;

$(".btn").click(function () { // handle button cliick
  var userChosenColour = $(this).attr("id"); // to check which button press
  userClickedPattern.push(userChosenColour); // user answer that clicked

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1); // passing the index of the last answer in the user's sequence
});

$(document).keypress(function (event) {
  if (!gameStart) {  // to check keypress only first time to start game

    $("#level-title").text("Level " + level);
    nextSequence(); // call only on first key press
    gameStart = true;
  }
});

function nextSequence() {
  userClickedPattern = []; // an empty array ready for the next level
  level++;

  $("#level-title").text("Level " + level);

  var randomIndex = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonColors[randomIndex]; // select random color from the colors array
  gamePattern.push(randomChoosenColour);

  $("#" + randomChoosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChoosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {  // it should take one input with the name currentLevel
    
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("#level-title").text("Game Over, Press any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  gamePattern = [];
  level = 0;
  gameStart = false;
}
