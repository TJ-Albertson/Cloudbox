import React, { useContext } from "react";
import { Modal, Form, Stack, Button } from "react-bootstrap";

import { fetchApi } from "../api/fetchApi";
import { UserContext } from "./CloudBox";


export default function RenameModal(props) {
    const signedInUser = useContext(UserContext);
    
  async function renameFile(e) {
    e.preventDefault();
    const form = e.target;
    const newName = form[0].value;

    console.log(form[0].value)

    const { id } = props.selection;

    const options = {
      method: "PATCH",
      body: JSON.stringify({ id, newName }),
      token: signedInUser.token,
      headers: { "Content-Type": "application/json" },
    };

    await fetchApi("/files", options).then(props.refreshFiles).then(props.onHide)
  }

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
          <h4>
            <i className=""></i> Rename File
          </h4>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>File : {props.selection.name}</Modal.Body>

      <Modal.Footer>
        <Form className="flex-fill" onSubmit={(e) => renameFile(e)}>
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              className="me-auto"
              type="text"
              placeholder={props.selection.name}
            />
            <Button variant="primary" type="submit">
              <i className=""></i> Rename
            </Button>
          </Stack>
        </Form>
      </Modal.Footer>
    </Modal>
  );
}
