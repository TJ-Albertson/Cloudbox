import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { Card, CloseButton, Image, Container, Row, Col } from "react-bootstrap";

import Upload from "./Upload";

import { useApi } from "../hooks/useApi";
import { UserContext } from "./CloudBox";
import { fetchApi } from "../api/fetchApi";

import { useSortableData, FileImage, localDate } from "../utilities/functions";

import "../CSS/Box.css";

function Box(props, ref) {
  const [history, setHistory] = useState([{ name: "main", _id: "main" }]);
  const [currentDirectory, setCurrentDirectory] = useState("main");

  const signedInUser = useContext(UserContext);

  const { loading: filesLoading , refresh: refreshFiles, data: fileList } = useApi(`/files/${props.boxEmail}`, {
    dummyData: [],
  });
  
  const { loading: userMetaDataLoading, refresh: refreshUserMetaData, data: userMetaData } = useApi(`/user/email/${props.boxEmail}`, {
    dummyData: {
      username: "",
      picture: "",
      bio: ""
    },
  });
  
  useImperativeHandle(ref, () => ({
    refresh: () => refreshFiles(),
  }));

  //need to create main folder

  const { items, requestSort } = useSortableData(fileList);

  async function removeBox() {
    const options = {
      method: "PATCH",
      body: JSON.stringify({
        array: "box",
        desire: "delete",
        targetEmail: props.boxEmail,
      }),
      token: signedInUser.token,
      headers: { "Content-Type": "application/json" },
    };

    await fetchApi("/user/groups", options).then(props.refresh);
  }

  if (filesLoading) {
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
          src={userMetaData.picture}
          roundedCircle="true"
          style={{ width: "2rem", height: "2rem", marginRight: "10px" }}
        />
        <div className="flex-grow-1">{props.boxEmail}</div>
        <h5><i className="bi bi-upload me-3"></i></h5>
        <CloseButton onClick={() => removeBox()} />
      </Card.Header>

      <div className="d-flex flex-column flex-fill">
        <div className="d-flex flex-row ps-1 border-bottom border-grey">
          <div>
            <i className="bi bi-hdd ms-1"></i>
          </div>
          {history.map(({ name, _id }, i) => (
            <div
              key={i}
              className="navMenu ms-1"
              onClick={() => {
                setCurrentDirectory(_id);
                setHistory([...history.slice(0, i + 1)]);
              }}
            >
              {">"}
              <i className="bi bi-folder2-open ms-1"> {name}</i>
            </div>
          ))}
        </div>

        <Container style={{ fontSize: "15px" }}>
          <Row className="mb-1">
            {headerArray.map(({ text, sortBy }, i) => (
              <Col
                key={i}
                className="header"
                onClick={() => requestSort(sortBy)}
              >
                {text}
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
              type: "default",
              directory: currentDirectory,
            });
            props.setPoints({ x: e.pageX, y: e.pageY });
          }}
        ></div>
      </div>

      <Card.Footer>
        {props.boxEmail === signedInUser.email ? (
          <Upload directory={currentDirectory}></Upload>
        ) : null}
      </Card.Footer>
    </Card>
  );
}

export default forwardRef(Box);
