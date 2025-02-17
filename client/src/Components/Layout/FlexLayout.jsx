import React from "react";
import "./FlexLayout.scss"; // Import external styles

const FlexLayout = ({ children, gap, padding = {} }) => {
  const { top = "2rem", right = "18rem", bottom = "2rem", left = "18rem" } = padding;

  return (
    <div
      className="flex-container"
      style={{
        gap: gap,
        padding: `${top} ${right} ${bottom} ${left}`,
      }}
    >
      {children}
    </div>
  );
};

export default FlexLayout;