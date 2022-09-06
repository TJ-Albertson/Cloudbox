import { useEffect } from "react";
import Dropzone from "dropzone";

export const useDropZone = () => {
    const dropZoneRef = useRef(null);

  useEffect(() => {
    let myDropzone = Dropzone(dropZoneRef.current, {
      paramName: "file",
      maxFilesize: 2,
    });
    return
  }, []);

  return { dropZoneRef }
};
