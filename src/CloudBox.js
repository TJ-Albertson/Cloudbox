import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import NavBar from "./NavBar"
import Box from "./Box"
import Upload from "./Upload"

import './CSS/App.css'
import './CSS/CloudBox.css'

export default function CloudBox(props) {

  const navigate = useNavigate()

  const [emailGroup, setEmailGroup] = useState([])
  const [email, setEmail] = useState("")

  //data fetch + auto logout
  useEffect(() => {
    fetch("http://localhost:5000/isLoggedIn", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(
      (data) => {
        if(data.isLoggedIn) {
          setEmail(data.email)
          setEmailGroup(data.emailGroups[0].boxArray)
        } else {
          navigate("../", { replace: true });
        }
      })
  }, [])  
   
  return (
    <div>
      <div className='NavBar'>
        <NavBar email={email}   />
      </div>

      <div className='Grid'>
        {emailGroup.map((box) => 
          <Box key={box.toString()} id={box} email={box} />
        )}

        <Upload email={email}/>
      </div>
    </div>
  )
}