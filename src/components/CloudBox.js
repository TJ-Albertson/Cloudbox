import React, { useState, useEffect, useRef } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

import TopMenu from "./TopMenu";
import SideMenu from "./SideMenu";
import MenuModal from "./MenuModal";
import Box from "./Box";
import ContextMenu from "./ContextMenu";
import RenameModal from "./RenameModal";
import UploadModal from "./UploadModal";
import CheckListModal from "./CheckListModal";
import List from "./List";

import "../SCSS/Cloudbox.scss";

import { useApi } from "../hooks/useApi";
import { useMuuri } from "../hooks/useMuuri";
import SettingsModal from "./SettingsModal";

import { boxModalOptions, shareModalOptions } from "../utilities/variables";

export const UserContext = React.createContext();

export default function CloudBox() {
  const { user, isLoading } = useAuth0();
  
  const [settingsModal, setSettingsModal] = useState(false);
  const [renameModalShow, setRenameModalShow] = useState(false);
  const [uploadModalShow, setUploadModalShow] = useState(false);

  const showSettingsModal = () => {
    setSettingsModal(true);
  };

  const [boxModal, setBoxModal] = useState(false);

  const showBoxModal = () => {
    setBoxModal(true);
  };

  const showRenameModal = () => {
    setRenameModalShow(true);
  };
  const showUploadModal = () => {
    setUploadModalShow(true);
  };

  const [location, setLocation] = useState({
    id: 0,
    name: "My Boxes",
    icon: "bi bi-boxes",
  });

  const updateLocation = (id, name, icon) => {
    let location = { id, name, icon };
    setLocation(location);
  };

  return (
    <UserContext.Provider
      value={{
        username: user.username,
        email: user.email,
        picture: user.picture,
      }}
    >
      <TopMenu location={location} showSettingsModal={showSettingsModal} />

      <SideMenu updateLocation={updateLocation} showBoxModal={showBoxModal} />

      <CheckListModal
        show={boxModal}
        onHide={() => setBoxModal(false)}
        {...boxModalOptions}
      />

      <SettingsModal
        show={settingsModal}
        onHide={() => setSettingsModal(false)}
      />

      <RenameModal
        show={renameModalShow}
        onHide={() => setRenameModalShow(false)}
      />

      <UploadModal
        show={uploadModalShow}
        onHide={() => setUploadModalShow(false)}
      />

      <Outlet/>

    </UserContext.Provider>
  );
}
