import React, { useEffect } from "react";

const Alert = ({ children, onClick }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClick();
    }, [3000]);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="flex alert alert-info fixed w-[200px] md:w-[400px]  mt-5  "
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>{children}</span>
    </div>
  );
};

export default Alert;
