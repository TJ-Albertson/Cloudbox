import { React } from "react";
import { Card, CloseButton, Table } from "react-bootstrap";
import download from "downloadjs";

import "../CSS/Box.css";

import { getApi } from "../api/getApi";
import { useApi } from "../hooks/useApi";
import { postApi } from "../api/postApi";

export default function Box(props) {
  const { loading, error, refresh, data } = useApi(
    `http://localhost:5000/getFileList/${props.id}`
  );

  const downloadFile = async (id, path, mimetype) => {
    const result = await getApi(`/downloadFile/${id}`, props.token);

    const split = path.split("/");
    const filename = split[split.length - 1];
    return download(result.data, filename, mimetype);
  };

  async function removeBox() {
    const data = new URLSearchParams({
      removeEmail: props.email,
    });

    postApi("/removeBox", data, props.token).then(props.refresh);
  }

  /**************************/

  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
      let direction = "ascending";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
  };

  const ProductTable = (props) => {
    const { items, requestSort, sortConfig } = useSortableData(props.products);
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };
  };

  /********************/

  return (
    <Card className="Box" style={{ width: "40rem", height: "40rem" }}>
      <Card.Header className="d-flex">
        <div className="flex-grow-1">{props.id}</div>
        <CloseButton onClick={() => removeBox()} />
      </Card.Header>

      <div >
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
          <tbody className="">
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
      </div>
    </Card>
  );
}
