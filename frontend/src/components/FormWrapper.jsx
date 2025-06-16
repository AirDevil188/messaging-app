import styles from "./FormWrapper.module.css";
import PropTypes from "prop-types";

const FormWrapper = ({
  id,
  name,
  isRequired,
  labelText,
  inputType,
  placeholder,
  className,
}) => {
  return (
    <section className={styles.formGroup}>
      <label htmlFor={name}>{labelText}</label>
      <input
        id={id}
        name={name}
        required={isRequired}
        type={inputType}
        placeholder={placeholder}
        className={className}
      ></input>
    </section>
  );
};

export default FormWrapper;

FormWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  className: PropTypes.string,
};
