import React from 'react'
import cn from 'classnames'
import s from './Square.module.sass'


type SquareType = {
    id: number
    value: null | 'o' | 'x'
    currentPlayer: null | 'o' | 'x'
    makeMove: (squareId: number | null) => void
    isHighlighted: boolean
    winner: null | 'o' | 'x' | 'draw'
}

const Square: React.FC<SquareType> = React.memo((props) => {

    const {id, value, currentPlayer, makeMove, isHighlighted, winner} = props;

    return(
        <div className={s.gameSquare}>

            {value !== null &&
                <div
                    onClick={() => {
                        if(winner !== null){
                            makeMove(null)
                        }
                    }}
                    className={cn(s.currentValueImg, {[s.circleImg]: value === 'o', [s.crossImg]: value === 'x', [s.highlighted]: isHighlighted})}
                />
            }
            {value === null && currentPlayer !== null &&
                <div
                    onClick={() => {
                        if(winner !== null){
                            makeMove(null)
                        }else{
                            makeMove(id)
                        }
                    }}
                    className={cn(s.onHoverImg, {[s.circleImg]: currentPlayer === 'o', [s.crossImg]: currentPlayer === 'x'})}
                />
            }

        </div>
    )
})



export default Square