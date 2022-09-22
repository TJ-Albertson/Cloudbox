import { React, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { ReactComponent as Cloud } from "../SVG/cloud.svg";
import video from "../assets/wispycloudysky.mp4";

import "../CSS/Login.css";

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    document.body.style.overflowY = "hidden"
  }, []);

  return (
    <div className="holder-object">
      <video className="background-video" autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>

      <Cloud className="cloud-login" onClick={() => loginWithRedirect()} />
    </div>
  );
}
