import styles from "./FormWrapper.module.css";

const FormWrapper = ({ id, name, isRequired, labelText, inputType }) => {
  return (
    <section className={styles.formGroup}>
      <label htmlFor={name}>{labelText}</label>
      <input id={id} name={name} required={isRequired} type={inputType}></input>
    </section>
  );
};

export default FormWrapper;
