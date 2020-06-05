import React from 'react'
import s from './Congratulation.module.sass'
import Sakura from './Sakura/Sakura'



type CongratulationType = {
    refreshTheGame: () => void
}

const Congratulation: React.FC<CongratulationType> = React.memo((props) => {

    const {refreshTheGame} = props

    const sakuraTotalCount = 80

    const sakuraGenerator = () => {
        let sakuras = []
        for(let i = 1; i <= sakuraTotalCount; i++){
            sakuras
                .push(
                    <Sakura
                        key={i}
                        sakuraId={i}
                    />
                )
        }
        return sakuras

    }

    return (
        <div
            onClick={refreshTheGame}
            className={s.congratulation}>
            {sakuraGenerator()}
        </div>
    )
})


export default Congratulation