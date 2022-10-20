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

  const { path } = useLocation();

  const options = {
    method: "GET",
    dummyData: {
      boxArray: [],
      accessArray: [],
      shareArray: [],
    },
  };

  const { loading, token, refresh, data } = useApi("/user", options);

  const fileRefreshRef = useRef(null);

  const refreshFiles = () => {
    fileRefreshRef.current.refresh();
  };

  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [selection, setSelection] = useState({});
  const [showContextMenu, setShowContextMenu] = useState(false);

  const [location, setLocation] = useState({
    id: 0,
    name: "My Boxes",
    icon: "bi bi-boxes",
  });

  const [settingsModal, setSettingsModal] = useState(false);

  //const { ref } = useMuuri(data, location);

  const updateLocation = (id, name, icon) => {
    let location = { id, name, icon };
    setLocation(location);
  };

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

  /*

  function Boxes() {
    return (
      <div className="grid-parent" key="1">
        <div className="grid" ref={ref}>
          {data.boxArray.map((boxEmail, i) => (
            <div className="item" key={i}>
              <div className="item-content">
                {boxEmail == data.email ? (
                  <Box
                    ref={fileRefreshRef}
                    boxEmail={boxEmail}
                    refresh={refresh}
                    setPoints={setPoints}
                    setSelection={setSelection}
                    setShowContextMenu={setShowContextMenu}
                    owner={true}
                    showUploadModal={showUploadModal}
                  />
                ) : (
                  <Box
                    boxEmail={boxEmail}
                    refresh={refresh}
                    setPoints={setPoints}
                    setSelection={setSelection}
                    setShowContextMenu={setShowContextMenu}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  */

  function WindowController() {
    if (location.id === 0) {
    }
    if (location.id === 1) {
      return <List recent key="2"></List>;
    }
    if (location.id === 2) {
      return <List starred key="3"></List>;
    }
    if (location.id === 3) {
      return <List trash key="4"></List>;
    }
  }

  if (isLoading && loading) {
    return;
  }

  return (
    <UserContext.Provider
      value={{
        username: data.username,
        email: data.email,
        token: token,
        picture: data.picture,
      }}
    >
      <TopMenu location={location} showSettingsModal={showSettingsModal} />

      <SideMenu updateLocation={updateLocation} showBoxModal={showBoxModal} />

      <CheckListModal
        show={boxModal}
        onHide={() => setBoxModal(false)}
        {...boxModalOptions}
        emailgroup={data.accessArray}
        refresh={refresh}
      />

      <SettingsModal
        show={settingsModal}
        onHide={() => setSettingsModal(false)}
        accessArray={data.accessArray}
        shareArray={data.shareArray}
        refresh={refresh}
      />

      <RenameModal
        show={renameModalShow}
        onHide={() => setRenameModalShow(false)}
        selection={selection}
        refreshFiles={refreshFiles}
      />

      <UploadModal
        show={uploadModalShow}
        onHide={() => setUploadModalShow(false)}
        selection={selection}
        refreshFiles={refreshFiles}
      />

      <Outlet
        setPoints={setPoints}
        setSelection={setSelection}
        setShowContextMenu={setShowContextMenu}
        showUploadModal={showUploadModal}
      />

      {showContextMenu && (
        <ContextMenu
          style={{ listStyle: "none" }}
          points={points}
          selection={selection}
          refreshFiles={refreshFiles}
          showRenameModal={showRenameModal}
        />
      )}
    </UserContext.Provider>
  );
}
