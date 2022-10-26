import { useEffect } from "react";

export const useContextMenu = () => {

    const [points, setPoints] = useState({ x: 0, y: 0 });
    const [selection, setSelection] = useState({});
    const [showContextMenu, setShowContextMenu] = useState(false);

    useEffect(() => {
        const handleClick = () => setShowContextMenu(false);
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
      }, []);

  return {};
};
