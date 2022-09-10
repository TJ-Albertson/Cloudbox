import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function ProfileModal(props) {
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="pb-1">
        <Modal.Title id="contained-modal-title-vcenter">
          <img
            style={{ width: "48px", height: "48px", borderRadius: "50%" }}
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          ></img>
          <h3>username</h3>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        bio:
        <textarea></textarea>
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
