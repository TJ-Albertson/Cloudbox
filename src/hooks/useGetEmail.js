import { useEffect, useState } from "react";
import { getEmail } from "../api/auth/getEmail";

export const useGetEmail = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    getEmail().then(setEmail);
  }, []);

  return { email, setEmail };
};
