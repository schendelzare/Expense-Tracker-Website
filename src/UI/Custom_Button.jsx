import React, { Children } from "react";

const Custom_Button = ({ children }) => {
  return (
    <button className="border rounded-2xl py-[16px] px-[22px] text-sm font-arial font-bold hover:bg-cgrayborder ">
      {children}
    </button>
  );
};

export default Custom_Button;
