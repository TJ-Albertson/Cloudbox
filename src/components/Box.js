import React, { useContext } from "react";
import {
  Card,
  CloseButton,
  Image,
} from "react-bootstrap";
import download from "downloadjs";

import Upload from "./Upload";
import FileList from "./FileList"

import { getApi } from "../api/getApi";
import { useApi } from "../hooks/useApi";
import { postApi } from "../api/postApi";
import { UserContext } from "./CloudBox";

import "../CSS/Box.css";

export default function Box(props) {
  const { loading, error, refresh, data, state } = useApi(
    `http://localhost:5000/getFileList`,
    {
      dummyData: {
        fileTree: JSON.stringify({ name: "main", folders: [], files: [] }),
      },
    }
  );

  const signedInUser = useContext(UserContext);

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

      <FileList fileObject={JSON.parse(data.fileTree)}></FileList>

      <div className="flex-fill"></div>

      <Card.Footer>
        {props.boxEmail == signedInUser.email ? <Upload></Upload> : null}
      </Card.Footer>
    </Card>
  );
}
