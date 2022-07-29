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

  const [emailGroup, setEmailGroup] = useState({})
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
          setEmailGroup(data.emailGroup)
          console.log(data.emailGroup)
    
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
            <Box id={57} email={email} image='https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Solid_red.svg/512px-Solid_red.svg.png'/>

            {boxes.map((box) => 
                <Box key={box.toString()} id={box} email={email} image='https://content.fortune.com/wp-content/uploads/2019/04/brb05.19.plus_.jpg'/>
            )}

            <Upload email={email}/>
      </div>

    </div>
  )
}