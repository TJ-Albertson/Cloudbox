import axios from "axios"
import { React, useState, useRef } from "react"
import { Button, Modal, Table, ListGroup, Form, Col, Row, Overlay, Alert } from "react-bootstrap"

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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Access</th>
                <th className="d-flex"><div className=" flex-grow-1">Share</div><Button>Delete</Button></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ListGroup>
                    {props.emailgroups.emailArray.map((email) => 
                      <ListGroup.Item key={email.toString()}>{email}</ListGroup.Item>
                    )}
                  </ListGroup>
                </td>
                <td>
                  <ListGroup>
                    {props.emailgroups.shareArray.map((email) => 
                      <ListGroup.Item key={email.toString()}>{email}</ListGroup.Item>
                    )}
                  </ListGroup>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Form className="flex-fill" onSubmit={event => handleSubmit(event)}>
            <Row>
              <Col className="flex-grow-1">
                <Form.Group>
                  <Form.Control type="email" placeholder="Email to share with" />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Button type="submit">Share</Button>
              </Col>
            </Row>
            {!emailTaken ? null :
            <Row className="ps-3 pt-3 pe-3">
              <Alert variant="warning">User does not exist</Alert>
            </Row>}
            
          </Form>
        </Modal.Footer>
      </Modal>
    );
  } 