import React, { useContext, useEffect, useState } from "react";
import { Card, CloseButton, Container, Image, Row, Col } from "react-bootstrap";
import download from "downloadjs";
import { useSortableData } from "./utils";

import Upload from "./Upload";

import { getApi } from "../api/getApi";
import { useApi } from "../hooks/useApi";
import { postApi } from "../api/postApi";
import { UserContext } from "./CloudBox";

import "../CSS/Box.css";
import "../CSS/ContextMenu.css";

export default function Box(props) {
  const [show, setShow] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [selectedFile, setSelectedFile] = useState({});

  const { loading, error, refresh, data } = useApi(
    `http://localhost:5000/getFileList/${props.id}`,
    { dummyData: [] }
  );
  const signedInUser = useContext(UserContext);
  const { items, requestSort, sortConfig } = useSortableData(data);
  useEffect(() => {
    const handleClick = () => setShow(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

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

  return (
    <Card className="Box" style={{ width: "40rem", height: "40rem" }}>
      <Card.Header className="d-flex">
        <Image
          src={props.picture}
          roundedCircle="true"
          style={{ width: "2rem", height: "2rem", marginRight: "10px" }}
        />
        <div className="flex-grow-1">{props.id}</div>
        <CloseButton onClick={() => removeBox()} />
      </Card.Header>

      <Container className="overflow-auto" style={{ fontSize: "10px" }}>
        <Row>
          {headerArray.map(({ text, sortBy }, i) => (
            <Col key={i}>
              <button
                type="button"
                onClick={() => requestSort(sortBy)}
                className={getClassNamesFor(sortBy)}
              >
                {text}
              </button>
            </Col>
          ))}
        </Row>

        {items.length > 0 ? (
          items.map(({ _id, name, path, mimeType, size, updatedAt }, i) => (
            <Row
              key={i}
              className="test"
              onContextMenu={(e) => {
                e.preventDefault();
                setShow(true);
                setSelectedFile({ _id, path, mimeType });
                setPoints({ x: e.pageX, y: e.pageY });
              }}
            >
              <Col>
                <i className="bi bi-folder"></i> {name}
              </Col>
              <Col>{updatedAt.substring(0, 10)}</Col>
              <Col>{mimeType}</Col>
              <Col>{size} bytes</Col>
            </Row>
          ))
        ) : (
          <div colSpan={5} style={{ fontWeight: "300" }}>
            This user has no files uploaded
          </div>
        )}
        {show && (
          <div
            className="menu"
            style={{ top: points.y - 125, left: points.x - 25 }}
          >
            <ul>
              <li>Download</li>
              <li>Rename</li>
              <hr></hr>
              <li onClick={() => console.log(selectedFile)}>Delete</li>
            </ul>
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
