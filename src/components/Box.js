import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CloseButton,
  Container,
  Image,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import download from "downloadjs";
import { useSortableData } from "./utils";

import Upload from "./Upload";

import { getApi } from "../api/getApi";
import { useApi } from "../hooks/useApi";
import { postApi } from "../api/postApi";
import { UserContext } from "./CloudBox";

import "../CSS/Box.css";
//import "../CSS/ContextMenu.css";

const fileObject = {
  name: "main",
  folders: [
    {
      name: "movies",
      mimeType: "File folder",
      folders: [
        {
          name: "harry potter",
          folders: [],
          files: [
            {
              name: "harrypotter.mkv",
              updatedAt: "today",
              mimeType: "none",
              size: "10MB",
            },
          ],
        },
      ],
      files: [],
    },
    {
      name: "pictures",
      mimeType: "File folder",
      folders: [],
      files: [
        {
          name: "image.png",
          updatedAt: "today",
          mimeType: "none",
          size: "10MB",
        },
      ],
    },
  ],
  files: [
    { name: "picture.jpg", updatedAt: "today", mimeType: "none", size: "10MB" },
    { name: "words.txt", updatedAt: "today", mimeType: "none", size: "10MB" },
    { name: "movie.mp4", updatedAt: "today", mimeType: "none", size: "10MB" },
  ],
};

export default function Box(props) {
  const { loading, error, refresh, data } = useApi(
    `http://localhost:5000/getFileList/${props.id}`,
    { dummyData: [] }
  );
  const signedInUser = useContext(UserContext);

  //console.log(data)

  

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

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const headerArray = [
    { text: "Name", sortBy: "name" },
    { text: "Date", sortBy: "updatedAt" },
    { text: "Type", sortBy: "mimeType" },
    { text: "Size", sortBy: "size" },
  ];

  const [location, setLocation] = useState(fileObject);
  const [history, setHistory] = useState([fileObject]);

  //const { items, requestSort, sortConfig } = useSortableData(location.folders);
  const { items, requestSort, sortConfig } = useSortableData(location.files);

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

      <div className="d-flex flex-row ps-1 border-bottom border-grey">
        {history.map((backLink, i) => (
          <div
            key={i}
            className="navMenu"
            onClick={() => {
              setLocation(backLink);
              setHistory([...history.slice(0, i + 1)]);
            }}
          >
            /{backLink.name}
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
        {location.folders.map(({ name, mimeType }, i) => (
          <Row
            key={i}
            className="test"
            onClick={() => {
              setLocation(location.folders[i]);
              setHistory((history) => [...history, location.folders[i]]);
            }}
          >
            <Col>
              <i className="bi bi-folder"></i> {name}
            </Col>
            <Col>
              {mimeType}
            </Col>
          </Row>
        ))}
        {items.length > 0 ? (
          items.map(
            ({ _id, name, path, mimeType, size, updatedAt }, i) => (
              <Row
                key={i}
                className="test"
                onContextMenu={(e) => {
                  e.preventDefault();
                  props.setShowContextMenu(true);
                  props.setSelectedFile({ _id, path, mimeType });
                  props.setPoints({ x: e.pageX, y: e.pageY });
                }}
              >
                <Col className="text-truncate">
                  <i className="bi bi-file-earmark-text"></i> {name}
                </Col>
                <Col>{updatedAt /*.substring(0, 10)*/}</Col>
                <Col>{mimeType}</Col>
                <Col className="text-end">{size} bytes</Col>
              </Row>
            )
          )
        ) : (
          <div colSpan={5} style={{ fontWeight: "300" }}>
            This user has no files uploaded
          </div>
        )}
      </Container>
      <div className="flex-fill"></div>

      <Card.Footer>
        {props.boxEmail == signedInUser.email ? <Upload></Upload> : null}
      </Card.Footer>
    </Card>
  );
}
