import React, { useState, useEffect } from 'react';
import './CSS/BoxCase.css'
import Box from "./Box"

export default function BoxCase(props) {

    const boxes = props.boxes;
    console.log(props.boxes)

    return (

        <div className='Grid'>
            <Box image='https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Solid_red.svg/512px-Solid_red.svg.png'/>

            {boxes.map((box) =>
                <Box key={box.toString()} id={box} image='https://content.fortune.com/wp-content/uploads/2019/04/brb05.19.plus_.jpg'/>
            )}
        </div>

    )
}