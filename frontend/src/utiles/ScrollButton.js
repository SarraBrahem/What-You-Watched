// ScrollButton.js
import React from "react";
import "../../styles.css";

const ScrollButton = ({ direction, onClick }) => {
  const style = {
    position: "absolute",
    top: "50%",
    [direction === "left" ? "left" : "right"]: 0,
    transform: "translate(0%, -50%)",
    zIndex: 2,
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
  };

  return (
    <button onClick={onClick} style={style}>
      {direction === "left" ? "<" : ">"}
    </button>
  );
};

export default ScrollButton;
