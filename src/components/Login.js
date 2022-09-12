import { React } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import gif from "../Videos/hacker.gif"

export default function Login(props) {
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()} style={{color: "red", fontSize: "50px", fontFamily: 'Courier New', fontWeight: "bold"}}>Log In</button>;
  };

  return (
    <div>

      <div style={{color: "red", fontSize: "50px", fontFamily: 'Courier New', fontWeight: "bold", position: "absolute"}} >Welcome to getvirus.net</div>
      <img src={gif} style={{width: "100%", height: "10%", zIndex: "-2"}}/>
      <div className="position-absolute top-50 start-50 translate-middle z-index-1">
        <LoginButton />
      </div>
    </div>
  );
}
