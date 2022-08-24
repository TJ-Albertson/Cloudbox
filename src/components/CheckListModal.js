import { React, useState, useContext } from "react";
import { Button, Modal, Form, Alert, Stack } from "react-bootstrap";

import { postApi } from "../api/postApi";

export default function CheckListModal(props) {
  const [emailTaken, setEmailTaken] = useState(false);

  async function shareEmail(e) {
    e.preventDefault();
    const form = e.target;

    const data = new URLSearchParams({
      shareEmail: form[0].value,
    });

    postApi(
      "/addShareEmail",
      data,
      props.token,
      "application/x-www-form-urlencoded"
    ).then(props.refresh);
  }

  //for adding boxes and removing share emails
  async function postList(e, route) {
    e.preventDefault();
    const form = e.target;
    const emails = [];

    for (var i = 0; i < props.emailgroup.length; i++) {
      if (form[i].checked) {
        emails.push(form[i].id);
      }
    }

    postApi(route, JSON.stringify(emails), props.token, {
      "Content-Type": "application/json",
    }).then(props.refresh);
  }

  async function requestAccess(e) {
    //will require notification/email
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="pb-1">
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>
            <i className={props.headerimage}></i> {props.headertext}
          </h4>
          <h6 className="text-muted fs-10">{props.headersubtext}</h6>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          onSubmit={
            props.formfunction === "box"
              ? (event) => postList(event, "/addBox")
              : (event) => postList(event, "/removeShareEmail")
          }
        >
          <Stack gap={3}>
            {props.emailgroup.map((email) => (
              <Form.Check
                key={email}
                type="checkbox"
                label={email}
                id={email}
              />
            ))}

            {props.emailgroup.length > 0 ? (
              <div>
                <hr className="" />
                <Stack direction="horizontal">
                  <Button type="submit" className="me-2">
                    <i className={props.buttonimage}></i>
                  </Button>
                  <div className="me-auto fs-5">{props.buttontext}</div>
                </Stack>
              </div>
            ) : (
              <h6 className="text-muted fs-10">No users</h6>
            )}
          </Stack>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Form
          className="flex-fill"
          onSubmit={
            props.formfunction === "box"
              ? (event) => requestAccess(event)
              : (event) => shareEmail(event)
          }
        >
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              className="me-auto"
              type="email"
              placeholder={props.formtext}
            />
            <Button variant="primary" type="submit">
              <i className={props.formimage}></i>
            </Button>
          </Stack>
          {!emailTaken ? null : (
            <Alert variant="warning" className="mt-3 mb-0">
              User does not exist
            </Alert>
          )}
        </Form>
      </Modal.Footer>
    </Modal>
  );
}
