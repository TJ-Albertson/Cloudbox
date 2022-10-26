export const headerArray = [
  { text: "Name", sortBy: "name" },
  { text: "Date", sortBy: "updatedAt" },
  { text: "Type", sortBy: "mimeType" },
  { text: "Size", sortBy: "size" },
];

export const boxModalOptions = {
  type: "box",
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
  type: "share",
  headerimage: "bi bi-people-fill",
  headertext: "Share Setting",
  headersubtext: "These users have access to your files",
  buttonimage: "bi bi-trash3",
  buttontext: "Delete",
  formtext: "Email to share with",
  formimage: "bi bi-send-plus",
  formfunction: "share",
};
