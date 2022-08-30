import React, { useContext } from "react";
import { Card, CloseButton, Dropdown, DropdownButton, Image } from "react-bootstrap";
import download from "downloadjs";
import { useSortableData } from "./utils";

import Upload from "./Upload";

import { getApi } from "../api/getApi";
import { useApi } from "../hooks/useApi";
import { postApi } from "../api/postApi";
import { UserContext } from "./CloudBox"

import "../CSS/Box.css";

export default function Box(props) {

  const { loading, error, refresh, data } = useApi(
    `http://localhost:5000/getFileList/${props.id}`,
    { dummyData: [] }
  );
  const signedInUser = useContext(UserContext)
  const { items, requestSort, sortConfig } = useSortableData(data);

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
      <Image src={props.picture} roundedCircle="true" style={{ width: "2rem", height: "2rem", marginRight: "10px" }}/>
        <div className="flex-grow-1">{props.id}</div>
        <CloseButton onClick={() => removeBox()} />
      </Card.Header>

      <div className="overflow-auto">
        <table className="table">
          <thead className="bg-light">
            <tr>
              {headerArray.map(({ text, sortBy }) => (
                <th key={text}>
                  <button
                    type="button"
                    onClick={() => requestSort(sortBy)}
                    className={getClassNamesFor(sortBy)}
                  >
                    {text}
                  </button>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody className="">
            {items.length > 0 ? (
              items.map(({ _id, name, path, mimeType, size, updatedAt }) => (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>{updatedAt.substring(0, 10)}</td>
                  <td>{mimeType}</td>
                  <td>{size} bytes</td>
                  <td>
                    <DropdownButton drop="top" title="">
                      <Dropdown.Item eventKey="1" onClick={() => downloadFile(_id, path, mimeType)}  className="drop">Download</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ fontWeight: "300" }}>
                  This user has no files uploaded
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
      </div>

      <div className="flex-fill"></div>

      <Card.Footer>
        {props.boxEmail == signedInUser.email ? (
          <Upload></Upload>
        ) : null}
      </Card.Footer>
    </Card>
  );
}
