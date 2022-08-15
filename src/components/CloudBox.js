import { React, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap"

import { useGetLogin } from "../hooks/useGetLogin";

import NavBar from "./NavBar"
import Box from "./Box"
import Upload from "./Upload"
import ShareMenuModal from "./ShareMenuModal"
import AddBoxModal from "./AddBoxModal"

import '../CSS/CloudBox.css'

export default function CloudBox(props) {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [emailGroups, setEmailGroups] = useState({ boxArray : [], emailArray: [], shareArray : [] })
  const [modalShow, setModalShow] = useState(false);
  const [boxModalShow, setBoxModalShow] = useState(false);

  const showModal = () => { setModalShow(true) }
  const showBoxModal = () => { setBoxModalShow(true) }

  //const { email, emailGroups } = useGetLogin()

  useEffect(() => {

    fetch("http://localhost:5000/isLoggedIn", {
      headers: { "x-access-token": localStorage.getItem("token")}
    })
    .then(res => res.json())
    .then(
      (data) => {
        if(data.isLoggedIn) {
          setEmail(data.email)
          setEmailGroups(data.emailGroups[0])
        } else {
          navigate("../", { replace: true });
        }
    })  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])  

  return (
    <div>
      
      <NavBar email={email} showModal={showModal}/>

      <ShareMenuModal
        show={modalShow}
        emailgroups={emailGroups}
        onHide={() => setModalShow(false)}
      />

      <AddBoxModal
        show={boxModalShow}
        emailgroups={emailGroups}
        onHide={() => setBoxModalShow(false)}
      />

      <div className='Grid'>  
        {emailGroups.boxArray.map((box) => 
          <Box key={box.toString()} id={box} email={box} userEmail={email}/>
        )}

        <Upload email={email}/>
      </div>

      <Button onClick={showBoxModal} className="position-fixed bottom-0 end-0 m-5">
        <h1>
          <i className="bi bi-plus-circle-fill"></i>
        </h1>
      </Button>
    </div>
  )
}