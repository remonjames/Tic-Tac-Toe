"use strict";

const gameModule = (() => {


    const board = Array(9).fill(null);
    let gameBoard = document.querySelector("#board");
    board.forEach(() => {
        const cell = document.createElement("div");
        cell.className = "cell";
        gameBoard.appendChild(cell);
    })

    const createPlayer = (name, marker, score) => {
        return { name, marker, score };
    }

    const playerOne = createPlayer("Player 1", "x", 0);
    const playerTwo = createPlayer("Player 2", "o", 0);



    let currentPlayer = playerOne;
    let filledSpots = 0;
    let cells = document.querySelectorAll(".cell");
    let message = document.querySelector(".message");
    let isGameOver = false;
    let round = 1;
    let playerOneScore = document.querySelector("#playerOneScore");
    let playerTwoScore = document.querySelector("#playerTwoScore");
    let nextRoundBtn = document.querySelector("#nextRoundBtn");
    let resetBtn = document.querySelector("#resetBtn");
    let playerOneName = document.getElementById("playerOneName");
    let playerTwoName = document.getElementById("playerTwoName");


    playerOneName.addEventListener("input", setName);
    playerTwoName.addEventListener("input", setName);

    function setName(e) {
        if (e.target.id === "playerOneName") {
            playerOne.name = playerOneName.value;
        } else {
            playerTwo.name = playerTwoName.value;
        }
    }

    for (let cell of cells) {
        cell.addEventListener("click", placeMarker, { once: true });
    }

    function placeMarker() {
        if (!isGameOver) {
            this.classList.add(currentPlayer.marker);
            gameBoard.classList.remove(`turn-${currentPlayer.marker}`);
            filledSpots += 1;
            checkGameEnd();
            nextPlayerTurn();
            updateScores();
        }
    }

    function checkGameEnd() {
        if (checkWinner()) {
            console.log(`${currentPlayer.name} wins`);
            message.innerText = `${currentPlayer.name} wins`;
            isGameOver = true;
            currentPlayer.score += 1;
        } else if (filledSpots === 9) {
            console.log("Draw");
            isGameOver = true;
            message.innerText = "Draw";
        }
        if (checkWinner() || filledSpots === 9) {
            nextRoundBtn.classList.add("nextRound");
        }
    }

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWinner() {
        return winningCombos.some(combo => {
            return combo.every(index => {
                return cells[index].classList.contains(currentPlayer.marker);
            })
        })
    }


    function nextPlayerTurn() {
        if (!isGameOver) {
            currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
            gameBoard.classList.add(`turn-${currentPlayer.marker}`)
            message.innerText = `${currentPlayer.name}'s turn`;
        }

    }

    function updateScores() {
        playerOneScore.innerText = `Score: ${playerOne.score}`;
        playerTwoScore.innerText = `Score: ${playerTwo.score}`;
    }


    nextRoundBtn.addEventListener("click", newRound);
    resetBtn.addEventListener("click", resetGame);

    function newRound() {
        if (isGameOver) {
            for (let cell of cells) {
                cell.classList.remove("x");
                cell.classList.remove("o");
                gameBoard.classList.remove("turn-x");
                gameBoard.classList.remove("turn-o");
                nextRoundBtn.classList.remove("nextRound");
                cell.addEventListener("click", placeMarker, { once: true });
                filledSpots = 0;
                isGameOver = false;
                setStartPlayer();
            }
        }
    }

    function setStartPlayer() {
        round += 1;
        if (round % 2 === 0) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
        gameBoard.classList.add(`turn-${currentPlayer.marker}`);
        message.innerText = `${currentPlayer.name}'s turn`;
    }

    function resetGame() {
        playerOne.score = 0;
        playerTwo.score = 0;
        round = 0;
        isGameOver = true;
        updateScores();
        newRound();
    }

})();