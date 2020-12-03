import React from "react";

const ItemMaker = ({ position }) => {
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "red",
        width: "100px",
        height: "100px",
        top: 500,
        left: 500,
      }}
    ></div>
  );
};

export default ItemMaker;
