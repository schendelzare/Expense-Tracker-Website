import React from "react";

const Card = ({ children }) => {
  return (
    <div className="grid  grid-rows-2  md:grid-cols-2  mt-20 md:mt-6">
      {children}
    </div>
  );
};

export default Card;
