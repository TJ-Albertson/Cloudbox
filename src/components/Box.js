import React, { useContext, useState } from "react";
import { Card, CloseButton, Image, Container, Row, Col } from "react-bootstrap";
import download from "downloadjs";

import Upload from "./Upload";
import FileList from "./FileList";

import { getApi } from "../api/getApi";
import { useApi } from "../hooks/useApi";
import { postApi } from "../api/postApi";
import { UserContext } from "./CloudBox";

import { useSortableData } from "./utils";

import "../CSS/Box.css";


export default function Box(props) {
  const { loading, error, refresh, data } = useApi(
    `http://localhost:5000/getFileList/${props.id}`,
    { dummyData: [] }
  )

  const [history, setHistory] = useState(["main"]);
  const [currentDirectory, setCurrentDirectory] = useState("main");
  
  const signedInUser = useContext(UserContext)
    
  const { items, requestSort } = useSortableData(["list"])
  
  const downloadFile = async (id, path, mimetype) => {
    const result = await getApi(`/downloadFile/${id}`, signedInUser.token);
    const split = path.split("/");
    const filename = split[split.length - 1];
    return download(result.data, filename, mimetype);
  };

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

  function FileImage(props) {
    switch (props.value) {
      case "txt":
        return <i className="bi bi-filetype-txt"></i>;
      case "mp4":
        return <i className="bi bi-filetype-mp4"></i>;
      case "jpg":
        return <i className="bi bi-file-earmark-image"></i>;
      default:
        return <i className="bi bi-file-earmark-text"></i>;
    }
  }

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
        {history.map((backLink, i) => (
          <div
            key={i}
            className="navMenu"
            onClick={() => {
              setCurrentDirectory(backLink);
              setHistory([...history.slice(0, i + 1)]);
            }}
          >
            /{backLink}
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
        {data?.map(({ _id, name, directory, path, mimeType, size, updatedAt }, i) => {
          if (directory === currentDirectory) {
            if (mimeType === "folder") {
              return (
                <Row
                  key={i}
                  className="test"
                  onClick={() => {
                    setCurrentDirectory(name);
                    setHistory([...history, name]);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    props.setShowContextMenu(true);
                    props.setContextMenuType("folder");
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
                  props.setContextMenuType("file");
                  props.setSelectedFile({
                    _id,
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
                <Col>{updatedAt /*.substring(0, 10)*/}</Col>
                <Col>{mimeType}</Col>
                <Col className="text-end">{size} bytes</Col>
              </Row>
            );
          }
        })}
      </Container>

      <div
        className="flex-fill"
        onContextMenu={(e) => {
          e.preventDefault();
          props.setShowContextMenu(true);
          props.setContextMenuType("default");
          props.setSelectedFile();
          props.setPoints({ x: e.pageX, y: e.pageY });
        }}
      ></div>

        
    </div>
      
      <Card.Footer>
        {props.boxEmail == signedInUser.email ? <Upload directory={currentDirectory}></Upload> : null}
      </Card.Footer>
    </Card>
  );
}
