const Button = ({ children, type, onClick, isSubmitting }) => {
  return (
    <button
      disabled={isSubmitting}
      type={type}
      onClick={onClick}
      className="btn btn-primary font-normal "
    >
      {children}
    </button>
  );
};

export default Button;
