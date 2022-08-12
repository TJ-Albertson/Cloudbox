import { React, useState } from "react"
import { Button, Modal, Form, Alert, Stack, InputGroup } from "react-bootstrap"

export default function AddBoxModal(props) {

    const [emailTaken, setEmailTaken] = useState(false);

    async function requestAccess(e) {

    }

    async function addBoxes(e) {

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
                        {props.emailgroups.boxArray.map((email) =>
                            <InputGroup key={email}>
                                <Form.Control type="text" placeholder={email} readOnly />
                                <InputGroup.Checkbox aria-label="Checkbox for following text input"/>
                            </InputGroup>
                        )}

                        <hr className="m-0" />

                        <Stack direction="horizontal">
                            <div className="ms-auto fs-5 pe-2">Add</div>
                            <div className="vr"></div>
                            <Button type="submit" className="ms-2">
                                <i className="bi bi-plus-square"></i>
                            </Button>
                        </Stack>
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