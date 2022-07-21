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

  useEffect(() => {
    fetch("http://localhost:5000/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => data.isLoggedIn)
  }, [])


  function Login() {

    function handleLogin(e) {
      e.preventDefault()

      const form = e.target;
      const user = {
        email: form[0].value,
        password: form[1].value
      }

      console.log(
      fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("token", data.token)
      })
      )
    }

    return (
      <form onSubmit={event => handleLogin(event)}>
        <input required type="email" /> 
        <input required type="password" />
        <input type="submit" value="Submit" />
      </form>
    )
  }

  function Register() {
    async function handleRegister(e) {
      e.preventDefault()

      const form = e.target
      const user = {
        email: form[0].value,
        password: form[1].value
      }
      
      console.log(
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      )
    }

    return (
      <form onSubmit={event => handleRegister(event)}>
        <input required type="email" />
        <input required type ="password" />
        <input type="submit" value="Register" />
      </form>
    )
  }
  

  return (
    <div>
      
      <div className='NavBar'>
        <NavBar isLoggedIn={authenticated} addBox={addBox} removeBox={removeBox}/>
      </div>

      <BoxCase boxes={boxes} />

      <h1>Login{Login()}</h1>
      <h1>Register{Register()}</h1>

    </div>
  )
}
