import { React } from "react"
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Route, Routes } from "react-router-dom";

import Login from "./components/Login"
import CloudBox from "./components/CloudBox"

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/cloudbox" element={<ProtectedRoute component={CloudBox}/>} />
      </Routes>
    </div>
  )
}


//need profile settings + profile pics in boxes
//ability to enalrge box like modal