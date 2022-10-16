import React, { useContext } from "react";
import { Modal, Form, Stack, Button, ModalHeader } from "react-bootstrap";

import { fetchApi } from "../api/fetchApi";
import { UserContext } from "./CloudBox";

export default function RenameModal(props) {
  const signedInUser = useContext(UserContext);

  async function renameFile(e) {
    e.preventDefault();
    const form = e.target;
    const newName = form[0].value;

    console.log(form[0].value);

    const { id } = props.selection;

    const options = {
      method: "PATCH",
      body: JSON.stringify({ id, newName }),
      token: signedInUser.token,
      headers: { "Content-Type": "application/json" },
    };

    await fetchApi("/files", options)
      .then(props.refreshFiles)
      .then(props.onHide);
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader closeButton>
        <h4 className="m-0">
          <i className="bi bi-pencil-square fs-4"></i> Rename
        </h4>
      </ModalHeader>
      <Modal.Body>
        <Stack>
          <Form className="flex-fill" onSubmit={(e) => renameFile(e)}>
            <Stack direction="horizontal" gap={3}>
              <Form.Control
                className="me-auto"
                type="text"
                placeholder={props.selection.name}
              />
              <Button variant="primary" type="submit">
                OK
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
