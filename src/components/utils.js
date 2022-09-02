import React from "react";

export const boxModalOptions = {
  headerimage: "bi bi-box-fill",
  headertext: "Add Box",
  headersubtext: "These users have granted you access to their files",
  buttonimage: "bi bi-plus-square",
  buttontext: "Add",
  formtext: "Request access",
  formimage: "bi bi-envelope-plus",
  formfunction: "box",
};

export const shareModalOptions = {
  headerimage: "bi bi-people-fill",
  headertext: "Share Setting",
  headersubtext: "These users have access to your files",
  buttonimage: "bi bi-trash3",
  buttontext: "Delete",
  formtext: "Email to share with",
  formimage: "bi bi-send-plus",
  formfunction: "share",
};

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