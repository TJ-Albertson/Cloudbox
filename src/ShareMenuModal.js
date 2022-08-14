import { React, useState } from "react"
import { Button, Modal, Form, Alert, Stack, InputGroup } from "react-bootstrap"
import axios from "axios"

export default function ShareMenuModal(props) {

  const [emailTaken, setEmailTaken] = useState(false);

  async function addEmail(e) {
    e.preventDefault()

    const url = `http://localhost:5000/${props.emailgroups.ownerEmail}/addShareEmail`;
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

  async function removeEmail(e) {
    e.preventDefault()
    const form = e.target
    const url = `http://localhost:5000/${props.emailgroups.ownerEmail}/removeShareEmails`;
    const emails = []
   
    for(var i = 0; i < props.emailgroups.shareArray.length; i++) {
      if (form[i].checked) {
        emails.push(form[i].id)
      }
    }

    console.log(emails)
 
    const request = await axios.post(url, {
      data: emails
    })
    .then(req => console.log(req))

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
          <h4><i className="bi bi-people-fill"></i> Share Settings</h4>
          <h6 className="text-muted fs-10">These users have access to your files</h6>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={event => removeEmail(event)}>
          <Stack className="bord" gap={3} >
            {props.emailgroups.shareArray.map((email) =>
              <Form.Check key={email} type="checkbox" label={email} id={email}/>
            )}
            
            {(props.emailgroups.shareArray.length > 0)
              ?  <div>
                    <hr className="" />
                    <Stack direction="horizontal">
                      <Button type="submit" className="me-2">
                      <i className="bi bi-trash3"></i>
                      </Button>
                      <div className="me-auto fs-5">Delete</div>             
                    </Stack>
                  </div>
              : <h6 className="text-muted fs-10">No users</h6>
            }            
          </Stack>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Form className="flex-fill" onSubmit={event => addEmail(event)}>
          <Stack direction="horizontal" gap={3}>
            <Form.Control className="me-auto" type="email" placeholder="Email to share with" />
            <Button variant="primary" type="submit"><i className="bi bi-send-plus"></i></Button>
          </Stack>
          {!emailTaken ? null :
            <Alert variant="warning" className="mt-3 mb-0">User does not exist</Alert>
          }
        </Form>
      </Modal.Footer>
    </Modal>
  );
} 