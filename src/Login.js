import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Login(props) {

  const navigate = useNavigate()
  const [message, setMessage] = useState("")

  //auto login 
  useEffect((navigate) => {

    /*
    const url = "http://localhost:5000/isLoggedIn"
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    }

    const { data } = axios.get(url, config)
    .then(
      (res.data) =>
        if(res.data.isLoggedIn) {
          navigate("./cloudbox", { replace: true })
        }
    )
    */

    fetch("http://localhost:5000/isLoggedIn", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(
      (data) => {
        if(data.isLoggedIn) {
          navigate("./cloudbox", { replace: true });
        }
      })
  }, [])    
    
  
  async function handleLogin(e) {
    e.preventDefault()

    const isEmailTakenURL = "http://localhost:5000/isEmailTaken"
    const loginURL = "http://localhost:5000/login"
    const registerURL = "http://localhost:5000/register"
        
    const form = e.target
    const user = {
      email: form[0].value,
      password: form[1].value
    }

    const fetchMethod = {
      method: "POST",
      headers: { "Content-type": "application/json"},
      body: JSON.stringify(user)
    }
    
    //All in one login + register
    fetch(isEmailTakenURL, fetchMethod)
    .then(res => res.json())
    .then(
      (data) => {
        if (data.isEmailTaken) {
          fetch(loginURL, fetchMethod)
          .then(res => res.json())
          .then(data => {
            setMessage(data.message)
            if(data.message === "Success") {
              localStorage.setItem("token", data.token)
              navigate("./cloudbox", { replace: true });
            }
          })
        } else {
          fetch(registerURL, fetchMethod)
          .then(res => res.json())
          .then(
            (data) => {
              setMessage(data.message)
              if (data.message === "Success") {
                //login after register
                fetch(loginURL, fetchMethod)
                .then(res => res.json())
                .then(data => {
                  setMessage(data.message)
                  if(data.message === "Success") {
                    localStorage.setItem("token", data.token)
                    navigate("./cloudbox", { replace: true });
                  }
                })
              }
          })
        }
    })
  }

  return (
    <div>
      <form onSubmit={event => handleLogin(event)}>
        <input required type="email" /> 
        <input required type="password" />
        <input type="submit" value="Submit" />
      </form>
        <h1>Message: {message}</h1>
    </div>
  )
}
