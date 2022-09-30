import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Card, CloseButton, Image, Container, Row, Col } from "react-bootstrap";

import { UserContext } from "./CloudBox";

import { useSortableData, FileImage, localDate } from "../utilities/functions";
import { headerArray } from "../utilities/variables";

import "../SCSS/Box.scss";
import { userMetaDataManifest } from "../demo/demoConfig";

import "../CSS/Box.css";

export default function Box(props) {
  const [history, setHistory] = useState([{ name: "C:", _id: "C:" }]);
  const [currentDirectory, setCurrentDirectory] = useState("C:");
  

  const signedInUser = useContext(UserContext);

  let userMetaData = {
    username: userMetaDataManifest[props.boxEmail].username,
    picture: userMetaDataManifest[props.boxEmail].picture,
    bio: userMetaDataManifest[props.boxEmail].bio,
  };

  let fileList = [];

  props.files.forEach((file) => {
    if (file.owner == props.boxEmail) {
      fileList.push(file);
    }
  });

  const { items, requestSort } = useSortableData(fileList);

  function removeBox() {
    props.delete(props.boxEmail)
  }

  function moveFolder() {}

  return (
    <Card className="Box">
      <Card.Header className="handle d-flex p-2" id="handle">
        <img src={userMetaData.picture} className="picture" />

        <div className="flex-grow-1 ">{props.boxEmail}</div>

        {props.owner && (
          <h5
            onClick={() => {
              props.setSelection(history[history.length - 1]);
              props.showUploadModal(true);
            }}
          >
            <i className="bi bi-upload me-3"></i>
          </h5>
        )}


        {!props.owner && ( <CloseButton onClick={() => removeBox()} /> )}
        
      </Card.Header>

      <div className="d-flex flex-column flex-fill">
        <div className="d-flex flex-row ps-1 border-bottom border-grey">
          <div
            className="ms-1"
            onClick={() => {
              setCurrentDirectory("C:");
              setHistory([...history.slice(0, 1)]);
            }}
          >
            <i className="bi bi-hdd ms-1 navMenuItem"> C:</i>
          </div>

          <div className="header-history">
          {history.map(({ name, _id }, i) =>
            name != "C:" ? (
              <div
                key={i}
                className="ms-1"
                onClick={() => {
                  setCurrentDirectory(_id);
                  setHistory([...history.slice(0, i + 1)]);
                }}
              >
                {">"}
                <i className="bi bi-folder2-open ms-1 navMenuItem"> {name}</i>
              </div>
            ) : null
          )}
          </div>
        </div>

        <Container className="columnNames">
          <Row className="mb-1">
            {headerArray.map(({ text, sortBy }, i) => (
              <Col
                key={i}
                className="column"
                onClick={() => requestSort(sortBy)}
              >
                {text}
              </Col>
            ))}
          </Row>
        </Container>

        <Container className="">
          {items.length == 0 && <span>This folder is empty.</span>}
          {items?.map(
            ({ _id, name, directory, path, mimeType, size, updatedAt }, i) => {
              if (directory === currentDirectory) {
                if (mimeType === "File folder") {
                  return (
                    <Row
                      key={i}
                      className="file"
                      onClick={() => {
                        setCurrentDirectory(_id);
                        setHistory([...history, { name, _id }]);
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        props.setShowContextMenu(true);
                        props.setSelection({
                          type: "folder",
                          id: _id,
                          path,
                          mimeType,
                          name,
                        });

                        if (!props.owner) {
                          props.setSelection({});
                        }

                        props.setPoints({ x: e.pageX, y: e.pageY });
                      }}
                    >
                      <Col className="text-truncate">
                        <i className="bi bi-folder"></i> {name}
                      </Col>
                      <Col className="text-truncate">
                        {localDate(updatedAt)}
                      </Col>
                      <Col className="text-truncate">{mimeType}</Col>
                      <Col className="text-truncate"></Col>
                    </Row>
                  );
                }
                return (
                  <Row
                    key={i}
                    className="file"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      props.setSelection({
                        type: "file",
                        id: _id,
                        path,
                        mimeType,
                        name,
                      });

                      if (!props.owner) {
                        props.setSelection({
                          type: "otherFile",
                          id: _id,
                          path,
                          mimeType,
                          name,
                        });
                      }

                      props.setShowContextMenu(true);
                      props.setPoints({ x: e.pageX, y: e.pageY });
                    }}
                  >
                    <Col className="text-truncate">
                      <FileImage value={mimeType} /> {name}
                    </Col>
                    <Col className="text-truncate">{localDate(updatedAt)}</Col>
                    <Col className="text-truncate">{mimeType}</Col>
                    <Col className="text-truncate text-end">
                      {Math.ceil(size / 1000)} KB
                    </Col>
                  </Row>
                );
              }
            }
          )}
        </Container>

        <div
          className="flex-fill"
          onContextMenu={(e) => {
            e.preventDefault();
            props.setShowContextMenu(true);
            props.setSelection({
              type: "empty",
              directory: currentDirectory,
            });

            if (!props.owner) {
              props.setSelection({});
            }

            props.setPoints({ x: e.pageX, y: e.pageY });
          }}
        ></div>
      </div>
    </Card>
  );
}
