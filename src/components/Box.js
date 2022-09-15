import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { Card, CloseButton, Image, Container, Row, Col } from "react-bootstrap";

import { useApi } from "../hooks/useApi";
import { UserContext } from "./CloudBox";
import { fetchApi } from "../api/fetchApi";

import { useSortableData, FileImage, localDate } from "../utilities/functions";
import { headerArray } from "../utilities/variables";

import "../SCSS/Box.scss";

function Box(props, ref) {
  const [history, setHistory] = useState([{ name: "C:", _id: "C:" }]);
  const [currentDirectory, setCurrentDirectory] = useState("C:");

  const signedInUser = useContext(UserContext);

  const {
    loading: filesLoading,
    refresh: refreshFiles,
    data: fileList,
  } = useApi(`/files/${props.boxEmail}`, {
    dummyData: [],
  });

  const {
    loading: userMetaDataLoading,
    data: userMetaData,
  } = useApi(`/user/email/${props.boxEmail}`, {
    dummyData: {
      username: "",
      picture: "",
      bio: "",
    },
  });

  useImperativeHandle(ref, () => ({
    refresh: () => refreshFiles(),
  }));

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

  function moveFolder() {}

  if (filesLoading) {
    return <div>loading</div>;
  }

  return (
    <Card className="Box">
      <Card.Header className=".handle d-flex p-2">
        <Image
          src={userMetaData.picture}
          roundedCircle="true"
          className="picture"
        />

        <div className="flex-grow-1 ">{props.boxEmail}</div>

        {props.owner && (
          <h5
            onClick={() => {
              props.setSelection(
                history[history.length - 1]
              );
              props.showUploadModal(true);
            }}
          >
            <i className="bi bi-upload me-3"></i>
          </h5>
        )}

        <CloseButton onClick={() => removeBox()} />
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

        <Container className="overflow-auto fluid">
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

export default forwardRef(Box);
