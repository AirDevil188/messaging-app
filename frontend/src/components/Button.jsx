import PropTypes from "prop-types";

const Button = ({ type, id, onSubmit, onClick, text }) => {
  return (
    <button type={type} id={id} onSubmit={onSubmit} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;

Button.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};
