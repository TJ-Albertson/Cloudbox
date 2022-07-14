import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import BoxCase from "./BoxCase"

import logo from './SVG/logo.svg'
import './CSS/App.css'

export default function App() {

  const [authenticated, setAuthenticated] = useState(true)

  return (
    <div>
      
      
      <div className='NavBar'>
        <NavBar isLoggedIn={authenticated} />
      </div>
      
      <h1 className='BehindNavBar'></h1>

      


      <BoxCase />

      <h1>bottom</h1>

    </div>
  )
}
