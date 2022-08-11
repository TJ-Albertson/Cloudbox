import { React, useState } from "react"
import { Button, Modal, Form, Alert, Stack, InputGroup } from "react-bootstrap"
import { axios } from "axios"

export default function ShareMenuModal(props) {

  const [emailTaken, setEmailTaken] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault()

    const url = `http://localhost:5000/${props.emailgroups.ownerEmail}/addEmail`;

    const form = e.target

    axios.post(url, {
      data: form[0].value,
      headers: { 'content-type': 'multipart/form-data' }
    })
      .then(res => {
        if (!res.data.emailExist) {
          setEmailTaken(true)
        }
      })
  }

  async function handleSubmit2(e) {
    e.preventDefault()

  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="pb-1">
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Share Settings</h4>
          <h6 className="text-muted fs-10">These users have access to your files</h6>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={event => handleSubmit2(event)}>
          <Stack className="bord" gap={3} >
            {props.emailgroups.shareArray.map((email) =>
              <InputGroup key={email}>
                <Form.Control type="text" placeholder={email} readOnly />
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              </InputGroup>
            )}

            <hr className="m-0" />

            <Stack direction="horizontal">
              <div className="ms-auto fs-5 pe-2">Delete</div>
              <div className="vr"></div>
              <Button type="submit" className="ms-2">
                <i className="bi bi-trash3"></i>
              </Button>
            </Stack>
          </Stack>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Form className="flex-fill" onSubmit={event => handleSubmit(event)}>
          <Stack direction="horizontal" gap={3}>
            <Form.Control className="me-auto" type="email" placeholder="Email to share with" />
            <Button variant="primary" type="submit">Submit</Button>
          </Stack>
          {!emailTaken ? null :
            <Alert variant="warning" className="mt-3 mb-0">User does not exist</Alert>
          }
        </Form>
      </Modal.Footer>
    </Modal>
  );
} 