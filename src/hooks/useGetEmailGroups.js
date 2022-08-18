import { useEffect, useState } from "react";
import { getEmailGroups } from "../api/group/getEmailGroups";
import { useApi } from "./useApi";

export const useGetEmailGroups = () => {
  const [emailGroups, setEmailGroups] = useState({
    boxArray: [],
    emailArray: [],
    shareArray: [],
  });

  return { emailGroups, setEmailGroups};
};
