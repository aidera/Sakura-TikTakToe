import React, {useEffect, useRef} from 'react'
import s from './Sakura.module.sass'
import anime from 'animejs'
import {randomInteger} from '../../../../lib/randomInteger'


type SakuraType = {
    sakuraId: number
}

const Sakura: React.FC<SakuraType> = React.memo((props) => {

    const {sakuraId} = props

    const sakuraParams = {
        rotation: {
            min: 0,
            max: 360
        },
        speed: {
            min: 1000,
            max: 4000
        },
        scale: {
            min: 0,
            max: 999
        },
        from: {
            min: 60,
            max: 100
        },
        to: {
            min: -50,
            max: 100
        }

    }

    const randomRotation = randomInteger(sakuraParams.rotation.min, sakuraParams.rotation.max)
    const randomSpeed = randomInteger(sakuraParams.speed.min, sakuraParams.speed.max)
    const randomScale = randomInteger(sakuraParams.scale.min, sakuraParams.scale.max)
    const randomFrom = randomInteger(sakuraParams.from.min, sakuraParams.from.max)
    const randomTo = randomInteger(sakuraParams.to.min, sakuraParams.to.max)

    const sakuraRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        anime({
            targets: sakuraRef.current,
            keyframes: [
                {
                    bottom: '120%',
                    left: randomTo+'%',
                    rotate: `${randomRotation}deg`,
                    scale: Number(1+'.'+randomScale)
                }
            ],
            duration: randomSpeed,
            easing: 'linear',
            loop: false,
        });
    }, [randomTo, randomRotation, randomSpeed, randomScale])



    return (
        <div
            ref={sakuraRef}
            className={s.sakura}
            style={{
                left: randomFrom+'%',
                zIndex: 200+sakuraId
            }}
        />

    )
})


export default Sakura