import { DocumentDefinition } from "mongoose"
import { ActiveGameDocument } from "../model/activeGame.model"


export function isWinner(game: DocumentDefinition<ActiveGameDocument>){
    let moves = new Array()
    const movesReducer = game.moves.length%2 == 0 ? 
        game.moves.map(function(e, index){
            if(index%2 !== 0){
                moves.push(e)
            }
        }) : game.moves.map(function(e, index){
            if(index%2 === 0){
                moves.push(e)
            }
        })
    const boardSize = game.boardSize
    const currentStone = moves[moves.length -1]
    const winLength = 5 
    
    if (moves.length < 5) return false

    if(
        StonesNS(winLength, currentStone, boardSize, moves) === winLength ||
        StonesEW(winLength, currentStone, boardSize, moves) === winLength ||
        StonesNESW(winLength, currentStone, boardSize, moves) === winLength ||
        stonesNWSE(winLength, currentStone, boardSize, moves) === winLength
    )
        return true // there is a winner
    if(moves.length === boardSize*boardSize) return true // there is a draw
}

const StonesNS = (winLength: number, index: number, boardSize: number, moves: number[]) => {
    let count = 1
        // Check Nth line for required number of matching stones
    let tileId = index - boardSize
    while(count < 6 
            && tileId >= 0 
            && moves.includes(tileId)) {
        count++
        tileId = tileId-boardSize
    }
    if(count === winLength) return count
    // CHeck Sth line for required number of matchin stone
    tileId = index + boardSize
    while(count < 6 
            && tileId <= Math.pow(boardSize, 2)-1 
            && moves.includes(tileId))  {
        count ++
    }
    if(count === winLength) return count
}

const StonesEW = (winLength: number, index: number, boardSize: number, moves: number[]) => {
    let count = 1
    // Check West line for required number of matching tiles
    let tileId = index - 1
    while(count < 6 
            && index%boardSize !== 0 
            && moves.includes(tileId)) {
        count ++
        tileId = tileId-1
    }
    if(count === winLength) return count
    // Check East line for mathcing tiles
    tileId = index + 1
    while(count < 6 
            && tileId%boardSize !== 0 
            && moves.includes(tileId)) {
        count++
        tileId = tileId+1
    }
    if(count === winLength) return count
}

const StonesNESW = (winLength: number, index: number, boardSize: number, moves: number[]) => {
    let count = 1

    // Check NE line for required number of matching stones
    let tileId = index - boardSize + 1

    while(count < 6 
            && tileId >0
            && (tileId%boardSize !==0)
            && moves.includes(tileId)) {
        count ++
        tileId = tileId - boardSize + 1
    }
    if(count === winLength) return count
    // // Check SW line for required number of matching stones
    tileId = index + boardSize - 1
    while(count < 6 
            && tileId >=0
            && tileId <= Math.pow(boardSize, 2)
            && index%boardSize !==0
            && moves.includes(tileId)){
        count ++
        tileId = tileId + boardSize - 1
    }
    if(count === winLength) return count
}

const stonesNWSE = (winLength: number, index: number, boardSize: number, moves: number[]) => {
    let count = 1

    // Check NW line for required number of matching stones
    let tileId = index - boardSize - 1
    while(count < 6 
            && tileId >=0
            && (index%boardSize !==0 || tileId == 0)
            && moves.includes(tileId)) {
        count ++
        tileId = tileId - boardSize - 1
    }
    if(count === winLength) return count
    // Check SE line for required number of matching stones
    tileId = index + boardSize + 1
    while(count < 6 
        && (tileId%boardSize !==0 || index == 0)
        && moves.includes(tileId)) {
    count ++
    tileId = tileId + boardSize + 1
}
    if(count === winLength) return count
}
