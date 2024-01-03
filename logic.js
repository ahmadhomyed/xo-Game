let gridItems = document.querySelectorAll(".square");
let turn = document.getElementById("turn");
turn.innerHTML = "x";
let currentTurn = "x";
let gameIsFinished = false;
let boardArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
for (const item of gridItems) {
    item.addEventListener("click", function () {
        if (gameIsFinished) {
            return;
        }
        let value = item.getAttribute("data-value");
        let index = value - 1;
        if (boardArray[index] == "x" || boardArray[index] == "o") {
            return;
        }
        let squareContent = document.querySelector(`.square[data-value="${value}"`);
        squareContent.innerHTML = currentTurn;
        boardArray[index] = currentTurn;
        console.log(boardArray);
        if (currentTurn == "x") {
            currentTurn = "o";
            turn.innerHTML = currentTurn;
        } else {
            currentTurn = "x";
            turn.innerHTML = currentTurn;
        }
        evaluateBoard();
    });
    function evaluateBoard() {
        if (
            (boardArray[0] == boardArray[1] && boardArray[0] == boardArray[2]) ||
            (boardArray[3] == boardArray[4] && boardArray[3] == boardArray[5]) ||
            (boardArray[6] == boardArray[7] && boardArray[6] == boardArray[8]) ||
            (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6]) ||
            (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7]) ||
            (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8]) ||
            (boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6])
        ) {
            var winner = currentTurn == "o" ? "x" : "o";
            // alert(`${winner} wins !`);
            alertify.alert("Game Ended", `${winner} wins !`, function () {
                alertify.success("Reset Game");
                reset()
            });

            gameIsFinished = true;
        }
        let isDraw = true;
        for (square of boardArray) {
            if (square != "x" && square !== "o") {
                isDraw = false;
            }
        }
        if (isDraw) {
            alert("It's a draw!");
            gameIsFinished = true;
        }
    }
}
document.getElementById("reset").addEventListener("click", function () {
    reset();
    // window.location.reload();
});
function reset() {
    for (let item of gridItems) {
        item.innerHTML = "";
    }
    boardArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    gameIsFinished = false;
    turn.innerHTML = "x";
    evaluateBoard();
}
