import React, { useState, useEffect, useRef } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import TopMenu from "./TopMenu";
import SideMenu from "./SideMenu"
import MenuModal from "./MenuModal";
import Box from "./Box";
import ContextMenu from "./ContextMenu";
import RenameModal from "./RenameModal";
import UploadModal from "./UploadModal";

import "../SCSS/Cloudbox.scss";

import { useApi } from "../hooks/useApi";
import { useMuuri } from "../hooks/useMuuri";

export const UserContext = React.createContext();

export default function CloudBox() {
  const { user, isLoading } = useAuth0();

  const options = {
    method: "GET",
    dummyData: {
      boxArray: [],
      accessArray: [],
      shareArray: [],
    },
  };

  const { loading, token, refresh, data } = useApi("/user", options);

  const { ref } = useMuuri(data);
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

  const [renameModalShow, setRenameModalShow] = useState(false);
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [menuModal, setMenuModal] = useState(false);

  const showMenuModal = () => {
    setMenuModal(true);
  };
  const showRenameModal = () => {
    setRenameModalShow(true);
  };
  const showUploadModal = () => {
    setUploadModalShow(true);
  };

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
      <TopMenu showMenuModal={showMenuModal} />

      <SideMenu />

      <MenuModal
        show={menuModal}
        onHide={() => setMenuModal(false)}
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

      <div className="grid-parent">
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
