import download from "downloadjs";
import { getApi } from "../api/getApi";
import { postApi } from "../api/postApi";

import { useContext } from "react";
import { UserContext } from "./CloudBox";

export default function ContextMenu(props) {
  const signedInUser = useContext(UserContext);

  async function newFolder(event) {
    event.preventDefault();

    const { directory } = props.selection

    const data = new URLSearchParams({
      "owner": signedInUser.email,
      "name": "New Folder",
      "mimeType": "File folder",
      "directory": directory
    });

    await postApi("/files/uploadFolder", data, signedInUser.token,
    "application/x-www-form-urlencoded");
  }

  async function deleteFile() {
    const { id, path, mimetype } = props.selection

    const data = new URLSearchParams({
      "id": id,
    });

    await postApi("/uploadFolder", data, signedInUser.token,
    "application/x-www-form-urlencoded");
  }

  function renameFile() {
    
  }

  const downloadFile = async (id, path, mimetype) => {
    const result = await getApi(`/downloadFile/${id}`, signedInUser.token);
    const split = path.split("/");
    const filename = split[split.length - 1];
    return download(result.data, filename, mimetype);
  };

  switch (props.selection.type) {
    case "file":
      return (
        <div
          className="menu"
          style={{ top: props.points.y, left: props.points.x, zIndex: 4 }}
        >
          <ul className="bootstrap-overrides">
            <li>
              <i className="bi bi-download"></i> Download
            </li>
            <li>
              <i className="bi bi-pencil-square"></i> Rename
            </li>
            <hr className="hr-override"></hr>
            <li onClick={() => console.log(props.selection)}>
              <i className="bi bi-trash"></i> Delete
            </li>
          </ul>
        </div>
      );
    case "folder":
      return (
        <div
          className="menu"
          style={{ top: props.points.y, left: props.points.x, zIndex: 4 }}
        >
          <ul className="bootstrap-overrides">
            <li>
              <i className="bi bi-pencil-square"></i> Rename
            </li>
            <hr className="hr-override"></hr>
            <li onClick={() => console.log(props.selection)}>
              <i className="bi bi-trash"></i> Delete
            </li>
          </ul>
        </div>
      );
    default:
      return (
        <div
          className="menu"
          style={{ top: props.points.y, left: props.points.x, zIndex: 4 }}
        >
          <ul className="bootstrap-overrides">
            <li onClick={(e) => newFolder(e)}>
              <i className="bi bi-folder-plus"></i> New Folder
            </li>
          </ul>
        </div>
      );
  }
}
