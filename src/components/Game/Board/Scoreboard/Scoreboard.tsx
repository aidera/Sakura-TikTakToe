import React from 'react'
import refreshImg from '../../../../assets/images/refresh.png'
import s from './Scoreboard.module.sass'



type ScoreboardType = {
    value: string
    refreshTheGame: () => void
}

const Scoreboard: React.FC<ScoreboardType> = React.memo((props) => {

    const {value, refreshTheGame} = props

    return (
        <div className={s.gameScoreboard}>
            <p>{value}</p>
            <div onClick={refreshTheGame} className={s.refreshButton}>
                <img src={refreshImg} alt="Refresh the game"/>
            </div>
        </div>
    )
})



export default Scoreboard