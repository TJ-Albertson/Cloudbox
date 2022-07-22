import React, { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom";
import Login from "./Login"
import CloudBox from "./CloudBox"

import './CSS/App.css'

export default function App() {

  


  function Authenticate() {

    async function handleInput(e) {
      e.preventDefault()

      const form = e.target
      const user = {
        email: form[0].value,
        password: form[1].value
      }
    }


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
  }

  function Login2() {

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
  }

  return (
    <div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cloudbox" element={<CloudBox />} />
      </Routes>
      
    </div>
  )
}
