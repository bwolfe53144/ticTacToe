const scoreBoard = {
    resetScore: function() {
        playerOne.score = 0;
        playerTwo.score = 0;
        this.showScore();
    },
    showScore: function() {
        oneName.innerText = playerOne.name;
        twoName.innerText = playerTwo.name;
        oneScore.innerText = playerOne.score;
        twoScore.innerText = playerTwo.score;
    },
    showMessage: function() {
        message = document.querySelector(".message");
        message.innerText = `It's your turn ${player.name} .... ${player.marker}`; 
    }
}

function Player(name, marker, score) {
    this.name = name;
    this.marker = marker;
    this.score = score;
}

const playerOne = new Player("Player 1", "X", 0);
const playerTwo = new Player("Player 2", "O", 0);
let player = playerOne;
let turn = 1


const gameboard = {gameArray: ["0", "0", "0", "0", "0", "0", "0", "0", "0"]}

function boardMoves(box, num){
    if (gameOver == "false") {
        box.textContent = `${player.marker}`;
        gameboard.gameArray[num-1] = `${player.marker}`;
        turn ++;
        gameStatus();   
    }
}

var theParent = document.querySelector("body");
theParent.addEventListener("click", wasClicked, false);

function wasClicked(e) {
    if (e.target !== e.currentTarget) {
        var clickedItem = e.target.id;
        num = parseInt(clickedItem);
        if (clickedItem == "openOne") {
            document.getElementById("myFormOne").style.display = "block";
        } else if (clickedItem == "closeOne") {
            closeFormOne();
        } else if (clickedItem == "openTwo") {
            document.getElementById("myFormTwo").style.display = "block";
        } else if (clickedItem == "closeTwo") {
            closeFormTwo();
        } else if (clickedItem == "clear") {
            clearScreen();
        } else if (clickedItem == "reset") {
            scoreBoard.resetScore();
        } else if (clickedItem == "startGame") {
            clearScreen();
            startGame();
        } else if (num > 0 && num < 10 && (gameboard.gameArray[num-1]== "0")) {
            boardMoves(e.target, num);

        }
    }
    e.stopPropagation();
}

function gameDone(player) {
    message = document.querySelector(".message");
    endGame();
    if (player == "tie") {
        message.innerText = "It's a tie!"
    } else {
        message.innerText = `Congratulations ${player.name}, you win!!!`
    }
}

function clearScreen() {
    boxes = document.querySelectorAll('.box')
    for (const box of boxes) {
        box.textContent = "";
    };
    endGame();
}

function endGame() {
    scoreBoard.showScore();
    gameOver = "true";
    player = playerOne;
    message = document.querySelector(".message");
    message.innerText = "";
}

const myFormOne = document.getElementById('myFormOne');                    
myFormOne.addEventListener('submit', function(event) {
    event.preventDefault(); 
    playerOne.name = myFormOne.elements.name.value;
    scoreBoard.showScore();
    closeFormOne();
});

const myformTwo = document.getElementById('myFormTwo');                    
myformTwo.addEventListener('submit', function(event) {
    event.preventDefault(); 
     playerTwo.name = myformTwo.elements.name.value;
    scoreBoard.showScore();
    closeFormTwo();
});

function closeFormOne() {
    document.getElementById("myFormOne").style.display = "none";
}

function closeFormTwo() {
document.getElementById("myFormTwo").style.display = "none";
}

function programStart() {
    scoreBoard.resetScore();
    closeFormOne();
    closeFormTwo();
    startGame();
}

function startGame() {
    gameOver = "false";
    turn = 1;
    player = playerOne;
    gameboard.gameArray = ["0", "0", "0", "0", "0", "0", "0", "0", "0"];
    scoreBoard.showScore();
    scoreBoard.showMessage();
}

programStart();

    function gameStatus() {
        if ((gameboard.gameArray[0] == "X" && gameboard.gameArray[1] == "X" && gameboard.gameArray[2] == "X") 
            || (gameboard.gameArray[3] == "X" && gameboard.gameArray[4] == "X" && gameboard.gameArray[5] == "X")
            || (gameboard.gameArray[6] == "X" && gameboard.gameArray[7] == "X" && gameboard.gameArray[8] == "X")
            || (gameboard.gameArray[0] == "X" && gameboard.gameArray[3] == "X" && gameboard.gameArray[6] == "X")
            || (gameboard.gameArray[1] == "X" && gameboard.gameArray[4] == "X" && gameboard.gameArray[7] == "X")
            || (gameboard.gameArray[2] == "X" && gameboard.gameArray[5] == "X" && gameboard.gameArray[8] == "X")
            || (gameboard.gameArray[0] == "X" && gameboard.gameArray[4] == "X" && gameboard.gameArray[8] == "X")
            || (gameboard.gameArray[2] == "X" && gameboard.gameArray[4] == "X" && gameboard.gameArray[6] == "X")) {
            playerOne.score= ++playerOne.score;
            gameDone(playerOne);
        } else if ((gameboard.gameArray[0] == "O" && gameboard.gameArray[1] == "O" && gameboard.gameArray[2] == "O") 
            || (gameboard.gameArray[3] == "O" && gameboard.gameArray[4] == "O" && gameboard.gameArray[5] == "O")
            || (gameboard.gameArray[6] == "O" && gameboard.gameArray[7] == "O" && gameboard.gameArray[8] == "O")
            || (gameboard.gameArray[0] == "O" && gameboard.gameArray[3] == "O" && gameboard.gameArray[6] == "O")
            || (gameboard.gameArray[1] == "O" && gameboard.gameArray[4] == "O" && gameboard.gameArray[7] == "O")
            || (gameboard.gameArray[2] == "O" && gameboard.gameArray[5] == "O" && gameboard.gameArray[8] == "O")
            || (gameboard.gameArray[0] == "O" && gameboard.gameArray[4] == "O" && gameboard.gameArray[8] == "O")
            || (gameboard.gameArray[2] == "O" && gameboard.gameArray[4] == "O" && gameboard.gameArray[6] == "O")) {
                playerTwo.score = ++playerTwo.score;
                gameDone(playerTwo);
            } else if (turn == 10) {
                gameDone("tie");
            } else {
                player = player === playerOne ? playerTwo : playerOne; 
                scoreBoard.showMessage();
            }              
    }