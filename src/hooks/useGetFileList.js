import { useEffect, useState } from "react";
import { getFileList } from "../api/file/getFileList";

export const useGetFileList = (email) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    getFileList(email).then(setFileList);
  }, [email]);

  return { fileList };
};
