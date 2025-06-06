import { useRouteError } from "react-router-dom";
import styles from "./ErrorElement.module.css";

const ErrorElement = () => {
  const errors = useRouteError();

  return (
    <section className={styles.errorsSection}>
      <p>{errors.message}</p>
    </section>
  );
};
export default ErrorElement;
