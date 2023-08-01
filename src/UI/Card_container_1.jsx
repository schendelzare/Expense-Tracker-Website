import React from "react";

const Card_container_1 = ({ children }) => {
  return (
    <div className="flex flex-col h-[200px] md:h-[500px] justify-center w-[300px] text-gray-200 mx-auto md:ml-0 px-6">
      {children}
    </div>
  );
};

export default Card_container_1;
