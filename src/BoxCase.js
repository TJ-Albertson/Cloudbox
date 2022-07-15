import React, { useState, useEffect } from 'react';
import './CSS/BoxCase.css'
import Box from "./Box"

export default function BoxCase(props) {


    

    return (
        <div className='Grid'>


            <Box image='https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Solid_red.svg/512px-Solid_red.svg.png'/>
            <Box image='https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Solid_green.svg/1200px-Solid_green.svg.png'/>
            <Box image='https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Solid_blue.svg/800px-Solid_blue.svg.png'/>
            <Box image='https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Solid_red.svg/512px-Solid_red.svg.png'/>
            <Box image='https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Solid_green.svg/1200px-Solid_green.svg.png'/>
            
        </div>
    )
}