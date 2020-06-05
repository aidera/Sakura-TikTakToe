import React, {useState, useEffect, useRef} from 'react'
import Board from './Board/Board'
import refreshImg from '../../assets/images/refresh.png'
import cn from 'classnames'
import s from './Game.module.sass'
import Congratulation from './Congratulation/Congratulation'



const Game = () => {

    const squaresTotalCount = 9

    const initialCurrentPlayer = 'x'
    const initialSquaresValues = Array(squaresTotalCount).fill(null)
    const initialMovesCount = 1
    const initialScoreBoardMessage = "Click on square"
    const initialHighlightedSquares = null
    const initialWinner = null

    const [currentPlayer, setCurrentPlayer] = useState<null | 'o' | 'x'>(initialCurrentPlayer)
    const [squaresValues, setSquaresValues] = useState(initialSquaresValues)
    const [movesCount, setMovesCount] = useState(initialMovesCount)
    const [scoreBoardMessage, setScoreBoardMessage] = useState<string>(initialScoreBoardMessage)
    const [highlightedSquares, setHighlightedSquares] = useState<null | Array<number>>(initialHighlightedSquares)
    const [winner, setWinner] = useState<null | 'o' | 'x' | 'draw'>(initialWinner)
    const [isGameInitialized, setIsGameInitialized] = useState<boolean>(false)

    const preloaderRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        hidePreloader()
    }, [])


    const hidePreloader = () => {
        if(preloaderRef !== null && preloaderRef.current !== null){
            preloaderRef.current.classList.add('hide')
            setTimeout(() => setIsGameInitialized(true), 1000);
        }
    }


    const makeMove = (squareId: number | null) => {

        if(squareId !== null) {

            setMovesCount(movesCount + 1)

            const winnerCheckBefore = calculateWinner()

            if (winnerCheckBefore === null) {

                setNewValue(squareId)

                const winnerCheckAfter = calculateWinner()

                if (winnerCheckAfter === null) {
                    if (movesCount < squaresTotalCount) {
                        switchPlayer()
                    } else {
                        makeDraw()
                    }
                } else {
                    setCurrentPlayer(null)
                    makeWinner(winnerCheckAfter)
                }


            }
        }else{
            refreshTheGame()
        }

    }



    const calculateWinner = () => {

        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squaresValues[a] && squaresValues[a] === squaresValues[b] && squaresValues[a] === squaresValues[c]) {
                return {player: squaresValues[a], line: lines[i]}
            }
        }
        return null
    }

    const setNewValue = (squareId: number) => {
        let squaresValuesCopy = squaresValues
        squaresValuesCopy[squareId] = currentPlayer
        setSquaresValues(squaresValuesCopy)
    }


    const switchPlayer = () => {
        if(currentPlayer === 'o'){
            setScoreBoardMessage("X player's step now")
            setCurrentPlayer('x')

        }else if(currentPlayer === 'x'){
            setScoreBoardMessage("О player's step now")
            setCurrentPlayer('o')
        }
    }


    const makeWinner = (winner: {player: 'x' | 'o', line: Array<number>}) => {
        setWinner(winner.player)
        setScoreBoardMessage(winner.player.toUpperCase()+' - win. Omedeto!')
        setHighlightedSquares(winner.line)
    }


    const makeDraw = () => {
        setWinner('draw')
        setScoreBoardMessage('Nobody wins. Doro.')
    }

    const refreshTheGame = () => {
        setCurrentPlayer(initialCurrentPlayer)
        setSquaresValues(initialSquaresValues)
        setMovesCount(initialMovesCount)
        setScoreBoardMessage(initialScoreBoardMessage)
        setHighlightedSquares(initialHighlightedSquares)
        setWinner(initialWinner)
    }



    return (
        <main className={s.game}>

            <div className={s.gameBackground}/>

            <Board
                squaresTotalCount={squaresTotalCount}
                currentPlayer={currentPlayer}
                squaresValues={squaresValues}
                makeMove={makeMove}
                scoreBoardMessage={scoreBoardMessage}
                refreshTheGame={refreshTheGame}
                highlightedSquares={highlightedSquares}
                winner={winner}
            />

            {(winner === 'o' || winner === 'x') &&
                <Congratulation refreshTheGame={refreshTheGame} />
            }
            {/*<Congratulation refreshTheGame={refreshTheGame} />*/}

            {!isGameInitialized &&
                <div ref={preloaderRef} className={cn(s.preloader, {hide: isGameInitialized})}>
                    <img src={refreshImg} alt="Loading..."/>
                </div>
            }

        </main>


    )
}



export default Game
