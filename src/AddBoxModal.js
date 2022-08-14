import { React, useState } from "react"
import { Button, Modal, Form, Alert, Stack, InputGroup } from "react-bootstrap"
import axios from "axios"

export default function AddBoxModal(props) {

    const [emailTaken, setEmailTaken] = useState(false);

    async function requestAccess(e) {
        //will require notification/email function
    }

    async function addBoxes(e) {
        e.preventDefault()
        const form = e.target
        const url = `http://localhost:5000/${props.emailgroups.ownerEmail}/addBoxes`;
        const emails = []
       
        for(var i = 0; i < props.emailgroups.emailArray.length; i++) {
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
                    <h4><i className="bi bi-box-fill"></i> Add Box</h4>
                    <h6 className="text-muted fs-10">These users have granted you access to their files</h6>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={event => addBoxes(event)}>
                    <Stack gap={3} >
                        {props.emailgroups.emailArray.map((email) =>
                            <Form.Check key={email} type="checkbox" label={email} id={email}/>
                        )}
                        
                        {(props.emailgroups.emailArray.length > 0)
                            ?   <div>
                                    <hr className="" />
                                    <Stack direction="horizontal">
                                        <Button type="submit" className="me-2">
                                        <i className="bi bi-plus-square"></i>
                                        </Button>
                                        <div className="me-auto fs-5">Add</div>
                                    </Stack>
                                </div>
                            : <h6 className="text-muted fs-10">No users</h6>
                        }
                    </Stack>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Form className="flex-fill" onSubmit={event => requestAccess(event)}>
                    <Stack direction="horizontal" gap={3}>
                        <Form.Control className="me-auto" type="email" placeholder="Request access" />
                        <Button variant="primary" type="submit">
                            <i className="bi bi-envelope-plus"></i>
                        </Button>
                    </Stack>
                    {!emailTaken ? null :
                        <Alert variant="warning" className="mt-3 mb-0">User does not exist</Alert>
                    }
                </Form>
            </Modal.Footer>
        </Modal>
    );
} 