import { React, useContext } from "react";
import { Stack } from "react-bootstrap";
import { UserContext } from "./CloudBox";

import "../SCSS/SideMenu.scss"

export default function TopMenu(props) {

  const signedInUser = useContext(UserContext);

  return (
    <Stack
      className="p-2"
      id="side-menu"
    >
        <p><i className="bi bi-boxes"></i> My Boxes</p>
        <p><i className="bi bi-alarm"></i> Recent</p>
        <p><i className="bi bi-star"></i> Starred</p>
        <p><i className="bi bi-trash"></i> Trash</p>
        <hr/>
        <p><i className="bi bi-cloud"></i> Storage</p>
    </Stack>
  );
}
