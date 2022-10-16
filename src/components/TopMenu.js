import { React, useContext } from "react";
import { Stack, Dropdown, Image } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./CloudBox";

import "../SCSS/TopMenu.scss"

export default function TopMenu(props) {
  const { logout } = useAuth0();
  const signedInUser = useContext(UserContext);

  return (
    <Stack
      className="p-2 border-bottom fixed-top"
      direction="horizontal"
      id="top-menu"
      gap={3}
    >
        
        <p id="logo" className="me-auto">
          <i className="bi bi-box-seam-fill"></i> Cloudbox
        </p>

        <Image roundedCircle src={signedInUser.picture} className="me-3"></Image>
    </Stack>
  );
}
