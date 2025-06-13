import {
  Navigate,
  redirect,
  useFetcher,
  useOutletContext,
} from "react-router-dom";
import styles from "./SignUp.module.css";
import FormWrapper from "./FormWrapper";
import Button from "./Button";
import { handleFetch } from "../utils/handleFetch";

const SignUp = () => {
  const fetcher = useFetcher();
  const {
    userObject: [userObject, setUserObject],
  } = useOutletContext();

  if (userObject.token) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <main>
      <section className={styles.signupSection}>
        <section className={styles.signupWrapper}>
          <section className={styles.headingSection}>
            <h1>Create a Account</h1>
          </section>
          <hr />
          <section className={styles.signupFormSection}>
            <fetcher.Form method="post">
              <FormWrapper
                inputType={"text"}
                id={"username"}
                name={"username"}
                isRequired={true}
                placeholder={"Username"}
              />
              <FormWrapper
                inputType={"password"}
                id={"password"}
                name={"password"}
                isRequired={true}
                placeholder={"Password"}
              ></FormWrapper>
              <FormWrapper
                inputType={"password"}
                id={"confirm_password"}
                name={"confirm_password"}
                isRequired={true}
                placeholder={"Confirm Password"}
              ></FormWrapper>
              <Button
                text={"Sign up"}
                type={"submit"}
                className={styles.signupButton}
              />
            </fetcher.Form>
          </section>
        </section>
      </section>
      <section className={`${styles.loginSection} ${styles.fadeIn}`}>
        <section className={styles.loginWrapper}>
          <section className={styles.headingSection}>
            <h1>Already have an account?</h1>
          </section>
          <section className={styles.smallSection}>
            <small>We are happy to see you back!</small>
          </section>
          <section className={styles.buttonSection}>
            <a href="/log-in">
              <Button
                type={"button"}
                text={"Sign in"}
                className={styles.loginButton}
              />
            </a>
          </section>
        </section>
      </section>
    </main>
  );
};

export const handleSignUp = async ({ request }) => {
  const formData = await request.formData();
  const submission = {
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const res = await handleFetch("/sign-up", submission, "post");
  if (res.ok) {
    return redirect("/");
  }
};

export default SignUp;
