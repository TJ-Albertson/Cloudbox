import { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { UserContext } from "./CloudBox";

import "../CSS/ProfileModal.css";
import { userData } from "../demo/demoConfig";

export default function ProfileModal(props) {
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const signedInUser = useContext(UserContext);

  const [edit, setEdit] = useState(true);

  const [text, setText] = useState("")

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleSubmit() {
    props.updatebio(text)
  }

  const reverseButton = () => {
    setShowSubmitButton(!showSubmitButton)
  }

  const reverseEdit = () => {
    setEdit(!edit)
  }


  return (
    <Modal
      show={props.show}
      onHide={edit ? props.onHide : null}
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
            <Form.Control as="textarea" rows={3} readOnly={edit} onChange={handleChange} defaultValue={signedInUser.bio}/>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          {showSubmitButton && (
            <Button
              onClick={() => {
                handleSubmit()
                reverseButton()
                reverseEdit()
                props.onHide()
              }}
            >
              Submit
            </Button>
          )}
          <Button
            onClick={() => {
              reverseButton()
              reverseEdit()
            }}
          >
            <i className="bi bi-pencil-square" /> Edit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
