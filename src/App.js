import { React } from "react";
import { Route, Routes } from "react-router-dom";

import CloudBox from "./components/CloudBox";
import Home from "./components/Home";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./SCSS/App.scss";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<CloudBox />} />
      </Routes>
    </div>
  );
}
