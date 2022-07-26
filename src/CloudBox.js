import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar"
import BoxCase from "./BoxCase"

import './CSS/App.css'

export default function CloudBox(props) {

  const navigate = useNavigate()
  const [boxes, setBoxes] = useState([1])

  const [emailArray, setEmailArray] = useState({})
  //ill have array of emails, make a box for each email, and pass email to each box as prop, ause each email for file location

  //Auto navigate if NOT logged in
  useEffect(() => {
    fetch("http://localhost:5000/isLoggedIn", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(
      (data) => {
        if(!data.isLoggedIn) {
          navigate("../", { replace: true });
        }
      })
  }, [])  

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
   
  return (
    <div>
      <div className='NavBar'>
        <NavBar email={props.email} addBox={addBox} removeBox={removeBox}/>
      </div>
    
      <BoxCase boxes={boxes} />

    </div>
  )
}