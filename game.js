var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;

var level = 0;

function startOver(){
    level=0;
    gamePattern=[];
    started=false;  
}
$(document).on("keypress",function(event){
    if(!started){
    nextSequence()
    started=true;
    }
})

function nextSequence(){
    userClickedPattern=[];
    level++;
  $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
   

    return randomChosenColour;
   
}

function animatePress(currentColour){
    
//  console.log( currentColour);
 $(`.${currentColour}`).addClass("pressed");
 setTimeout(function(){
    $(`.${currentColour}`).removeClass("pressed"); 
 },100)
}
function playSound(name){
    var concatenation_File="sounds/"+name+".mp3"
  var audio=new Audio(concatenation_File);
  audio.play();
}



$(".btn").on("click",function(){
   var userChosenColor=this.id;
   userClickedPattern.push(userChosenColor);
   console.log(userClickedPattern);
   playSound(userChosenColor);
   animatePress(userChosenColor);
   checkAnswer(userClickedPattern);
})


function checkAnswer(currentLevel){
console.log(userClickedPattern[currentLevel.length-1]);
console.log(gamePattern[currentLevel.length-1]);
if(currentLevel[currentLevel.length-1]===gamePattern[currentLevel.length-1]){
    console.log("success");
    if(currentLevel.length===gamePattern.length){
        setTimeout(function(){
            nextSequence();
            
        },1000);
    }
}
else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200)
    $("#level-title").text("Game Over,press Any Key to Restart");
    startOver();
}

}

