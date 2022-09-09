import React, { useContext, useState } from "react";
import { Card, CloseButton, Image, Container, Row, Col } from "react-bootstrap";

import Upload from "./Upload";

import { useApi } from "../hooks/useApi";
import { postApi } from "../api/postApi";
import { UserContext } from "./CloudBox";

import { useSortableData, FileImage, localDate } from "../utilities/functions";

import "../CSS/Box.css";

export default function Box(props) {
  const { loading, refresh, data } = useApi(
    `http://localhost:5000/files/${props.id}`,
    { dummyData: [] }
  );
 
  //need to create main folder
  const [history, setHistory] = useState([{name: "main", _id: "main"}]);
  const [currentDirectory, setCurrentDirectory] = useState("main");

  const signedInUser = useContext(UserContext);

  const { items, requestSort } = useSortableData(data);

  async function removeBox() {
    const data = new URLSearchParams({
      removeEmail: props.boxEmail,
    });
    postApi("/removeBox", data, signedInUser.token).then(props.refresh);
  }

  if (loading) {
    return <div>loading</div>;
  }

  const headerArray = [
    { text: "Name", sortBy: "name" },
    { text: "Date", sortBy: "updatedAt" },
    { text: "Type", sortBy: "mimeType" },
    { text: "Size", sortBy: "size" },
  ];

  return (
    <Card className="Box" style={{ width: "40rem", height: "40rem" }}>
      <Card.Header className=".handle d-flex">
        <Image
          src={props.picture}
          roundedCircle="true"
          style={{ width: "2rem", height: "2rem", marginRight: "10px" }}
        />
        <div className="flex-grow-1">{props.id}</div>
        <CloseButton onClick={() => removeBox()} />
      </Card.Header>

      <div className="d-flex flex-column flex-fill">
        <div className="d-flex flex-row ps-1 border-bottom border-grey">
          {history.map(({name, _id}, i) => (
            <div
              key={i}
              className="navMenu"
              onClick={() => {
                setCurrentDirectory(_id);
                setHistory([...history.slice(0, i + 1)]);
              }}
            >
              /{name}
            </div>
          ))}
        </div>

        <Container style={{ fontSize: "15px" }}>
          <Row className="mb-1">
            {headerArray.map(({ text, sortBy }, i) => (
              <Col
                key={i}
                className="headerColumn d-flex p-0"
                onClick={() => requestSort(sortBy)}
              >
                <div className="flex-fill ps-2">{text}</div>
                <div className="vr"></div>
              </Col>
            ))}
          </Row>
        </Container>

        <Container className="overflow-auto">
          {items?.map(
            ({ _id, name, directory, path, mimeType, size, updatedAt }, i) => {
              if (directory === currentDirectory) {
                if (mimeType === "File folder") {
                  return (
                    <Row
                      key={i}
                      className="test"
                      onClick={() => {
                        setCurrentDirectory(_id);
                        setHistory([...history, {name, _id}]);
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
                        })
                        props.setPoints({ x: e.pageX, y: e.pageY });
                      }}
                    >
                      <Col>
                        <i className="bi bi-folder"></i> {name}
                      </Col>
                      <Col>{mimeType}</Col>
                    </Row>
                  );
                }
                return (
                  <Row
                    key={i}
                    className="test"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      props.setShowContextMenu(true);
                      props.setSelection({
                        type: "file",
                        id: _id,
                        path,
                        mimeType,
                        name,
                      });
                      props.setPoints({ x: e.pageX, y: e.pageY });
                    }}
                  >
                    <Col className="text-truncate">
                      <FileImage value={mimeType} /> {name}
                    </Col>
                    <Col>{localDate(updatedAt)}</Col>
                    <Col>{mimeType}</Col>
                    <Col className="text-end">{Math.ceil(size/1000)} KB</Col>
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
            props.setSelection({ type: "default", directory: currentDirectory });
            props.setPoints({ x: e.pageX, y: e.pageY });
          }}
        ></div>
      </div>

      <Card.Footer>
        {props.boxEmail == signedInUser.email ? (
          <Upload directory={currentDirectory}></Upload>
        ) : null}
      </Card.Footer>
    </Card>
  );
}
