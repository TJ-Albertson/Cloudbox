import { React, useEffect, useState } from "react";
import { Button, Modal, Form, Alert, Stack } from "react-bootstrap";
import axios from "axios";
import { usePostList } from "../hooks/usePostList";
import { useAuth0 } from "@auth0/auth0-react";

export default function CheckListModal(props) {

  const [emailTaken, setEmailTaken] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const [token, setToken] = useState(null)

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessTokenSilently({ audience: 'http://localhost:5000' });
      setToken(accessToken)
      console.log(accessToken)
    })();
  }, []);

  async function addEmail(e) {
    e.preventDefault();

    const url = `http://localhost:5000/addShareEmail`;
    const form = e.target;

    await fetch(url, {
        data: form[0].value,
        headers: { "content-type": "multipart/form-data" },
        Authorization : `Bearer ${token}`
      })
      .then(res => res.json())
      .then((res) => {
        if (!res.data.emailExist) {
          setEmailTaken(true);
        }
        props.setemailgroups(res.data[0]);
      });
  }

  //adding boxes and removing share emails
  async function postList(e, route) {
    
    e.preventDefault();
    const form = e.target;
    const url = `http://localhost:5000/${props.email}${route}`;
    const emails = [];

    

    for (var i = 0; i < props.emailgroup.length; i++) {
      if (form[i].checked) {
        emails.push(form[i].id);
      }
    }

    axios
      .post(url, { 
        data: emails,
        Authorization : `Bearer ${token}`,  
      })
      .then((res) => props.setemailgroups(res.data[0]));
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
              : (event) => addEmail(event)
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
