import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"


import logo from './SVG/logo.svg'
import './CSS/App.css'


export default function App() {

  const [authenticated, setAuthenticated] = useState(true)

  return (
    <div>
      
      <div className='NavBar'>
        <NavBar isLoggedIn={authenticated} />
      </div>

      <div className="App">
      
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Edit <code>src/App.js</code> and save to reload.</p>

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >Learn React</a>
        </header>
      </div>

      <h1>bottom</h1>

    </div>
  )
}
