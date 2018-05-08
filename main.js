var currentPlayer = document.getElementById("redDisc");
var nextPlayer = document.getElementById("blackDisc");

var playerXSelections = new Array();
var playerOSelections = new Array();

let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]
for (let y = 0; y < board.length; y++) {
    let row = board[y];
}

handleClick = function (event) {

    var cell = event.target;

    cell.innerHTML = currentPlayer;

    if (currentPlayer === "X") {
        playerSelections = playerXSelections;
        nextPlayer = "O";
    } else {
        playerSelections = playerOSelections;
        nextPlayer = "X";
    }

    playerSelections.push(parseInt(cell.id));

    if (checkWinner(playerSelections)) {
        alert("Player " + currentPlayer + " wins!");
        resetGame();
    }

    if (checkDraw()) {
        alert("Draw!");
        resetGame();
    }
    // Swap players
    currentPlayer = nextPlayer;
}

var cells = document.querySelectorAll("td");

for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', handleClick);
}

function checkWinner(playerInput) {
    for (let i = 0; i < winningCombinations.length; i++) {

        let matches = 0;

        for (let j = 0; j < winningCombinations.length; j++) {

            if (playerInput.includes(winningCombinations[i][j])) {
                matches++;
                console.log(playerInput);
            } else {
                break;
            }
            if (matches == 3) {
                return true;
            }

            console.log(matches);
        }
    }
}

function checkDraw() {
    return playerOSelections.length + playerXSelections.length >= cells.length
}

function resetGame() {
    playerXSelections = new Array();
    playerOSelections = new Array();
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerHTML = ""
    }
}