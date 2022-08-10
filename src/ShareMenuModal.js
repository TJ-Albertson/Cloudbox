import axios from "axios"
import { React, useState, useRef } from "react"
import { Button, Modal, Table, ListGroup, Form, Col, Row, Overlay, Alert, Stack, InputGroup, Container } from "react-bootstrap"

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
        <Container fluid>
          <Row>
            <Col className="border">
              <Stack>
              <div>Access</div>
              {props.emailgroups.emailArray.map((email) => 
                <InputGroup className="mb-3" key={email}>
                  <Form.Control type="text" placeholder={email} readOnly />
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                </InputGroup>
              )}
              </Stack>
            </Col>
            <Col className="border">
              <Stack>
              <div>Share</div>
              {props.emailgroups.shareArray.map((email) => 
                <InputGroup className="mb-3" key={email}>
                  <Form.Control type="text" placeholder={email} readOnly />
                  <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                </InputGroup>
              )}
              </Stack>
            </Col>
          </Row>
        </Container>
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