import { React, useContext } from "react";
import { Button, Stack, Dropdown } from "react-bootstrap";
import { UserContext } from "./CloudBox";

import "../SCSS/SideMenu.scss";
import { Link } from "react-router-dom";

export default function TopMenu(props) {
  const signedInUser = useContext(UserContext);

  const setLocation = (id, name, icon) => {
    props.updateLocation(id, name, icon);
  };

  return (
    <Stack className="p-2" id="side-menu">
      <Dropdown id="dropdown">
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          <i className="bi bi-plus-square"></i> New
        </Dropdown.Toggle>

        <Dropdown.Menu id="dropdown-menu">
          <Dropdown.Item href="#/action-1">
            <i className="bi bi-file-earmark-plus"></i> Upload File
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => props.showBoxModal(true)}>
            <i className="bi bi-box-seam"></i> New Box
          </Dropdown.Item>
          <Dropdown.Item href="#/action-3">
            <i className="bi bi-folder-plus"></i> New Folder
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Link className="side-menu-item" to="my-boxes">
        <i className="bi bi-boxes" id="boxes-icon"></i>
        <p> My Boxes</p>
      </Link>
      <Link className="side-menu-item" to="recent">
        <i className="bi bi-alarm" id="recent-icon"></i>
        <p> Recent</p>
      </Link>
      <Link className="side-menu-item" to="starred">
        <i className="bi bi-star" id="starred-icon"></i>
        <p> Starred</p>
      </Link>
      <Link className="side-menu-item" to="trash">
        <i className="bi bi-trash" id="trash-icon"></i>
        <p> Trash</p>
      </Link>
      <hr />

      <Link className="side-menu-item" to="storage">
        <i className="bi bi-cloud"></i>
        <p> Storage</p>
      </Link>
    </Stack>
  );
}
