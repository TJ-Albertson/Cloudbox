import { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { UserContext } from "./CloudBox";

import "../CSS/ProfileModal.css";
import { userData } from "../demo/demoConfig";

export default function ProfileModal(props) {
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const signedInUser = useContext(UserContext);

  const [edit, setEdit] = useState(true);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="pb-3">
        {
          <img
            style={{ width: "48px", height: "48px", borderRadius: "50%" }}
            src={signedInUser.picture}
          ></img>
        }
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>&nbsp;&nbsp;{signedInUser.username}</h3>
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Bio:</Form.Label>
            <Form.Control as="textarea" rows={3} readOnly={edit} />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          {showSubmitButton && (
            <Button
              onClick={() => {
                setShowSubmitButton(false);
              }}
            >
              Submit
            </Button>
          )}
          <Button
            onClick={() => {
              setShowSubmitButton(true);
              setEdit(false);
            }}
          >
            <i className="bi bi-pencil-square" /> Edit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
