var colors=["red","blue","green","yellow",];
var gamePattern=[];

var started =false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    //when started,level+1,and change the title
  level++;
    $("#level-title").text("Level " + level);
   //random number
    var randomNumber = Math.floor(Math.random() * 4);

  //random color
    var randomChosenColour = colours[randomNumber];

   //push to gamePattern
    gamePattern.push(randomChosenColour);

    //all button has id, so the name of id
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}
//collect user choose color sequence
var userClick=[];

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClick[currentLevel]) {
        console.log("success");
        if (userClick.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Call startOver() if the user gets the sequence wrong.
        startOver();
    }
}

$('.btn').click(function (){
    var userchooseColor = $(this).attr("id");
    userClick.push(userchooseColor);
    playSound(userchooseColor);
    animatePress(userchooseColor);
    checkAnswer(userClick.length-1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


