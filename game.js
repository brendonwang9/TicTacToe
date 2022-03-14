var griddivs = document.querySelectorAll("div")
var endgameMsg = document.querySelector("p")
var newGameBtn = document.querySelector('button')

var currentplayer = 0
var turnCounter = 1
var playerO = {
    icon: "O",
    tiles: [],
}
var playerX = {
    icon: "X",
    tiles: [],
}
var winArrays = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

function playGame(event) {
    if (turnCounter % 2 == 1) {
        currentplayer = playerX
    } else {
        currentplayer = playerO
    }
    var claimedtile = event.target
    currentplayer.tiles.push(claimedtile.dataset.grid);
    claimedtile.textContent = currentplayer.icon
    claimedtile.removeEventListener("click", playGame)
    checkWin(currentplayer.tiles)
    turnCounter++;
}

function minmax(boardState, player) {
    if (playerwin) {
        return { score: -10 }
    } else if (computerWin) {
        return { score: 10 }
    } else if (turncounter > 8) {
        return { score: 0 }
    }
    var avaliableSpots = XX
    // build an array of moves which contains objects, each object has a key of i and a value of the avalible spots
    var moves = []
    for (let i = 0; i < avaliableSpots.length; i++) {
        var move = {}
        move[i] = avaliableSpots[i]
        // use the algorithm to play next avaliable turn for the current player 
        boardState[avaliableSpots[i]] = currentplayer
        if (player == computer) {
            // recursive calling of the minmax algortihm until it returns a result 10/-10 return value will be a object with a score which can be assigned to this move
            var result = minmax(boardState, huPlayer)
            move.score = result.score
        } else {
            var result = minmax(boardState, aiPlayer)
            move.score = result.score
        }
        // reset boardstate to original by replacing the avaliable spot with the index so that it appears empty again
        boardState[avaliableSpots[i]] = move.index
        // move object is pushed into the moves array, moves object contains a index and a score value
        moves.push(move)
    }
    // if it is the computer's turn loop over the moves and choose the move with the highest score
    var bestMove;
    if (player === aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        // else loop over the moves and choose the move with the lowest score
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    // return the chosen move (object) from the array to the higher depth
    return moves[bestMove];
}

function checkWin(array) {
    for (let i = 0; i < winArrays.length; i++) {
        if (array.includes(winArrays[i][0].toString()) && array.includes(winArrays[i][1].toString()) && array.includes(winArrays[i][2].toString())) {
            return endgameWin()
        }
    } if (turnCounter > 8) {
        endgameDraw()
    }
}

function endgameWin() {
    endgameMsg.textContent = currentplayer.icon + " wins!"
    newGameBtn.style.visibility = "visible"
    griddivs.forEach(function (div) {
        div.removeEventListener("click", playGame)
    })
}

function endgameDraw() {
    endgameMsg.textContent = "draw!"
    newGameBtn.style.visibility = "visible"
}


function newGame() {
    griddivs.forEach(function (div) {
        div.addEventListener("click", playGame)
        div.textContent = ""
    })
    currentplayer = 0
    turnCounter = 1
    playerO = {
        icon: "O",
        tiles: [],
    }
    playerX = {
        icon: "X",
        tiles: [],
    }
    endgameMsg.textContent = ""
    newGameBtn.style.visibility = "hidden"
}

newGameBtn.addEventListener("click", newGame)
newGame()