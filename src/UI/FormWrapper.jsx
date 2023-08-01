import React from "react";

const FormWrapper = ({ children, className }) => {
  return (
    <div className="flex h-[400px] ">
      <div
        className={`flex flex-col min-w-[320px] md:min-w-[380px] shadow-xl shadow-cgrayborder border border-[#a8b3cf33] hover:border-cyellow m-auto p-4 items-center rounded-3xl  ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
