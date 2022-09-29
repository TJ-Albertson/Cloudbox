import React, { useState, useEffect, useRef } from "react";
import { Button, Spinner } from "react-bootstrap";

import TopMenu from "./TopMenu";
import Box from "./Box";
import CheckListModal from "./CheckListModal";
import ContextMenu from "./ContextMenu";
import RenameModal from "./RenameModal";
import UploadModal from "./UploadModal"

import "../CSS/Cloudbox.css";

import { boxModalOptions, shareModalOptions } from "../utilities/variables";
import { useMuuri } from "../hooks/useMuuri";
import ProfileModal from "./ProfileModal";

import { groupData, userData } from "../demo/demoConfig"

export const UserContext = React.createContext();

export default function CloudBox() {

  //demo state
  const [boxEmails, setBoxEmails] = useState(groupData.boxArray)
  const [accessEmails, setAccessEmails] = useState(groupData.accessArray)
  const [shareEmails, setShareEmails] = useState(groupData.shareArray)
  const [user, setUser] = useState(userData)

  const { ref } = useMuuri(boxEmails);

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

  const deleteBoxEmail = (email) => {
    setBoxEmails((current) =>
      current.filter((item) => item !== email)
    );
  }

  const addBoxEmail = (emails) => {
    setBoxEmails((current) => [...current, ...emails]);
  }

  const deleteShareEmail = (emails) => {
    setShareEmails((current) =>
      current.filter(item => !emails.includes(item)))
    ;
  }

  return (
    <UserContext.Provider
      value={{ username: user.username, email: user.email, picture: user.picture}}
    >
      <TopMenu
        showShareModal={showShareModal}
        showProfileModal={showProfileModal}
      />

      <CheckListModal
        {...boxModalOptions}
        emailgroup={accessEmails}
        show={boxModalShow}
        onHide={() => setBoxModalShow(false)}
        addBoxEmail={addBoxEmail}
        boxEmails={boxEmails}
      />

      <CheckListModal
        {...shareModalOptions}
        emailgroup={shareEmails}
        show={shareModalShow}
        onHide={() => setShareModalShow(false)}
        deleteShareEmail={deleteShareEmail}
      />

      <ProfileModal
        show={profileModalShow}
        onHide={() => setProfileModalShow(false)}
      />

      <RenameModal
        show={renameModalShow}
        onHide={() => setRenameModalShow(false)}
        selection={selection}
      />

      <UploadModal
        show={uploadModalShow}
        onHide={() => setUploadModalShow(false)}
        selection={selection}
      />
  
  <div className="grid-parent">
      <div className="grid" ref={ref}>
        {boxEmails.map((boxEmail, i) => (
          <div className="item" key={i}>
            <div className="item-content">
              {(boxEmail == user.email) ? (<Box
                boxEmail={boxEmail}
                setPoints={setPoints}
                setSelection={setSelection}
                setShowContextMenu={setShowContextMenu}
                owner={true}
                showUploadModal={showUploadModal}

                delete={deleteBoxEmail}
              />) : (<Box
                boxEmail={boxEmail}
                setPoints={setPoints}
                setSelection={setSelection}
                setShowContextMenu={setShowContextMenu}

                delete={deleteBoxEmail}
              />)}
            </div>
          </div>
        ))}
      </div>
      </div>

      <Button
        onClick={showBoxModal}
        className="rounded-circle position-fixed bottom-0 end-0 m-5"
        style={{ height: "75px", width: "75px", zIndex: "4" }}
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
          showRenameModal={showRenameModal}
        />
      )}
    </UserContext.Provider>
  );
}
