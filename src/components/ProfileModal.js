import { Modal } from "react-bootstrap"

export default function ProfileModal(props) {
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
            title
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        body
      </Modal.Body>

      <Modal.Footer>
        footer
      </Modal.Footer>
    </Modal>
  );
}
