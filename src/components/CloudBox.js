import { React, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import NavBar from "./NavBar";
import Box from "./Box";
import Upload from "./Upload";
import CheckListModal from "./CheckListModal";

import "../CSS/CloudBox.css";
import "../CSS/TestDrag.css";

import { useApi } from "../hooks/useApi";
import TestDrag from "./TestDrag";



export default function CloudBox() {
  const { user, isLoading } = useAuth0();

  const { loading, token, refresh, data } = useApi(
    "http://localhost:5000/getGroup"
  );

  const [shareModalShow, setShareModalShow] = useState(false);
  const [boxModalShow, setBoxModalShow] = useState(false);

  const showShareModal = () => {
    setShareModalShow(true);
  };
  const showBoxModal = () => {
    setBoxModalShow(true);
  };

  if (isLoading && loading) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <Spinner
          animation="border"
          style={{ width: "10em", height: "10em" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <NavBar email={user.name} showModal={showShareModal} />

      <CheckListModal
        show={boxModalShow}
        onHide={() => setBoxModalShow(false)}
        headerimage="bi bi-box-fill"
        headertext="Add Box"
        headersubtext="These users have granted you access to their files"
        email={user.email}
        emailgroup={data.accessArray}
        refresh={refresh}
        buttonimage="bi bi-plus-square"
        buttontext="Add"
        formtext="Request access"
        formimage="bi bi-envelope-plus"
        formfunction="box"
        token={token}
      />

      <CheckListModal
        show={shareModalShow}
        onHide={() => setShareModalShow(false)}
        headerimage="bi bi-people-fill"
        headertext="Share Setting"
        headersubtext="These users have access to your files"
        email={user.email}
        emailgroup={data.shareArray}
        refresh={refresh}
        buttonimage="bi bi-trash3"
        buttontext="Delete"
        formtext="Email to share with"
        formimage="bi bi-send-plus"
        formfunction="share"
        token={token}
      />

      
      <div className="container Grid">
        {data.boxArray.map((email) => (
          <Box
            key={email.toString()}
            className="draggable"
            draggable="true"
            id={email}
            email={email}
            refresh={refresh}
            token={token}
          />
        ))}
        <Upload email={user.email} refresh={refresh} token={token}/>
      </div>
      
      <TestDrag></TestDrag>

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
