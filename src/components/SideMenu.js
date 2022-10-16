import { React, useContext } from "react";
import { Button, Stack, Dropdown } from "react-bootstrap";
import { UserContext } from "./CloudBox";

import "../SCSS/SideMenu.scss";

export default function TopMenu(props) {
  const signedInUser = useContext(UserContext);

  const setLocation = (id, name, icon) => {
    props.updateLocation(id, name, icon)
  }

  return (
    <Stack className="p-2" id="side-menu">

      <Dropdown
      id="dropdown"
      >
      
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
      <i className="bi bi-plus-square"></i> New
      </Dropdown.Toggle>

      <Dropdown.Menu id="dropdown-menu">
        <Dropdown.Item href="#/action-1"><i className="bi bi-file-earmark-plus"></i> Upload File</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#/action-2"><i className="bi bi-box-seam"></i> New Box</Dropdown.Item>
        <Dropdown.Item href="#/action-3"><i className="bi bi-folder-plus"></i> New Folder</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>

      <div className="side-menu-item" onClick={() => setLocation(0, "My Boxes", "bi bi-boxes")}>
        <i className="bi bi-boxes"></i>
        <p> My Boxes</p>
      </div>
      <div className="side-menu-item" onClick={() => setLocation(1, "Recent", "bi bi-alarm")}>
        <i className="bi bi-alarm"></i>
        <p> Recent</p>
      </div>
      <div className="side-menu-item" onClick={() => setLocation(2, "Starred", "bi bi-star")}>
        <i className="bi bi-star"></i>
        <p> Starred</p>
      </div>
      <div className="side-menu-item" onClick={() => setLocation(3, "Trash", "bi bi-trash")}>
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
