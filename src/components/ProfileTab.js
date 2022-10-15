import { useState, useContext } from "react";
import { Image, Stack } from "react-bootstrap";
import { UserContext } from "./CloudBox";

import "../SCSS/ProfileTab.scss"

export default function ProfileTab(props) {
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const signedInUser = useContext(UserContext);

  return (
    <div id="profile-tab">
        <Stack direction="horizontal" id="profile-tab-header">
          <Image id="profile-tab-pic" src={signedInUser.picture} roundedCircle ></Image>
          <p>{signedInUser.username}</p>
        </Stack>
        <hr />


    </div>
    
  );
}
