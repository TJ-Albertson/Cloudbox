import { React, useState, useEffect } from "react";
import { Card, CloseButton, Table } from "react-bootstrap";
import axios from "axios";
import download from "downloadjs";

import { useGetEmailGroups } from "../hooks/useGetEmailGroups";

import "../CSS/Box.css";

export default function Box(props) {
  const [filesList, setFilesList] = useState([]);

  const emailGroups = useGetEmailGroups()

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:5000/getFiles/${props.email}`
      );
      setFilesList(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    const result = await axios.get(
      `http://localhost:5000/download/${props.email}/${id}`,
      {
        responseType: "blob",
      }
    );
    const split = path.split("/");
    const filename = split[split.length - 1];
    return download(result.data, filename, mimetype);
  };

  async function removeBox() {
    const url = `http://localhost:5000/${props.userEmail}/removeBox`;

    axios
      .post(url, {
        data: props.id,
      })
      .then((req) => console.log(req));
  }

  return (
    <Card className="Box">
      <Card.Header className="d-flex">
        <div className="flex-grow-1">{props.id}</div>
        <CloseButton onClick={() => removeBox() && props.setemailgroups(emailGroups)} />
      </Card.Header>

      <Table>
        <thead>
          <tr>
            <th>File</th>
            <th>Date</th>
            <th>Type</th>
            <th>Size</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(({ _id, name, path, mimeType, size, updatedAt }) => (
              <tr key={_id}>
                <td>{name}</td>
                <td>{updatedAt.substring(0, 10)}</td>
                <td>{mimeType}</td>
                <td>{size} bytes</td>
                <td>
                  <a
                    href="#/"
                    onClick={() => downloadFile(_id, path, mimeType)}
                  >
                    Download
                  </a>
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
      </Table>
    </Card>
  );
}
