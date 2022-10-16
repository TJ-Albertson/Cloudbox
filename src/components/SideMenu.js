import { React, useContext } from "react";
import { Button, Stack } from "react-bootstrap";
import { UserContext } from "./CloudBox";

import "../SCSS/SideMenu.scss";

export default function TopMenu(props) {
  const signedInUser = useContext(UserContext);

  return (
    <Stack className="p-2" id="side-menu">

      <Button><i className="bi bi-plus-square"></i> New Item</Button>

      <div className="side-menu-item">
        <i className="bi bi-boxes"></i>
        <p> My Boxes</p>
      </div>
      <div className="side-menu-item">
        <i className="bi bi-alarm"></i>
        <p> Recent</p>
      </div>
      <div className="side-menu-item">
        <i className="bi bi-star"></i>
        <p> Starred</p>
      </div>
      <div className="side-menu-item">
        <i className="bi bi-trash"></i>
        <p> Trash</p>
      </div>
      <hr />

      <div className="side-menu-item">
        <i className="bi bi-cloud"></i>
        <p> Storage</p>
      </div>
    </Stack>
  );
}
