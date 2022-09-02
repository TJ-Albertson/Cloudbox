import React, { useState, useEffect, useRef } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import NavBar from "./NavBar";
import Box from "./Box";
import CheckListModal from "./CheckListModal";

import "../CSS/TestDrag.css";
import "../CSS/Box.css";

import { boxModalOptions, shareModalOptions } from "./utils";
import { useApi } from "../hooks/useApi";
import { useMuuri } from "../hooks/useMuuri";

export const UserContext = React.createContext();

export default function CloudBox() {
  const { user, isLoading } = useAuth0();

  const { loading, token, refresh, data } = useApi(
    "http://localhost:5000/getGroup",
    {
      dummyData: {
        boxArray: [],
        accessArray: [],
        shareArray: [],
      },
    }
  );

  const { ref } = useMuuri(data);

  const [shareModalShow, setShareModalShow] = useState(false);
  const [boxModalShow, setBoxModalShow] = useState(false);

  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [selectedFile, setSelectedFile] = useState({});
  const [showContextMenu, setShowContextMenu] = useState(false);

  const showShareModal = () => {
    setShareModalShow(true);
  };
  const showBoxModal = () => {
    setBoxModalShow(true);
  };

  if (isLoading && loading) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <Spinner
          animation="border"
          style={{ width: "10em", height: "10em" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{ username: user.name, email: user.email, token: token }}
    >
      <NavBar showModal={showShareModal} />

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

      <div className="grid" ref={ref}>
        {data.boxArray.map((boxEmail) => (
          <div className="item" key={boxEmail.toString()}>
            <div className="item-content">
              <Box
                id={boxEmail}
                boxEmail={boxEmail}
                refresh={refresh}
                picture={user.picture}
                setPoints={setPoints}
                setSelectedFile={setSelectedFile}
                setShowContextMenu={setShowContextMenu}
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={showBoxModal}
        className="position-fixed bottom-0 end-0 m-5"
      >
        <h1>
          <i className="bi bi-plus-circle-fill"></i>
        </h1>
      </Button>

      {showContextMenu && (
        <div
          className="menu"
          style={{ top: points.y, left: points.x, zIndex: 4}}
        >
          <ul className="bootstrap-overrides">
            <li><i className="bi bi-download"></i> Download</li>
            <li><i className="bi bi-pencil-square"></i> Rename</li>
            <hr className="hr-override"></hr>
            <li onClick={() => console.log(selectedFile)}><i className="bi bi-trash"></i> Delete</li>
          </ul>
        </div>
      )}
    </UserContext.Provider>
  );
}
