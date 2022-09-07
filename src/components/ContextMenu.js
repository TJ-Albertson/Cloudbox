import download from "downloadjs";
import { getApi } from "../api/getApi";

export default function ContextMenu(props) {

  function newFolder() {
    const { directory } = props.selection
    console.log(directory)
  }

  function deleteFile() {
    const { id, path, mimetype } = props.selection

  }

  function renameFile() {
    
  }

  const downloadFile = async (id, path, mimetype) => {
    const result = await getApi(`/downloadFile/${id}`, /*signedInUser.token*/);
    const split = path.split("/");
    const filename = split[split.length - 1];
    return download(result.data, filename, mimetype);
  };

  switch (props.type) {
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
            <li onClick={() => newFolder()}>
              <i className="bi bi-folder-plus"></i> New Folder
            </li>
          </ul>
        </div>
      );
  }
}
