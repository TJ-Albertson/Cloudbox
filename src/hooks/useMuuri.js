import { useRef, useEffect } from "react";
import Muuri from "muuri";

export const useMuuri = (data) => {
  const ref = useRef(null);

  useEffect(() => {
    let grid = new Muuri(ref.current, { dragEnabled: true });
    return () => grid.destroy();
  }, [data]);

  return { ref };
};
