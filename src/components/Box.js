import { React } from "react";
import { Card, CloseButton, Table } from "react-bootstrap";
import axios from "axios";
import download from "downloadjs";

import "../CSS/Box.css";

import { useApiFileList } from "../hooks/useApiFileList";
import { useApi } from "../hooks/useApi";


export default function Box(props) {
  const { fileList } = useApiFileList();

  const opts = {
    audience: 'http://localhost:5000',
  };

  const {
    loading,
    error,
    refresh,
    data
  } = useApi('http://localhost:5000/getFileList', opts);
  console.log(data)

  const downloadFile = async (id, path, mimetype) => {
    const result = await axios.get(
      `http://localhost:5000/download/${props.email}/${id}`,
      { responseType: "blob" }
    );

    const split = path.split("/");
    const filename = split[split.length - 1];
    return download(result.data, filename, mimetype);
  };

  async function removeBox() {
    const url = `http://localhost:5000/${props.userEmail}/removeBox`;

    axios
      .post(url, { data: props.id })
      .then((req) => props.setemailgroups(req.data[0]));
  }

  return (
    <Card className="Box">
      <Card.Header className="d-flex">
        <div className="flex-grow-1">{props.id}</div>
        <CloseButton onClick={() => removeBox()} />
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
          {data.length > 0 ? (
            data.map(({ _id, name, path, mimeType, size, updatedAt }) => (
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
