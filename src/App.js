import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import BoxCase from "./BoxCase"

import './CSS/App.css'

export default function App() {

  const [authenticated, setAuthenticated] = useState(true)
  const [boxes, setBoxes] = useState([1])

  const addBox = () => {
   setBoxes([...boxes, boxes[boxes.length - 1] + 1]);
  }

  const removeBox = () => {
    if (boxes.length > 1) {
      const temp = new Array(...boxes);
      temp.pop();
      setBoxes(temp);
    }
  }

  return (
    <div>
      
      <div className='NavBar'>
        <NavBar isLoggedIn={authenticated} addBox={addBox} removeBox={removeBox}/>
      </div>

      <BoxCase boxes={boxes} />

    </div>
  )
}
