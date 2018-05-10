let columns = document.getElementsByClassName("column"); // live collection
let currentPlayer = "red";
const config = {};
config.rowCount = 6;
config.columnCount = 7;
config.edgeY = config.rowCount - 3;
config.edgeX = config.columnCount - 3;
winner = document.getElementById("winner")

let gameBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

function startClick() {
    for (let column of columns) {
        column.addEventListener("click", addGamePiece);
    }
}
startClick();

function endClick() {
    for (let column of columns) {
        column.removeEventListener("click", addGamePiece)
    }
}

//combining win conditions to check win status

function checkWinner() {
    if (checkVertical() || checkHorizontal() || checkDiagonalLeft() || checkDiagonalRight()) {
        endClick();
        winner.style.display = "block";
        if (currentPlayer === "black") {
            winner.textContent = "Red Wins";
        } else if (currentPlayer === "red") {
            winner.textContent = "Black Wins";
        }
    }
}

//adding a game piece

function addGamePiece(event) {
    const currentColumn = event.currentTarget;
    const redGamePiece = document.createElement("div");
    redGamePiece.className = "gamePiece";
    redGamePiece.setAttribute("id", "red");

    const blackGamePiece = document.createElement("div");
    blackGamePiece.className = "gamePiece";
    blackGamePiece.setAttribute("id", "black");

    const columnIndex = currentColumn.dataset.id;
    const rowIndex = (config.rowCount - 1) - currentColumn.childElementCount;

    if (currentPlayer === "red" && currentColumn.childElementCount < 6) {
        currentColumn.appendChild(redGamePiece);
        gameBoard[rowIndex][columnIndex] = 1
        currentPlayer = "black";
    } else if (currentPlayer === "black" && currentColumn.childElementCount < 6) {
        currentColumn.appendChild(blackGamePiece);
        gameBoard[rowIndex][columnIndex] = 2
        currentPlayer = "red";
    }
    console.log(gameBoard);
    checkWinner();
}

//winning conditions


function checkHorizontal() {
    for (let rowIndex = 0; rowIndex < gameBoard.length; rowIndex++) {
        let row = gameBoard[rowIndex];
        for (let columnIndex = 0; columnIndex < config.edgeX; columnIndex++) {
            let cell = row[columnIndex];
            if (cell !== 0) {
                if (
                    cell === gameBoard[rowIndex][columnIndex + 1] &&
                    cell === gameBoard[rowIndex][columnIndex + 2] &&
                    cell === gameBoard[rowIndex][columnIndex + 3]) {
                    return true
                }
            }
        }
    }
}

function checkVertical () {
    for (let rowIndex = 0; rowIndex < config.edgeY; rowIndex++) {
        for (let columnIndex = 0; columnIndex < gameBoard[0].length; columnIndex++) {
            cell = gameBoard[rowIndex][columnIndex];
            if (cell !== 0) {
                if (cell === gameBoard[rowIndex + 1][columnIndex] &&
                    cell === gameBoard[rowIndex + 2][columnIndex] &&
                    cell === gameBoard[rowIndex + 3][columnIndex] ) {
                        return true
                    }
            }
        }
    }
}

function checkDiagonalRight() {
    for (let rowIndex = 0; rowIndex < config.edgeY; rowIndex++) {
        for (let columnIndex = 0; columnIndex < config.edgeX; columnIndex++) {
            cell = gameBoard[rowIndex][columnIndex];
            if (cell !== 0) {
                if (cell === gameBoard[rowIndex + 1][columnIndex + 1] && 
                    cell === gameBoard[rowIndex + 2][columnIndex + 2] && 
                    cell === gameBoard[rowIndex + 3][columnIndex + 3]) {
                    return true;
                }
            }
        }
    }
}

function checkDiagonalLeft() {
    for (let rowIndex = 0; rowIndex < gameBoard.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < config.edgeX; columnIndex++) {
            cell = gameBoard[rowIndex][columnIndex];
            if (cell !== 0) {
                if (cell === gameBoard[rowIndex - 1][columnIndex + 1] && 
                    cell === gameBoard[rowIndex - 2][columnIndex + 2] && 
                    cell === gameBoard[rowIndex - 3][columnIndex + 3]) {
                    return true
                }
            }
        }
    }
}