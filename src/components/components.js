import React from "react";

// Button component.
export const AddButton = ({ onClick }) => (
  <button className="add-more-items btn btn-primary" onClick={onClick}>
    <i className="material-icons">&#xE145;</i>
    Add more items
  </button>
);

// Footer component.
export const Footer = ({ children }) => (
  <div className="grid-footer">{children}</div>
);

// Demo component.
export const Demo = ({ children }) => (
  <section className="grid-demo">{children}</section>
);
