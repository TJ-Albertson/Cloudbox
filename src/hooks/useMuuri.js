import { useRef, useEffect, useState } from "react";
import Muuri from "muuri";

export const useMuuri = (data, location, settings) => {
  const ref = useRef(null);
  const handleRef = useRef(null);

  
  const [key, setKey] = useState(0)

  useEffect(() => {
    //setKey(key + 1)
    if (location.id===0) {
    

    let grid = new Muuri(ref.current, { 
      dragEnabled: true,
      dragHandle: '.handle',
      layout: {
        fillGaps: true,
        rounding: true
      },
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
  }
  }, [data, location, settings]);

  return { ref, key};
};
