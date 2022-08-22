import { React, useEffect, useRef } from "react";

import "../CSS/TestDrag.css";
import "../CSS/CloudBox.css";

import Muuri from "muuri";

export default function TestDrag() {
  const ref = useRef(null)
  
  useEffect(() => {
    const grid = new Muuri(ref.current, {dragEnabled: true});
  }, []);

  return (
    <div className="grid" ref={ref}>
      <div class="item">
        <div class="item-content">This can be anything.</div>
      </div>

      <div class="item">
        <div class="item-content">
          <div class="my-custom-content">Yippee!</div>
        </div>
      </div>
    </div>
  );
}
