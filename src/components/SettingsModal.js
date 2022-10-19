import React, { useContext } from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";

import "../SCSS/SettingsModal.scss"

export default function SettingsModal(props) {
  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered>
        
        <ModalHeader id="settings-modal-header">
            Settings
        </ModalHeader>
        <ModalBody id="settings-modal-body">
            <div id="settings-modal-tabs">
                tabs
            </div>
            <div id="settings-modal-content">
                content
            </div>
        </ModalBody>

    </Modal>
  );
}
