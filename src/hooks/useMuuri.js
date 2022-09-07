import { useRef, useEffect } from "react";
import Muuri from "muuri";

export const useMuuri = (data) => {
  const ref = useRef(null);
  const handleRef = useRef(null);

  useEffect(() => {
    let grid = new Muuri(ref.current, { 
      dragEnabled: true,
      dragHandle: '.handle',
      dragPlaceholder: {
        enabled: true,
        createElement(item) {
          const placeholder = document.createElement("div");
          placeholder.innerHTML = '<div></div>';
          return placeholder;
        }
      } 
    });
    return () => grid.destroy();
  }, [data]);

  return { ref };
};
