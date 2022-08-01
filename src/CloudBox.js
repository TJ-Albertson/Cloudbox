import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar"
import BoxCase from "./BoxCase"
import Box from "./Box"
import Upload from "./Upload"

import './CSS/App.css'
import './CSS/CloudBox.css'

export default function CloudBox(props) {

  const navigate = useNavigate()
  const [boxes, setBoxes] = useState([1])

  const [emailGroup, setEmailGroup] = useState([])
  const [email, setEmail] = useState("")

  //ill have array of emails, make a box for each email, and pass email to each box as prop, ause each email for file location

  //Auto navigate
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
          setEmailGroup(data.emailsForBoxes[0].emailArray)
          console.log(data.emailsForBoxes)
    
        } else {
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
        <NavBar email={email} addBox={addBox} removeBox={removeBox}/>
      </div>

      <div className='Grid'>
            {emailGroup.map((box) => 
                <Box key={box.toString()} id={box} email={email} />
            )}

            <Upload email={email}/>
      </div>

    </div>
  )
}