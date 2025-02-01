import React from "react";
import "./FlexLayout.scss"; // Import external styles

const FlexLayout = ({ children, gap }) => {
  return (
    <div className="flex-container" style={{ gap: gap }}>
      {children}
    </div>
  );
};

export default FlexLayout;