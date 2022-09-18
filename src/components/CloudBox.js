import React, { useState, useEffect, useRef } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import TopMenu from "./TopMenu";
import Box from "./Box";
import CheckListModal from "./CheckListModal";
import ContextMenu from "./ContextMenu";
import RenameModal from "./RenameModal";
import UploadModal from "./UploadModal"

import "../CSS/Cloudbox.css";

import { boxModalOptions, shareModalOptions } from "../utilities/variables";
import { useApi } from "../hooks/useApi";
import { useMuuri } from "../hooks/useMuuri";
import ProfileModal from "./ProfileModal";

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

  const [shareModalShow, setShareModalShow] = useState(false);
  const [boxModalShow, setBoxModalShow] = useState(false);
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [renameModalShow, setRenameModalShow] = useState(false);
  const [uploadModalShow, setUploadModalShow] = useState(false);

  const showShareModal = () => {
    setShareModalShow(true);
  };
  const showBoxModal = () => {
    setBoxModalShow(true);
  };
  const showProfileModal = () => {
    setProfileModalShow(true);
  };
  const showRenameModal = () => {
    setRenameModalShow(true);
  };
  const showUploadModal = () => {
    setUploadModalShow(true);
  };

  if (isLoading && loading) {
    return
  }

  return (
    <UserContext.Provider
      value={{ username: data.username, email: data.email, token: token, picture: data.picture}}
    >
      <TopMenu
        showShareModal={showShareModal}
        showProfileModal={showProfileModal}
      />

      <CheckListModal
        {...boxModalOptions}
        emailgroup={data.accessArray}
        show={boxModalShow}
        onHide={() => setBoxModalShow(false)}
        refresh={refresh}
      />

      <CheckListModal
        {...shareModalOptions}
        emailgroup={data.shareArray}
        show={shareModalShow}
        onHide={() => setShareModalShow(false)}
        refresh={refresh}
      />

      <ProfileModal
        show={profileModalShow}
        onHide={() => setProfileModalShow(false)}
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

      <div className="grid" ref={ref}>
        {data.boxArray.map((boxEmail, i) => (
          <div className="item" key={i}>
            <div className="item-content">

              {(boxEmail == data.email) ? (<Box
                ref={fileRefreshRef}
                boxEmail={boxEmail}
                refresh={refresh}
                setPoints={setPoints}
                setSelection={setSelection}
                setShowContextMenu={setShowContextMenu}
                owner={true}
                showUploadModal={showUploadModal}
              />) : (<Box
                boxEmail={boxEmail}
                refresh={refresh}
                setPoints={setPoints}
                setSelection={setSelection}
                setShowContextMenu={setShowContextMenu}
              />)}
              

              
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={showBoxModal}
        className="rounded-circle position-fixed bottom-0 end-0 m-5"
        style={{ height: "75px", width: "75px" }}
      >
        <h1>
          <i className="bi bi-dropbox"></i>
        </h1>
      </Button>

      {showContextMenu && (
        <ContextMenu
          style={{listStyle: "none"}}
          points={points}
          selection={selection}
          refreshFiles={refreshFiles}
          showRenameModal={showRenameModal}
        />
      )}
    </UserContext.Provider>
  );
}
