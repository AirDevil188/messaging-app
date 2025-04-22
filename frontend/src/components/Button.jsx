import PropTypes from "prop-types";

const Button = ({ type, id, onSubmit, onClick, text }) => {
  return (
    <button type={type} id={id} onSubmit={onSubmit} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
