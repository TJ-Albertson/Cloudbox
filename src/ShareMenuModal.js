import { React } from "react"
import { Button, Modal, Table, ListGroup, Form, Col, Row } from "react-bootstrap"

export default function ShareMenuModal(props) {

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
                <th>Share</th>
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
          <Form className="flex-fill">
            <Row>
              <Col xl="9">
                <Form.Group>
                  <Form.Control type="email" placeholder="Email to share" />
                </Form.Group>
              </Col>
              <Col xl="1">
                <Button type="submit">Share</Button>
              </Col>
            </Row>
          </Form>
        </Modal.Footer>
      </Modal>
    );
  } 