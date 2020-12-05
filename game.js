var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var wrongSound = new Audio("sounds/wrong.mp3");

$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){

  if(level<1){
    $("#level-title").html("Level 0");
    nextSequence();
  }

});

function nextSequence(){
  userClickedPattern=[];

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level = gamePattern.length;
  $("#level-title").html("Level "+level);
}

function playSound(name){
  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();
  console.log(name);
}

function animatePress(currentColour){
  var a = $("#"+currentColour);
  a.addClass("pressed");

  setTimeout(function(){
    a.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("succes");

    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){nextSequence();}, 1000);
    }

  }else {
    wrongSound.play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").html("GAME OVER, </br> PRESS ANY KEY TO RESTART");

    startOver();

    console.log("wrong");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
}
