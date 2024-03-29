import React from "react";

export function FileImage(props) {
  switch (props.value) {
    case "text/plain":
      return <i className="bi bi-filetype-txt"></i>;
    case "video/mp4":
      return <i className="bi bi-film"></i>;
    case "image/jpeg":
      return <i className="bi bi-file-earmark-image"></i>;
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return <i className="bi bi-filetype-xlsx"></i>
    default:
      return <i className="bi bi-file-earmark-text"></i>;
  }
}

export function FileType(props) {
  switch (props.value) {
    case "text/plain":
      return "Text Document"
    case "mp4":
      return "MP4 File"
    case "jpg":
      return "JPG File"
    default:
      return props.value
  }
}

export function localDate(dateString) {
  const date = new Date(dateString);
  let regex = /:\d\d\s/i;
  return date.toLocaleString().replace(",", "").replace(regex, " ");
}


export const useSortableData = (items, config = null) => {
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
