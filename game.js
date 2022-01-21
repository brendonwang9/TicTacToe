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
    if (turnCounter%2 == 1){
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

function checkWin(array) {
    for (let i = 0; i < winArrays.length; i++){
        if (array.includes(winArrays[i][0].toString()) && array.includes(winArrays[i][1].toString()) && array.includes(winArrays[i][2].toString())){
            return endgameWin(turnCounter)
        }
    } if (turnCounter > 8){
        endgameDraw()
    }
}

function endgameWin(turnCounter) {
    endgameMsg.textContent = currentplayer.icon + " wins!"
    newGameBtn.style.visibility = "visible"
    griddivs.forEach(function(div){
        div.removeEventListener("click", playGame)
    })
}

function endgameDraw() {
    endgameMsg.textContent = "draw!"
    newGameBtn.style.visibility = "visible"
}


function newGame() {
    griddivs.forEach(function(div){
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