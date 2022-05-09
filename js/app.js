const squares = document.querySelectorAll('.row div')
const result = document.querySelector('#result')
const displayCurrentPlayer = document.querySelector('#current-player')
const displayAIPlayer = document.querySelector('#ai-player')


const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

let game = new ConnectFour(new Player('Player 1', 1, 'player-one'), new Player('Player 2', 2, 'player-two'), false)


function controller(square) {
    disableEnableElement("changePlayer", true)
    disableEnableElement("verseAI", true)
    let col = square.target.id % 7
    let gameWon = game.updateGame(col)
    displayCurrentPlayer.textContent = game.currentPlayer.name
    updateBoard()
    checkWin(gameWon)
    if(game.vsAI && !gameWon && game.currentPlayer === game.player2) {
        gameWon = aiTurn()
        checkWin(gameWon)
    }
}

function aiTurn() {
    let gameWon = game.aiMove()
    updateBoard()
    displayCurrentPlayer.textContent = game.currentPlayer.name
    return gameWon
}

function checkWin(gameWon) {
    if (gameWon) {
        result.textContent = game.currentPlayer.name
        openModal(modal)
        removeEventListeners()
    }
}

function updateBoard() {
    let board = game.board
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            let id = (row * 7) + col
            let classColour = ''
            if (board[row][col] === 1) {
                classColour = game.player1.colour
            } else if (board[row][col] === 2) {
                classColour = game.player2.colour
            }
            if (classColour != '') {
                squares[id].classList.add(classColour)
            }
        }
    }
}

function resetGame() {
    disableEnableElement("changePlayer", false)
    disableEnableElement("verseAI", false)
    result.textContent = ''
    for (let i = 0; i < squares.length; i++) {
        squares[i].classList.remove('player-one')
        squares[i].classList.remove('player-two')
    }
    game.resetGame()
    displayCurrentPlayer.textContent = game.currentPlayer.name
    addEventListeners()

    if(game.vsAI && game.currentPlayer === game.player2) {
        console.log('ai moved')
        let gameWon = aiTurn()
        checkWin(gameWon)
        disableEnableElement("changePlayer", true)
        disableEnableElement("verseAI", true)
        displayCurrentPlayer.textContent = game.currentPlayer.name
    }
}

function changePlayer() {
    game.changeCurrentPlayer()
    displayCurrentPlayer.textContent = game.currentPlayer.name
    if(game.vsAI && game.currentPlayer === game.player2) {
        disableEnableElement("changePlayer", true)
        disableEnableElement("verseAI", true)
        aiTurn()
    }
}

function disableEnableElement(id, value) {
    if(value) {
        document.getElementById(id).disabled = true
        document.getElementById(id).classList.add('disabled')
    } else {
        document.getElementById(id).disabled = false
        document.getElementById(id).classList.remove('disabled')
    }
    
}

function verseAI() {
    if (!game.vsAI) {
        ai = new AI('AI', 2, 'player-two')
    } else {
        ai = new Player('Player 2', 2, 'player-two')
    }
    game.switchAI(ai)
    if(game.currentPlayer.name == 'Player 2') {
        changePlayer()
    }
    displayAIPlayer.textContent = game.player2.name
}

onload()
