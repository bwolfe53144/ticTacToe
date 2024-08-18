let playerOneScore = 0;
let playerTwoScore = 0;
    
let turn = 0;

function findWinner() {

    if ((gameArray[0] == 1 && gameArray[1] == 1 && gameArray[2] == 1) 
        || (gameArray[3] == 1 && gameArray[4] == 1 && gameArray[5] == 1)
        || (gameArray[6] == 1 && gameArray[7] == 1 && gameArray[8] == 1)
        || (gameArray[0] == 1 && gameArray[3] == 1 && gameArray[6] == 1)
        || (gameArray[1] == 1 && gameArray[4] == 1 && gameArray[7] == 1)
        || (gameArray[2] == 1 && gameArray[5] == 1 && gameArray[8] == 1)
        || (gameArray[0] == 1 && gameArray[4] == 1 && gameArray[8] == 1)
        || (gameArray[2] == 1 && gameArray[4] == 1 && gameArray[6] == 1)) {
        playerOneScore= ++playerOneScore;
        wonGame = playerOneName;
        gameDone();
    } else if ((gameArray[0] == 0 && gameArray[1] == 0 && gameArray[2] == 0) 
        || (gameArray[3] == 0 && gameArray[4] == 0 && gameArray[5] == 0)
        || (gameArray[6] == 0 && gameArray[7] == 0 && gameArray[8] == 0)
        || (gameArray[0] == 0 && gameArray[3] == 0 && gameArray[6] == 0)
        || (gameArray[1] == 0 && gameArray[4] == 0 && gameArray[7] == 0)
        || (gameArray[2] == 0 && gameArray[5] == 0 && gameArray[8] == 0)
        || (gameArray[0] == 0 && gameArray[4] == 0 && gameArray[8] == 0)
        || (gameArray[2] == 0 && gameArray[4] == 0 && gameArray[6] == 0)) {
            playerTwoScore = ++playerTwoScore;
            wonGame = playerTwoName;
            gameDone();
        } else if ((gameArray.length == 9) && !gameArray.includes(undefined) ) {
            wonGame = "tie";
            gameDone();
        }       
}

function endGame() {
    oneScore.innerText = playerOneScore;
    twoScore.innerText = playerTwoScore;
    gameOver = "true";
    turn = 0;
    myTurn = playerOneName;
    myMark = "X";
    message = document.querySelector(".message");
    message.innerText = "";
}

let gameArray = [];

function playGame() {
    gameArray = [];
    gameOver = "false";
    let wonGame = "";
    whosTurn();
    /*set up event listener*/
    let clicked = document.querySelectorAll(".box");
    for (const click of clicked) {
        click.addEventListener("click", () => {
            wasClicked(click);
        });
    }

    function wasClicked(e) {
        /*see if array number was already selected so we can't choose the same spot*/
        const num = parseInt(e.id);
        if (gameArray[num-1] !==0 && gameArray[num-1] !==1 && gameOver == "false") {
        if (turn%2 == 0) {
            e.textContent = "X";
            gameArray[num-1] = 1;
            turn ++;
            whosTurn();
            findWinner();
        } else {
            e.textContent = "O";
            gameArray[num-1] = 0;
            turn ++;
            whosTurn();
            findWinner();
        }
        }
        
    }
}

/*Function to clear the screen*/
function clearScreen() {
    boxes = document.querySelectorAll('.box')
    for (const box of boxes) {
        box.textContent = "";
    };
    endGame();
}

function resetScore() {
    playerOneScore = 0;
    playerTwoScore = 0;
    oneScore.innerText = playerOneScore;
    twoScore.innerText = playerTwoScore;
}

let playerOneName = "Player One";
let playerTwoName = "Player Two";
let myTurn = playerOneName;

let myMark = "X";

oneName.innerText = playerOneName;
twoName.innerText = playerTwoName;
oneScore.innerText = playerOneScore;
twoScore.innerText = playerTwoScore;

function whosTurn() {
    if (turn%2 !== 1) {
        myTurn = playerOneName;
        myMark = "X";
    } else {
        myTurn = playerTwoName;
        myMark = "O";
    }
    message = document.querySelector(".message");
    message.innerText = `It's your turn ${myTurn} .... ${myMark}`;
}

function gameDone() {
    message = document.querySelector(".message");
    endGame();
    if (wonGame == "tie") {
        message.innerText = "It's a tie!"
    } else {
        message.innerText = `Congratulations ${wonGame}, you win!!!`
    }
}

const myFormOne = document.getElementById('myFormOne');                    
myFormOne.addEventListener('submit', function(event) {
    event.preventDefault(); 
    playerOneName = myFormOne.elements.name.value;
    oneName.innerText = playerOneName;
    closeFormOne();
    whosTurn();
});

const myformTwo = document.getElementById('myFormTwo');                    
myformTwo.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
     playerTwoName = myformTwo.elements.name.value;
    twoName.innerText = playerTwoName;
    closeFormTwo();
    whosTurn();
});

function closeFormOne() {
    document.getElementById("myFormOne").style.display = "none";
}

function closeFormTwo() {
document.getElementById("myFormTwo").style.display = "none";
}

var theParent = document.querySelector("body");
theParent.addEventListener("click", doSomething, false);

function doSomething(e) {
    if (e.target !== e.currentTarget) {
        var clickedItem = e.target.id;
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
            resetScore();
        } else if (clickedItem == "startGame") {
            clearScreen();
            playGame();
        }
    }
    e.stopPropagation();
}

closeFormOne();
closeFormTwo();
playGame();