import { useEffect, useState } from "react";
import { getLogin } from "../api/auth/getLogin";
import { useNavigate } from "react-router-dom";

export const useGetLogin = (loginPage) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    getLogin().then(setLoggedIn);

    if(loginPage && loggedIn) {
      navigate("./cloudbox", { replace: true })
    } else if (!loginPage && loggedIn){
      navigate("../", { replace: true })
    }
  }, []);

  return { loggedIn };
};
