class ConnectFour {
    constructor (player1, player2, vsAI) {
        this.player1 = player1
        this.player2 = player2
        this.vsAI = vsAI
        this.currentPlayer = this.player1
        this.board = this.createBoard()
    }

    createBoard () {
        let tempArr = []
        for (let row = 6; row > 0; row--) {
            tempArr.push([])
            for (let col = 7; col > 0; col--) {
                tempArr[6-row].push(0)
            }
        }
        return tempArr
    }

    dropPiece (row, col, piece) {
        this.board[row][col] = piece
    }

    isValidLocation (col) {
        return this.board[0][col] === 0
    }

    getNextOpenRow (col) {
        for (let row = this.board.length-1; row >= 0; row--) {
            if (this.board[row][col] === 0) {
                return row
            }
        }
    }

    winningMove(row, col, piece) {
        let results = [this.winHorizontal(row, col, piece), this.winVertical(row, col, piece),
            this.winPositivelyDiagonal(row, col, piece), this.winNegativelyDiagonal(row, col, piece)]
        for (let result of results) {
            if (result >= 4) {
                return true
            }
        }
        return false
    }

    winHorizontal(row, col, piece) {
        let score = 1
        // right
        for (let i = 1; i < this.board[0].length; i++) {
            if (col + i < this.board[0].length && this.board[row][col + i] === piece) {
                score++
            } else {
                break
            }
        }
        // left
        for (let i = 1; i < this.board[0].length; i++) {
            if (col - i >= 0 && this.board[row][col - i] === piece) {
                score++
            } else {
                break
            }
        }
        return score
    }

    winVertical(row, col, piece) {
        let score = 1
        // down
        for (let i = 1; i < this.board.length; i++) {
            if (row + i < this.board.length && this.board[row + i][col] === piece) {
                score++
            } else {
                break
            }
        }
        // up
        for (let i = 1; i < this.board.length; i++) {
            if (row - i >= 0 && this.board[row - i][col] === piece) {
                score++
            } else {
                break
            }
        }
        return score
    }

    winPositivelyDiagonal(row, col, piece) {
        let score = 1
        // up to the right
        for (let i = 1; i < this.board.length; i++) {
            if (row - i >= 0 && col + i < this.board[0].length && this.board[row - i][col + i] === piece) {
                score++
            } else {
                break
            }
        }
        // down to the left
        for (let i = 1; i < this.board.length; i++) {
            if (row + i < this.board.length && col - i >= 0 && this.board[row + i][col - i] === piece) {
                score++
            } else {
                break
            }
        }
        return score 
    }

    winNegativelyDiagonal(row, col, piece) {
        let score = 1
        // up to the left
        for (let i = 1; i < this.board.length; i++) {
            if (row - i >= 0 && col - i >= 0 && this.board[row - i][col - i] === piece) {
                score++
            } else {
                break
            }
        }
        // down to the right
        for (let i = 1; i < this.board.length; i++) {
            if (row + i < this.board.length && col + i < this.board[0].length && this.board[row + i][col + i] === piece) {
                score++
            } else {
                break
            }
        }
        return score 
    }

    updateGame(col){
        if (this.isValidLocation(col)) {
            let row = this.getNextOpenRow(col)
            this.dropPiece(row, col, this.currentPlayer.piece)
            if (this.winningMove(row, col, this.currentPlayer.piece)) {
                return true
            }
            this.changeCurrentPlayer()
        }
        return false
    }

    changeCurrentPlayer() {
        if (this.currentPlayer.piece === 1) {
            this.currentPlayer = this.player2
        } else {
            this.currentPlayer = this.player1
        }
    }

    resetGame() {
        this.board = this.createBoard()
        if(this.vsAI) this.player2.reset()
    }

    switchAI(ai) {
        this.player2 = ai
        this.vsAI = !this.vsAI
    }

    aiMove() {
        return this.updateGame(this.player2.main(this.board))
    }
}