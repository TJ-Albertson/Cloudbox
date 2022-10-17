import { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "./CloudBox";

import "../CSS/ProfileModal.css"

export default function ProfileModal(props) {
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const signedInUser = useContext(UserContext);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="pb-3">
          {<img
            style={{ width: "48px", height: "48px", borderRadius: "50%" }}
            src={signedInUser.picture}
          ></img>}
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>&nbsp;&nbsp;{signedInUser.username}</h3>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h5>bio:</h5>
        <textarea className="bio"></textarea>
      </Modal.Body>

      <Modal.Footer>
        {showSubmitButton && (
          <Button onClick={() => setShowSubmitButton(false)}>Submit</Button>
        )}
        <Button onClick={() => setShowSubmitButton(true)}>
          <i className="bi bi-pencil-square" /> Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
