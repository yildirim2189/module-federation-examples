import React, { useEffect } from "react";

const ExportredTitle = () => {
  console.log("---------loading remote component---------");
  useEffect(() => {
    console.log("HOOKS WORKS");
    window.__webpack_share_scopes__ = __webpack_share_scopes__;
  }, []);
  return (
    <div className="hero">
      <h1 className="title">
        {" "}
        This came fom <code>next1</code> !!!
      </h1>
      <p className="description">And it works like a charm v2</p>
    </div>
  );
};

export default ExportredTitle;
