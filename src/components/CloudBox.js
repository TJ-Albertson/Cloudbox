import { React, useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { useApi } from "../hooks/useApi"
import { useGetEmail } from "../hooks/useGetEmail";
import { useGetEmailGroups } from "../hooks/useGetEmailGroups";
import { useGetLogin } from "../hooks/useGetLogin";

import NavBar from "./NavBar";
import Box from "./Box";
import Upload from "./Upload";
import CheckListModal from "./CheckListModal";

import "../CSS/CloudBox.css";

export default function CloudBox(props) {

  const { user, isAuthenticated, isLoading } = useAuth0();

  const { emailGroups, setEmailGroups, loading } = useApi("http://localhost:5000/getGroup")

  console.log(emailGroups)
  
  const [shareModalShow, setShareModalShow] = useState(false);
  const [boxModalShow, setBoxModalShow] = useState(false);

  const showShareModal = () => {
    setShareModalShow(true);
  };
  const showBoxModal = () => {
    setBoxModalShow(true);
  };

  if (isLoading) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <Spinner animation="border" style={{width: "10em", height: "10em"}} role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <div>
      <NavBar email={user.name} showModal={showShareModal} />
      {/*
      <CheckListModal
        show={boxModalShow}
        onHide={() => setBoxModalShow(false)}
        headerimage="bi bi-box-fill"
        headertext="Add Box"
        headersubtext="These users have granted you access to their files"
        email={user.email}
        emailgroup={emailGroups.accessArray}
        setemailgroups={setEmailGroups}
        buttonimage="bi bi-plus-square"
        buttontext="Add"
        formtext="Request access"
        formimage="bi bi-envelope-plus"
        formfunction="box"
      />

      
      <CheckListModal
        show={shareModalShow}
        onHide={() => setShareModalShow(false)}
        headerimage="bi bi-people-fill"
        headertext="Share Setting"
        headersubtext="These users have access to your files"
        email={user.email}
        emailgroup={emailGroups.shareArray}
        setemailgroups={setEmailGroups}
        buttonimage="bi bi-trash3"
        buttontext="Delete"
        formtext="Email to share with"
        formimage="bi bi-send-plus"
        formfunction="share"
      />
  */}

      <div className="Grid">
        {emailGroups.boxArray.map((box) => (
          <Box
            key={box.toString()}
            s
            id={box}
            email={box}
            userEmail={user.email}
            setemailgroups={setEmailGroups}
          />
        ))}
        <Upload email={user.email} />
      </div>

      <Button
        onClick={showBoxModal}
        className="position-fixed bottom-0 end-0 m-5"
      >
        <h1>
          <i className="bi bi-plus-circle-fill"></i>
        </h1>
      </Button>
    </div>
  );
}
