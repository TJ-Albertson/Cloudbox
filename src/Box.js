import React, { useState, useEffect } from 'react';
import './CSS/Box.css'

export default function Box(props) {

    //these functions let me drag, drop, and swap whats inside them
    function allowDrop(ev) {
        ev.preventDefault();
    }
    
    function drag(ev) {
        ev.dataTransfer.setData("src", ev.target.id);
    }
    
    function drop(ev) {
        ev.preventDefault();
        var src = document.getElementById(ev.dataTransfer.getData("src"));
        var srcParent = src.parentNode;
        var tgt = ev.currentTarget.firstElementChild;
    
        ev.currentTarget.replaceChild(src, tgt);
        srcParent.appendChild(tgt);
    }
   
    return (
        <div>
            <div className='Box' onDrop={drop} onDragOver={allowDrop}>
                <img id={Math.floor(Math.random() * 1000)} src={props.image} width="100" height="49" draggable="true" onDragStart={drag} />
            </div>
        </div>
    )
}