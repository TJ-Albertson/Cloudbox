import React, { useContext } from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";

export default function SettingsModal(props) {
  return (
    <Modal show={props.show} onHide={props.onHide} size="md" centered>
        
        <ModalHeader>
            Settings
        </ModalHeader>
        <ModalBody>
            <div>
                tabs
            </div>
            <div>
                content
            </div>
        </ModalBody>

    </Modal>
  );
}
