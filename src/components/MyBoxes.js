import React, { useState, useContext, useRef, useEffect } from "react";
import Box from "./Box";
import { useApi } from "../hooks/useApi";
import { useMuuri } from "../hooks/useMuuri";
import { UserContext } from "./CloudBox";

import ContextMenu from "./ContextMenu";

export default function MyBoxes(props) {
  console.log(props);
  const signedInUser = useContext(UserContext);
  const options = {
    method: "GET",
    dummyData: {
      boxArray: [],
      accessArray: [],
      shareArray: [],
    },
  };

  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const { loading, token, refresh, data } = useApi(
    `/users/${signedInUser.email}`,
    options
  );

  const { ref } = useMuuri(data);

  const fileRefreshRef = useRef(null);

  const refreshFiles = () => {
    fileRefreshRef.current.refresh();
  };

  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [selection, setSelection] = useState({});
  const [showContextMenu, setShowContextMenu] = useState(false);


  return (
    <div>
      <div className="grid-parent">
        <div className="grid" ref={ref}>
          {data.boxArray.map((boxEmail, i) => (
            <div className="item" key={i}>
              <div className="item-content">
                {boxEmail == data.email ? (
                  <Box
                    owner={true}
                    ref={fileRefreshRef}
                    boxEmail={boxEmail}
                    refresh={refresh}
                    setPoints={data.setPoints}
                    setSelection={data.setSelection}
                    setShowContextMenu={data.setShowContextMenu}
                    showUploadModal={data.showUploadModal}
                  />
                ) : (
                  <Box
                    boxEmail={boxEmail}
                    refresh={refresh}
                    setPoints={data.setPoints}
                    setSelection={data.setSelection}
                    setShowContextMenu={data.setShowContextMenu}
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
          showRenameModal={props.showRenameModal}
        />
      )}
    </div>
  );
}
