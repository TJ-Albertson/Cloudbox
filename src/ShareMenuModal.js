import axios from "axios"
import { React, useState } from "react"
import { Button, Modal, Form, Alert, Stack, InputGroup } from "react-bootstrap"

export default function ShareMenuModal(props) {

  const [emailTaken, setEmailTaken] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault()

    const url = `http://localhost:5000/${props.emailgroups.ownerEmail}/addEmail`;

    const form = e.target

    axios.post(url, { 
      data: form[0].value,
      headers: {'content-type' : 'multipart/form-data'}
    })
    .then(res => {
      if(!res.data.emailExist) {
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
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Share Settings
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={event => handleSubmit2(event)}>
            <Stack className="border p-3" gap={3} >
              <Stack direction="horizontal">
                <div className="me-auto fs-5">Email</div>
                <Button type="submit">
                  <i className="bi bi-trash3"></i>
                </Button>
              </Stack>

              <hr className="m-0"/>
              
              {props.emailgroups.shareArray.map((email) => 
                <InputGroup key={email}>
                  <Form.Control type="text" placeholder={email} readOnly />
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                </InputGroup>
              )}
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