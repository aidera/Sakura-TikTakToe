import React from 'react'
import Square from './Square/Square'
import Scoreboard from './Scoreboard/Scoreboard'
import s from './Board.module.sass'




type BoardType = {
    squaresTotalCount: number
    currentPlayer: null | 'o' | 'x'
    squaresValues: Array< null | 'o' | 'x'>
    makeMove: (squareId: number | null) => void
    scoreBoardMessage: string
    refreshTheGame: () => void
    highlightedSquares: Array<number> | null
    winner: null | 'o' | 'x' | 'draw'
}

const Board: React.FC<BoardType> = React.memo((props) => {

    const {squaresTotalCount, currentPlayer, squaresValues, makeMove, scoreBoardMessage, refreshTheGame, highlightedSquares, winner} = props

    const renderSquares = () => {
        let squares = []
        let isHighlighted = false
        for(let i = 0; i <= squaresTotalCount; i++){
            if(highlightedSquares !== null){
                isHighlighted = highlightedSquares.some((el) => el === i)
            }
            squares.push(
                <Square
                    key={i}
                    id={i}
                    value={squaresValues[i]}
                    currentPlayer={currentPlayer}
                    makeMove={makeMove}
                    isHighlighted={isHighlighted}
                    winner={winner}
                />
            )
        }
        return squares
    }

    return (
        <div className={s.gameBoard}>

            <Scoreboard
                value={scoreBoardMessage}
                refreshTheGame={refreshTheGame}
            />

            <div
                className={s.playInContainer}>
                {renderSquares()}
            </div>


        </div>
    )
})



export default Board