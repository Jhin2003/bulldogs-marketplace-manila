import React from 'react';
import "./Grid.scss"
const Grid = ({ children, columns = 6 }) => {

  const gridStyle = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`
  };

  return (
    <div className="grid-container" style={gridStyle}>
      {children}
    </div>
  );
};

export default Grid;