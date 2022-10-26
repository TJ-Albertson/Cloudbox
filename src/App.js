import { React } from "react"
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Route, Routes } from "react-router-dom";

import Login from "./components/Login"
import CloudBox from "./components/CloudBox"
import Home from "./components/Home"
import List from "./components/List";
import MyBoxes from "./components/MyBoxes"

import "bootstrap-icons/font/bootstrap-icons.css";
import "./SCSS/App.scss";

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component {...args}/>;
};

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<ProtectedRoute component={CloudBox}/>}>
          <Route path="/dashboard/my-boxes" element={<ProtectedRoute component={MyBoxes} />} />
          <Route path="/dashboard/recent" element={<ProtectedRoute component={List} recent/>} />
          <Route path="/dashboard/starred" element={<ProtectedRoute component={List} starred/>} />
          <Route path="/dashboard/trash" element={<ProtectedRoute component={List} trash/>} />
          <Route path="/dashboard/storage" element={<ProtectedRoute component={List} storage/>} />
        </Route>
      </Routes>
    </div>
  )
}