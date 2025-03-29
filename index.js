const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;


document.addEventListener('keydown', function() {
  if (!started) {
    document.getElementById("level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});


document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener('click', function() {
    const userChosenColour = this.getAttribute("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";

    setTimeout(function () {
      document.body.classList.remove("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;
  
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  const selectedButton = document.getElementById(randomChosenColour);
  

  selectedButton.style.opacity = '0';
  setTimeout(() => {
    selectedButton.style.opacity = '1';
  }, 100);

  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  const button = document.getElementById(currentColor);
  button.classList.add("pressed");
  setTimeout(function () {
    button.classList.remove("pressed");
  }, 100);
}

function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
