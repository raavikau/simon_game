var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

// Handle button clicks
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id"); // to check which button press
  userClickedPattern.push(userChosenColor); // user answer that clicked

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1); // passing the index of the last answer in the user's sequence
});

// Start game on keypress
$(document).keypress(function () {
  if (!gameStarted) { // to check keypress only first time to start game
    startGame();
  }
});

// Starts or resets the game
function startGame() {
  level = 0;
  gamePattern = []; // set the gamepattern array blank to retart game
  gameStarted = true;
  $("#level-title").text("Level " + level);
  nextSequence();
}

// Generates the next sequence
function nextSequence() {
  userClickedPattern = []; // an empty array ready for the next level
  level++;
  $("#level-title").text("Level " + level);

  var randomIndex = Math.floor(Math.random() * buttonColors.length);
  var randomChoosenColor = buttonColors[randomIndex]; // select random color from the colors array
  gamePattern.push(randomChoosenColor);
  $("#" + randomChoosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChoosenColor);
}

// Plays sound for a button
function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

// Animates button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Checks the user's answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) { // it should take one input with the name currentLevel
    gameOver();
    return;
  }

  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

// Handles game over logic
function gameOver() {
  playSound("wrong");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  gameStarted = false;
}
