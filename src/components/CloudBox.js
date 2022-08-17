import { React, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

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

  if (isAuthenticated) {
    console.log("email: " + user.email)
    console.log("user: " + user.name)

    fetch('http://localhost/api/private').then(res => res.json())
    .then(data => console.log(data))
  }

   
  const { loggedIn } = useGetLogin(false);
  const { email } = useGetEmail();

  //const { emailGroups, setEmailGroups } = useGetEmailGroups();
  const [emailGroups, setEmailGroups] = useState({
    boxArray: [],
    emailArray: [],
    shareArray: [],
  });
  
  const [shareModalShow, setShareModalShow] = useState(false);
  const [boxModalShow, setBoxModalShow] = useState(false);

  const showShareModal = () => {
    setShareModalShow(true);
  };
  const showBoxModal = () => {
    setBoxModalShow(true);
  };

  return (
    <div>
      <NavBar email={email} showModal={showShareModal} />

      <CheckListModal
        show={boxModalShow}
        onHide={() => setBoxModalShow(false)}
        headerimage="bi bi-box-fill"
        headertext="Add Box"
        headersubtext="These users have granted you access to their files"
        email={email}
        emailgroup={emailGroups.emailArray}
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
        email={email}
        emailgroup={emailGroups.shareArray}
        setemailgroups={setEmailGroups}
        buttonimage="bi bi-trash3"
        buttontext="Delete"
        formtext="Email to share with"
        formimage="bi bi-send-plus"
        formfunction="share"
      />

      <div className="Grid">
        {emailGroups.boxArray.map((box) => (
          <Box
            key={box.toString()}
            s
            id={box}
            email={box}
            userEmail={email}
            setemailgroups={setEmailGroups}
          />
        ))}
        <Upload email={email} />
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
