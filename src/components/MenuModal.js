import { useState, useContext } from "react";

import "../SCSS/MenuModal.scss";

import { Modal, Tab, Tabs } from "react-bootstrap";
import { UserContext } from "./CloudBox";

import Profile from "./ProfileTab";
import CheckListModal from "./CheckList";



import { boxModalOptions, shareModalOptions } from "../utilities/variables";

export default function MenuModal(props) {
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const signedInUser = useContext(UserContext);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      centered
      dialogClassName="menu-modal"
    >
      <Tabs defaultActiveKey="profile" className="mb-3" id="settings" fill>
        <Tab
          eventKey="profile"
          title={
            <span>
              <i className="bi bi-person-circle"></i> Profile
            </span>
          }
        >
          <Profile />
        </Tab>
        <Tab
          eventKey="boxes"
          title={
            <span>
              <i className="bi bi-box2-fill"></i> Boxes
            </span>
          }
        >
          <CheckListModal 
            {...boxModalOptions}
            emailgroup={props.accessArray}
            refresh={props.refresh}
          />
        </Tab>
        <Tab
          eventKey="sharing"
          title={
            <span>
              <i className="bi bi-share-fill"></i> Sharing
            </span>
          }
        >
          <CheckListModal 
            {...shareModalOptions}
            emailgroup={props.shareArray}
            refresh={props.refresh}
          />
        </Tab>
        <Tab
          eventKey="view"
          title={
            <span>
              <i className="bi bi-sliders2"></i> View
            </span>
          }
        >
          view
        </Tab>
      </Tabs>
    </Modal>
  );
}
