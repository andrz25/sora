const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const resultLine = document.getElementById("result");

const choices = ["rock", "paper", "scissors"];

function getComChoice(){
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function findWinner(playerChoice, comChoice){
    if (playChoice === comChoice){
        return "It's a tie"
    }else if((playerChoice === "rock" && comChoice === "scissors") || (playerChoice === "scissors" && comChoice === "paper") || (playerChoice === "paper" && comChoice === "rock")){
        return "You win"
    }else{
        return "You lose"
    }
}

rockButton.addEventListener("click", () => playGame("rock"));
paperButton.addEventListener("click", () => playGame("paper"));
scissorsButton.addEventListener("click", () => playGame("scissors"));

function playGame(playerChoice){
    const comChoice = getComChoice();
    const result = findWinner(playerChoice, comChoice);
    resultLine.innerHTML = "you chose ${playerChoice}. The computer chose ${comChoice}. ${result}"
}
/*
<h1>Rock, Paper, Scissors</h1>
  <div>
    <button id="rock">Rock</button>
    <button id="paper">Paper</button>
    <button id="scissors">Scissors</button>
  </div>

  <div id="result"></div>
*/