import React from "react";
import "./FlexRow.scss"; // Import external styles

const FlexRow = ({ children, gap, padding = {} }) => {
  const { top = "2rem", right = "18rem", bottom = "2rem", left = "18rem" } = padding;

  return (
    <div
      className="flex-row-container"
      style={{
        gap: gap,
        padding: `${top} ${right} ${bottom} ${left}`,
      }}
    >
      {children}
    </div>
  );
};

export default FlexRow