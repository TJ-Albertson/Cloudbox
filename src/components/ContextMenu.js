export default function ContextMenu(props) {

  function newFolder() {
    
  }

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
            <li onClick={() => console.log(props.selectedfile)}>
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
            <li onClick={() => console.log(props.selectedfile)}>
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
            <li onClick={() => console.log(props.selectedfile)}>
              <i className="bi bi-folder-plus"></i> New Folder
            </li>
          </ul>
        </div>
      );
  }
}
