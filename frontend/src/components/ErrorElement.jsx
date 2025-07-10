import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import styles from "./ErrorElement.module.css";
import { TbFaceIdError } from "react-icons/tb";

const ErrorElement = () => {
  const errors = useRouteError();
  console.log(isRouteErrorResponse(errors));
  return (
    <main className={styles.mainErrors}>
      {isRouteErrorResponse(errors) ? (
        <section className={styles.errorsSection}>
          <section className={styles.errorsWrapper}>
            <section className={styles.errorIcon}>
              <TbFaceIdError size={300} />
            </section>
            <h1>
              {errors.status} {errors.statusText}
            </h1>
            <section className={styles.buttonSection}>
              <a href="/">
                <button type="button">Go Back</button>
              </a>
            </section>
          </section>
        </section>
      ) : (
        <section className={styles.errorsSection}>
          <p>{errors.message}</p>
        </section>
      )}
    </main>
  );
  // <section className={styles.errorsSection}>
  //   <p>{errors.message}</p>
  // </section>
};
export default ErrorElement;
