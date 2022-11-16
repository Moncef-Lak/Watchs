import React from "react";
import {NavLink} from "react-router-dom";

function Button({children,fontSize, PxVwCmEm, padding, color}) {
  const Style = {
    fontSize: fontSize + PxVwCmEm,
    color: color,
    padding: padding,
  };
  return (
    <NavLink>
      <button style={Style} className="button-one">
        {children}
      </button>
    </NavLink>
  );
}

export { Button, };
