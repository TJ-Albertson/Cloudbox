import React, { useContext } from "react";
import { Modal, Form, Stack, Button } from "react-bootstrap";

import { UserContext } from "./CloudBox";
import Upload from "./Upload";

export default function RenameModal(props) {
  const signedInUser = useContext(UserContext);

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
          <h4 className="d-flex">
            <i className=""></i> Current Directory: 
            <div className="d-flex">{props.selection ? props.selection.name : null}</div>
          </h4>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Upload directory={props.selection._id}></Upload>
      </Modal.Body>
    </Modal>
  );
}
