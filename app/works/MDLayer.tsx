import React from "react";

const MDLayer = ({ children }) => {
  return (
    <article className="prose mx-auto bg-white rounded shadow-xl my-8 p-10">
      {children}
    </article>
  );
};

export default MDLayer;
