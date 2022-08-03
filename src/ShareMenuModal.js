import React, { useEffect } from "react"
import { Button, Modal, Table, ListGroup } from "react-bootstrap"

export default function ShareMenuModal(props) {

  //need to add get email group arrays in server
  //probably move this up and pass as arrays as props.
  useEffect(() => {
    fetch("http://localhost:5000/isLoggedIn", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(
      (data) => {

      })
  }, [])

    return (
      <Modal
        {...props}
        size="lg"
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
                <th>Share</th>
                <th>Access</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ListGroup>
                    <ListGroup.Item>email1</ListGroup.Item>
                    <ListGroup.Item>email2</ListGroup.Item>
                    <ListGroup.Item>email3</ListGroup.Item>
                    <ListGroup.Item>email4</ListGroup.Item>
                    <ListGroup.Item>email5</ListGroup.Item>
                    <ListGroup.Item>email1</ListGroup.Item>
                    <ListGroup.Item>email2</ListGroup.Item>
                    <ListGroup.Item>email3</ListGroup.Item>
                    <ListGroup.Item>email4</ListGroup.Item>
                    <ListGroup.Item>email5</ListGroup.Item>
                  </ListGroup>
                </td>
                <td>
                  <ListGroup>
                    <ListGroup.Item>email4</ListGroup.Item>
                    <ListGroup.Item>email5</ListGroup.Item>
                    <ListGroup.Item>email3</ListGroup.Item>
                  </ListGroup>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  } 