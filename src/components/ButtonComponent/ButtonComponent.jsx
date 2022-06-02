import React from "react";

export const ButtonComponent = ({ hamdFuntion, children }) => (
  <div>
    <button type="button" onClick={hamdFuntion}>
      {children}
    </button>
  </div>
);
