import { React, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap"

import { useGetLogin } from "../hooks/useGetLogin";
import { useGetEmailGroups } from "../hooks/useGetEmailGroups";

import NavBar from "./NavBar"
import Box from "./Box"
import Upload from "./Upload"
import ShareMenuModal from "./ShareMenuModal"
import AddBoxModal from "./AddBoxModal"

import '../CSS/CloudBox.css'

export default function CloudBox(props) {

  const navigate = useNavigate()

  const email = useGetLogin()
  const emailGroups = useGetEmailGroups()

  //onclick in modal => post group update => get group update to stat

  //const [emailGroups, setEmailGroups] = useState({ boxArray : [], emailArray: [], shareArray : [] })
  const [modalShow, setModalShow] = useState(false);
  const [boxModalShow, setBoxModalShow] = useState(false);

  const showModal = () => { setModalShow(true) }
  const showBoxModal = () => { setBoxModalShow(true) }

  //pass to box, shareModal, boxModal

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
          <Box 
            key={box.toString()} 
            id={box} email={box} 
            userEmail={email} 
            
          />
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


