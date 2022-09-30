import download from "downloadjs";

import { useContext } from "react";
import { UserContext } from "./CloudBox";

export default function ContextMenu(props) {
  const signedInUser = useContext(UserContext);

  async function newFolder() {
    const { directory } = props.selection;

    console.log(directory);
    let id = Math.random() * 10000;

    props.newfolder({
      _id: id,
      owner: "johndoe@email.com",
      name: "New Folder",
      size: "0",
      directory: directory,
      path: "0",
      mimeType: "File folder",
      updatedAt: "2022-09-13T20:46:13.988+00:00",
    });
  }

  async function deleteFile() {
    const { id } = props.selection;

    const options = {
      method: "DELETE",
      token: signedInUser.token,
    };
  }

  const downloadFile = async () => {
    //const result = await getApi(`/files/${id}`, signedInUser.token);

    const { id, path, mimetype } = props.selection;

    const options = {
      method: "GET",
      token: signedInUser.token,
    };

    /*
    const split = path.split("/");
    const filename = split[split.length - 1];
    return download(result.data, filename, mimetype);
    */
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
            <li onClick={() => props.showRenameModal(true)}>
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
            <li onClick={() => props.showRenameModal(true)}>
              <i className="bi bi-pencil-square"></i> Rename
            </li>
            <hr className="hr-override"></hr>
            <li onClick={() => deleteFile()}>
              <i className="bi bi-trash"></i> Delete
            </li>
          </ul>
        </div>
      );
    case "otherFile":
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
  }
}
