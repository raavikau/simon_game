var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColour);
  $("#" + randomChoosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  var audio = new Audio("sounds/" + randomChoosenColour + ".mp3");
  audio.play();
}
