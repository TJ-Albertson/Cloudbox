import React from "react";

export function FileImage(props) {
  switch (props.value) {
    case "Text Document":
      return <i className="bi bi-filetype-txt"></i>;
    case "MP4 File":
      return <i className="bi bi-film"></i>;
    case "JPG File":
      return <i className="bi bi-file-earmark-image"></i>;
    case "XLSX File":
      return <i className="bi bi-filetype-xlsx"></i>

    case "MP3 File":
      return <i className="bi bi-file-earmark-music"></i>
    case "JSON File":
      return <i className="bi bi-filetype-json"></i>
    case "DOCX File":
      return <i className="bi bi-file-earmark-word"></i>
    case "Application":
      return <i className="bi bi-filetype-exe"></i>
    case "PDF File":
      return <i className="bi bi-file-earmark-pdf"></i>
    case "CSV File":
      return <i className="bi bi-filetype-csv"></i>

    default:
      return <i className="bi bi-file-earmark-text"></i>;
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
