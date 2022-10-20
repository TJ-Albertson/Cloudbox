import React, { useState, useEffect, useRef } from "react";
import Box from "./Box";
import { useApi } from "../hooks/useApi";
import { useMuuri } from "../hooks/useMuuri";

export default function Boxes(props) {

    console.log(props)

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

  return (
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

                  setPoints={props.setPoints}
                  setSelection={props.setSelection}
                  setShowContextMenu={props.setShowContextMenu}
                  showUploadModal={props.showUploadModal}
                />
              ) : (
                <Box
                  boxEmail={boxEmail}
                  refresh={refresh}

                  setPoints={props.setPoints}
                  setSelection={props.setSelection}
                  setShowContextMenu={props.setShowContextMenu}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
