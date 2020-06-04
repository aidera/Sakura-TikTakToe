import React, {useEffect, useRef} from 'react'
import s from './Sakura.module.sass'
import anime from 'animejs'
import {randomInteger} from '../../../../lib/randomInteger'



const Sakura: React.FC = React.memo((props) => {

    const sakuraParams = {
        rotation: {
            min: 0,
            max: 360
        },
        speed: {
            min: 1000,
            max: 4000
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
                    rotateY: `${randomRotation}deg`
                }
            ],
            duration: randomSpeed,
            easing: 'linear',
            loop: false,
        });
    }, [randomTo, randomRotation, randomSpeed])



    return (
        <div
            ref={sakuraRef}
            className={s.sakura}
            style={{left: randomFrom+'%'}}
        />

    )
})


export default Sakura