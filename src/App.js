import { React, useState } from "react"
import { Route, Routes } from "react-router-dom";

import Login from "./components/Login"
import CloudBox from "./components/CloudBox"

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


//need profile settings + profile pics in boxes
//ability to enalrge box like modal