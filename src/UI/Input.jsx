import React, { Children } from "react";

const Input = ({
  onChange,
  id,
  type,
  placeholder,
  className,
  maxLength,
  minLength,
}) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required
      minLength={minLength}
      maxLength={maxLength}
      className={`rounded-lg ${className}`}
    />
  );
};

export default Input;
