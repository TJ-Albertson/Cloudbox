import { React, useContext } from "react";
import { Stack, Dropdown, Form } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./CloudBox";

import sun from "../SVG/sun.svg";
import moon from "../SVG/moon.svg";

export default function TopMenu(props) {
  const { logout } = useAuth0();
  const signedInUser = useContext(UserContext);

  return (
    <Stack
      className="p-3 border-bottom fixed-top bg-light"
      direction="horizontal"
      gap={3}
    >
      <h1>
        <i className="bi bi-box-seam-fill"></i>
      </h1>
      <h1 className="me-auto">CloudBox</h1>

      <img src={sun} alt="sun" />
      <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          style={{ paddingLeft: "2.20em" }}
        />
      </Form>
      <img src={moon} style={{ marginLeft: "-0.75em" }} alt="moon" />

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {signedInUser.username}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => props.showProfileModal(true)}>
            <i className="bi bi-person-circle"></i> Profile
          </Dropdown.Item>
          <Dropdown.Item onClick={() => props.showShareModal(true)}>
            <i className="bi bi-send-plus-fill"></i> Share Settings
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => logout({ returnTo: "http://localhost:3000/" })}
          >
            <i className="bi bi-box-arrow-left"></i> Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  );
}