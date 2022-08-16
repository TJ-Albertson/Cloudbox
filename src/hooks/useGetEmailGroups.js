import { useEffect, useState } from "react";
import { getEmailGroups } from "../api/group/getEmailGroups";

export const useGetEmailGroups = () => {
  const [emailGroups, setEmailGroups] = useState({
    boxArray: [],
    emailArray: [],
    shareArray: [],
  });

  useEffect(() => {
    getEmailGroups().then(setEmailGroups);
  }, []);

  return { emailGroups, setEmailGroups};
};
