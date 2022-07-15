import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import BoxCase from "./BoxCase"

import logo from './SVG/logo.svg'
import './CSS/App.css'

export default function App() {

  const [authenticated, setAuthenticated] = useState(true)
  const [boxCount, setBoxCount] = useState(true)

  const handleChange2 = () => {
    setBoxCount(boxCount + 1);
    console.log(boxCount);
  }

  const handleChange = event => {
    setBoxCount(event.target.value);
    console.log('box count: ' + boxCount)
  }

  return (
    <div>
      
      <div className='NavBar'>
        <NavBar isLoggedIn={authenticated} handleChange={handleChange}/>
      </div>

      <BoxCase boxes={boxCount} />

    </div>
  )
}
