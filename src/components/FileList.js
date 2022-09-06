import { useState, useImperativeHandle, useRef } from "react";
import { useSortableData } from "./utils";
import { Container, Row, Col } from "react-bootstrap";

const fileObject = {
  folders: {
    movies: {
      folders: {},
      files: {},
    },
  },
  files: {
    "picture.mp4": {
      mimeType: "bruh",
      id: "11234",
    },
  },
};

export default function FileList(props, ref) {
  const [location, setLocation] = useState(props.fileObject);
  const [history, setHistory] = useState([props.fileObject]);

  const { items, requestSort } = useSortableData(location.files);

  console.log(fileObject)

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

  function ListFiles(props) {
    for (var object in props.objectList) {
      return (
        <Row
          className="test"
          onContextMenu={(e) => {
            e.preventDefault();
            props.setShowContextMenu(true);
            props.setContextMenuType("file");
            props.setSelectedFile({ object });
            props.setPoints({ x: e.pageX, y: e.pageY });
          }}
        >
          <Col className="text-truncate">
            <FileImage value={object.mimeType} /> {object.name}
          </Col>
          <Col>{object.updatedAt /*.substring(0, 10)*/}</Col>
          <Col>{object.mimeType}</Col>
          <Col className="text-end">{object.size} bytes</Col>
        </Row>
      );
    }
  }

  function newFolder() {
    location.folders.push({
      name: "New Folder",
      folders: [],
      files: [],
    });
    //await post api, then refresh data
    console.log(history[0]);
  }

  function newFolder2() {
    location.folders.push({
      name: "New Folder",
      folders: [],
      files: [],
    });
    props.setSelectedFile(history[0]);
  }

  //history 0 send to server after change then reffresh

  //make change, send history0 in selected file, send to server in higher component then regresh
  function newFile() {}

  function deleteFolder() {}

  function deleteFile() {}

  function rename() {}

  return (
    <div className="d-flex flex-column flex-fill">
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
        ))}

        {items.length > 0 ? (
          items.map(({ _id, name, path, mimeType, size, updatedAt }, i) => (
            <Row
              key={i}
              className="test"
              onContextMenu={(e) => {
                e.preventDefault();
                props.setShowContextMenu(true);
                props.setContextMenuType("file");
                props.setSelectedFile({ _id, path, mimeType, location, name });
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
          ))
        ) : (
          <div>no files</div>
        )}
        <ListFiles objectList={fileObject}></ListFiles>
      </Container>

      

      <div
        className="flex-fill"
        onContextMenu={(e) => {
          e.preventDefault();
          props.setShowContextMenu(true);
          props.setContextMenuType("default");
          props.setSelectedFile({ location });
          props.setPoints({ x: e.pageX, y: e.pageY });
        }}
      ></div>
      <input type="button" value="new folder" onClick={newFolder} />
    </div>
  );
}
