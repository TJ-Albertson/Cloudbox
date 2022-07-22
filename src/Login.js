import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:5000/isLoggedIn", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => data.isLoggedIn ? setEmail(data.email) : null)

    navigate("./cloudbox", { replace: true });
  }, [])    

    

    //All in one login + register
    async function handleLogin(e) {
      e.preventDefault()
    
        const form = e.target
        const user = {
          email: form[0].value,
          password: form[1].value
        }
          
        fetch("http://localhost:5000/isEmailTaken", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(user)
        })
        .then(res => res.json())
        //.then(data => console.log(data.message))
        .then(data => setEmail(data.message))

        if (email) {
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
        } else {
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

    return (
      <div>
            <form onSubmit={event => handleLogin(event)}>
              Login
              <input required type="email" /> 
              <input required type="password" />
              <input type="submit" value="Submit" />
            </form>

            
      </div>
    )
  }
