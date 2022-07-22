import React, { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom";
import Login from "./Login"
import CloudBox from "./CloudBox"

import './CSS/App.css'

export default function App() {

  
  return (
    <div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cloudbox" element={<CloudBox />} />
      </Routes>
      
    </div>
  )
}
