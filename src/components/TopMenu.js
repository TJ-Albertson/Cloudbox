import { React, useContext } from "react";
import {
  Stack,
  Image,
  OverlayTrigger,
  Popover,
  Button,
  Dropdown,
} from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./CloudBox";

import "../SCSS/TopMenu.scss";

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
      <p id="logo" >
        <i className="bi bi-box-seam-fill"></i> Cloudbox
      </p>
      <div class="vr"></div>
      <p className="me-auto mb-0 fs-3"><i className={props.location.icon}></i> {props.location.name}</p>

      <i className="bi bi-question-circle"></i>
      <i className="bi bi-gear"></i>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
          <Popover id="popover-positioned-botttom">
            <Popover.Body>
              <div id="user-popover">
                <Image
                  roundedCircle
                  src={
                    signedInUser.picture
                      ? signedInUser.picture
                      : "/download.png"
                  }
                ></Image>
                <p>{signedInUser.username}</p>
                <p>{signedInUser.email}</p>
      
                <Button id="sign-out"
                  onClick={() => logout({ returnTo: "http://localhost:3000/" })}
                >
                  Sign Out
                </Button>
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <Image
          roundedCircle
          src={signedInUser.picture ? signedInUser.picture : "/download.png"}
          className="me-3"
        ></Image>
      </OverlayTrigger>
    </Stack>
  );
}
