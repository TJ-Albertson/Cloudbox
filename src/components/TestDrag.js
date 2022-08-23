import { React, useEffect, useRef } from "react";

import "../CSS/TestDrag.css";
import "../CSS/CloudBox.css";

import Muuri from "muuri";
import Box from "./Box";

export default function TestDrag(props) {
  const ref = useRef(null)
  
  useEffect(() => {
    const grid = new Muuri(ref.current, {dragEnabled: true});
  }, []);

  return (
    <div className="grid" ref={ref}>

        {props.emailgroup.map((email) => (
            <div className="item" key={email.toString()}>
                <Box
                    id={email}
                    email={email}
                />
            </div> 
        ))}
    </div>
  );
}
