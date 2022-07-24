import React, { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom";
import Login from "./Login"
import CloudBox from "./CloudBox"

import './CSS/App.css'

export default function App() {

  const [email, setEmail] = useState("")

  const addEmail = (data) => {
    console.log(data)
    setEmail(data)
  }

  return (
    <div>

      <Routes>
        <Route path="/" element={<Login addEmail={addEmail}/>} />
        <Route path="/cloudbox" element={<CloudBox email={email}/>} />
      </Routes>
      
    </div>
  )
}
