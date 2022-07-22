import React, { useState, useEffect } from "react"

export default function Login() {

    function emailStatus2() {
        fetch("http://localhost:5000/isEmailTaken")
        .then(response => response.json())
        .then(data => console.log(data));
    }

    function emailStatus() {
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
        }

        return (
            <form onSubmit={event => handleLogin(event)}>
              <input required type="email" /> 
              <input required type="password" />
              <input type="submit" value="Submit" />
            </form>
          )
      }

    return (
      <div>
        
        <h1>login {emailStatus()}</h1>
        
      </div>
    )
}