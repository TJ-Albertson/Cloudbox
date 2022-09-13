import download from "downloadjs";

import { useContext } from "react";
import { UserContext } from "./CloudBox";
import { fetchApi } from "../api/fetchApi";

export default function ContextMenu(props) {
  const signedInUser = useContext(UserContext);

  async function newFolder() {
    const { directory } = props.selection;

    const data = new URLSearchParams({
      owner: signedInUser.email,
      name: "New Folder",
      mimeType: "File folder",
      directory: directory,
    });

    const options = {
      method: "POST",
      body: data,
      token: signedInUser.token,
      headers: ["application/x-www-form-urlencoded"],
    };

    await fetchApi("/files/folder", options).then(props.refreshFiles);
  }

  async function deleteFile() {
    const { id } = props.selection;

    const options = {
      method: "DELETE",
      token: signedInUser.token,
    };

    await fetchApi(`/files/${id}`, options).then(props.refreshFiles);
  }

  async function renameFile() {
    const { id, newName } = props.selection;

    const options = {
      method: "PATCH",
      body: { id, newName },
      token: signedInUser.token,
    };

    await fetchApi("/files", options);
  }

  const downloadFile = async () => {
    //const result = await getApi(`/files/${id}`, signedInUser.token);

    const { id, path, mimetype } = props.selection;

    const options = {
      method: "GET",
      token: signedInUser.token,
    };

    const result = await fetchApi(`/files/${id}`, options).then(
      props.refreshFiles
    );

    console.log(result);

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
            <li onClick={() => downloadFile()}>
              <i className="bi bi-download"></i> Download
            </li>
            <li>
              <i className="bi bi-pencil-square"></i> Rename
            </li>
            <hr className="hr-override"></hr>
            <li onClick={() => deleteFile()}>
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
            <li onClick={() => deleteFile()}>
              <i className="bi bi-trash"></i> Delete
            </li>
          </ul>
        </div>
      );
    case "other":
      return (
        <div
          className="menu"
          style={{ top: props.points.y, left: props.points.x, zIndex: 4 }}
        >
          <ul className="bootstrap-overrides">
            <li onClick={() => downloadFile()}>
              <i className="bi bi-download"></i> Download
            </li>
          </ul>
        </div>
      );
    case "empty":
      return (
        <div
          className="menu"
          style={{ top: props.points.y, left: props.points.x, zIndex: 4 }}
        >
          <ul className="bootstrap-overrides">
            <li onClick={() => newFolder()}>
              <i className="bi bi-folder-plus"></i> New Folder
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
            <li onClick={() => newFolder()}>
              <i className="bi bi-folder-plus"></i> New Folder
            </li>
          </ul>
        </div>
      );
  }
}
