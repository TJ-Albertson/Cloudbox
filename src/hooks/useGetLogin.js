import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../api/getLogin";

export const useGetLogin = () => {

  const [email, setEmail] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    getLogin()
    .then(setEmail)
  }, [])

  return { email, loggedIn}
};