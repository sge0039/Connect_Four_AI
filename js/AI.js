class AI extends Player {
    constructor (name, piece, colour) {
        super(name, piece, colour)
        // this.startScoreMatrix = [
        //     [3, 4, 5, 7, 5, 4, 3],
        //     [4, 6, 8, 10, 8, 6, 4],
        //     [5, 8, 11, 13, 11, 8, 5],
        //     [5, 8, 11, 13, 11, 8, 5],
        //     [4, 6, 8, 10, 8, 6, 4],
        //     [3, 4, 5, 7, 5, 4, 3]
        // ]
        this.scoreMatrix = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ]
    }

    reset(){
        this.scoreMatrix = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ]
    }

    main(currentBoard) {
        this.calculateScoreMatrix(currentBoard, this.piece)
        return this.findBestPosition(currentBoard)
    }

    findBestPosition(currentBoard){
        let bestScore = undefined
        let bestCol = undefined
        for (let col = 0; col < currentBoard[0].length; col++) {
            for (let row = currentBoard.length-1; row >= 0; row--) {
                if(currentBoard[row][col] !== 0) continue
                if(this.scoreMatrix[row][col] > bestScore || bestScore === undefined) {
                    bestScore = this.scoreMatrix[row][col]
                    bestCol = col
                }
                break
            }
        }
        return bestCol
    }

    calculateScoreMatrix(currentBoard, piece) {
        for (let row = currentBoard.length-1; row >= 0; row--) {
            for (let col = 0; col < currentBoard[row].length; col++) {
                if(currentBoard[row][col] == 0) {
                    let tempScore = this.calulateHorizontalScore(currentBoard, row, col, piece)
                    tempScore += this.calulateVerticalScore(currentBoard, row, col, piece)
                    tempScore += this.calulatePositivelyDiagonalSore(currentBoard, row, col, piece)
                    tempScore += this.calulateNegativelyDiagonalScore(currentBoard, row, col, piece)
                    this.scoreMatrix[row][col] = tempScore
                }
            }
        }
    }

    renameMe(selection, row, col, piece) {
        let score = this.aboutToLose(selection, row, col, piece)
        return score += this.aboutToWin(selection, piece)
    }

    calulateHorizontalScore(currentBoard, row, col, piece) {
        let score = 0
        for(let i = 0; i < 4; i++) {
            let count = 0
            let tempCol = col - i
            let tempSelecion = []
            for(let j = 0; j < 4; j++) {
                if(tempCol + j < 0 || tempCol + j >= currentBoard[row].length) break
                if(currentBoard[row][tempCol + j] == 0 || currentBoard[row][tempCol + j] == piece) count++
                tempSelecion.push(currentBoard[row][tempCol + j])
            }
            if(count == 4) score++
            if(tempSelecion.length == 4) score += this.renameMe(tempSelecion, row, col, piece)
        }
        return score
    }

    calulateVerticalScore(currentBoard, row, col, piece) {
        let score = 0
        for(let i = 0; i < 4; i++) {
            let count = 0
            let tempRow = row - i
            let tempSelecion = []
            for(let j = 0; j < 4; j++) {
                if(tempRow + j < 0 || tempRow + j >= currentBoard.length) break
                if(currentBoard[tempRow + j][col] == 0 || currentBoard[tempRow + j][col] == piece) count++
                tempSelecion.push(currentBoard[tempRow + j][col])
            }
            if(count == 4) score++
            if(tempSelecion.length == 4) score += this.renameMe(tempSelecion, row, col, piece)
        }
        return score
    }

    calulatePositivelyDiagonalSore(currentBoard, row, col, piece) {
        let score = 0
        for(let i = 0; i < 4; i++) {
            let count = 0
            let tempRow = row + i
            let tempCol = col - i
            let tempSelecion = []
            for(let j = 0; j < 4; j++) {
                if(tempRow - j < 0 || tempRow - j >= currentBoard.length) break
                if(tempCol + j < 0 || tempCol + j >= currentBoard[row].length) break
                if(currentBoard[tempRow - j][tempCol + j] == 0 || currentBoard[tempRow - j][tempCol + j] == piece) count++
                tempSelecion.push(currentBoard[tempRow - j][tempCol + j])
            }
            if(count == 4) score++
            if(tempSelecion.length == 4) score += this.renameMe(tempSelecion, row, col, piece)
        }
        return score
    }

    calulateNegativelyDiagonalScore(currentBoard, row, col, piece) {
        let score = 0
        for(let i = 0; i < 4; i++) {
            let count = 0
            let tempRow = row - i
            let tempCol = col - i
            let tempSelecion = []
            for(let j = 0; j < 4; j++) {
                if(tempRow + j < 0 || tempRow + j >= currentBoard.length) break
                if(tempCol + j < 0 || tempCol + j >= currentBoard[row].length) break
                if(currentBoard[tempRow + j][tempCol + j] == 0 || currentBoard[tempRow + j][tempCol + j] == piece) count++
                tempSelecion.push(currentBoard[tempRow + j][tempCol + j])
            }
            if(count == 4) score++
            if(tempSelecion.length == 4) score += this.renameMe(tempSelecion, row, col, piece)
        }
        return score
    }

    aboutToLose(selection, row, col, piece) {
        let opponentCounter = 0
        let emptyCounter = 0
        for(let item of selection ) {
            if(item != piece && item != 0) opponentCounter++
            if(item == 0) emptyCounter++
        }
        if(opponentCounter == 3) {
            if(row+1 < 6) {
                this.scoreMatrix[row+1][col] -= 7
            }
            return 14
        }
        if(opponentCounter == 2 && emptyCounter == 2) return 7
        return 0
    }

    aboutToWin(selection, piece) {
        let counter = 0 
        for(let item of selection ) {
            if(item == piece) counter++
        }
        if(counter == 3) return 28
        return 0
    }
}
