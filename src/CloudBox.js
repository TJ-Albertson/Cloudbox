import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import BoxCase from "./BoxCase"

import './CSS/App.css'

import { useNavigate } from "react-router-dom";


export default function CloudBox() {
  const navigate = useNavigate()
    const [email, setEmail] = useState("")
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
    fetch("http://localhost:5000/isLoggedIn", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => data.isLoggedIn ? setEmail(data.email) : null)
  }, [])


  

  function Login() {

    function handleLogin(e) {
      e.preventDefault()

      const form = e.target;
      const user = {
        email: form[0].value,
        password: form[1].value
      }

      
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
      
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
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
            <NavBar email={email} addBox={addBox} removeBox={removeBox}/>
          </div>
    
          <BoxCase boxes={boxes} />

        </div>
      )
    

}