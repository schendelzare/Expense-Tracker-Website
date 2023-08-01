import React from "react";
import errorImg from "../../assets/404.png";

const ErrorHandler = React.memo(() => {
  return (
    <div className="flex items-center justify-center m-auto">
      <img className="md:max-w-4xl" src={errorImg} />
    </div>
  );
});

export default ErrorHandler;
