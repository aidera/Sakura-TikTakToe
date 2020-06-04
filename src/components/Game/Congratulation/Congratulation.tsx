import React from 'react'
import s from './Congratulation.module.sass'
import Sakura from './Sakura/Sakura'



const Congratulation = () => {

    const sakuraTotalCount = 80

    const sakuraGenerator = () => {
        let sakuras = []
        for(let i = 1; i <= sakuraTotalCount; i++){
            sakuras
                .push(
                    <Sakura
                        key={i}
                    />
                )
        }
        return sakuras

    }

    return (
        <div className={s.congratulation}>
            {sakuraGenerator()}
        </div>
    )
}


export default Congratulation