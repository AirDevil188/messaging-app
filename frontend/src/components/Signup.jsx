import {
  Navigate,
  redirect,
  useFetcher,
  useOutletContext,
} from "react-router-dom";
import styles from "./Signup.module.css";
import FormWrapper from "./FormWrapper";
import Button from "./Button";
import { handleFetch } from "../utils/handleFetch";
import { useEffect, useState } from "react";

const SignUp = () => {
  const fetcher = useFetcher();

  const {
    userObject: [userObject, setUserObject],
  } = useOutletContext();
  const [errors, setErrors] = useState(null);
  const [errorInputs, setErrorInputs] = useState({});

  useEffect(() => {
    if (fetcher.data) {
      setErrors(fetcher.data[0].errors);
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (errors) {
      errors.map((error) => {
        switch (error.path) {
          case "username":
            setErrorInputs((prevObject) => ({ ...prevObject, username: true }));
            break;

          case "password":
            setErrorInputs((prevObject) => ({ ...prevObject, password: true }));

            break;

          case "confirm_password":
            setErrorInputs((prevObject) => ({
              ...prevObject,
              confirm_password: true,
            }));

            break;
        }
      });
    }
  }, [errors]);

  if (userObject.token) {
    return <Navigate to={"/messages"} replace={true} />;
  }

  return (
    <main className={styles.mainSignup}>
      <section className={styles.signupSection}>
        <section className={styles.signupWrapper}>
          <section className={styles.headingSection}>
            <h1>Create a Account</h1>
          </section>
          <hr />
          <section className={styles.signupFormSection}>
            {errors ? (
              <section className={styles.errorSection}>
                <ul>
                  {errors.map((error) => {
                    return <li key={error.path}>{error.msg}</li>;
                  })}
                </ul>
              </section>
            ) : null}
            <fetcher.Form method="post" className={styles.signupForm}>
              <FormWrapper
                inputType={"text"}
                id={"username"}
                name={"username"}
                isRequired={true}
                placeholder={"Username"}
                style={
                  errorInputs?.username
                    ? { backgroundColor: "#ef9a9a", border: "1px solid red" }
                    : null
                }
              />
              <FormWrapper
                inputType={"password"}
                id={"password"}
                name={"password"}
                isRequired={true}
                placeholder={"Password"}
                style={
                  errorInputs?.password
                    ? { backgroundColor: "#ef9a9a", border: "1px solid red" }
                    : null
                }
              ></FormWrapper>
              <FormWrapper
                inputType={"password"}
                id={"confirm_password"}
                name={"confirm_password"}
                isRequired={true}
                placeholder={"Confirm Password"}
                style={
                  errorInputs?.confirm_password
                    ? { backgroundColor: "#ef9a9a", border: "1px solid red" }
                    : null
                }
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
  const res = await handleFetch(
    "/sign-up",
    JSON.stringify(submission),
    "post",
    {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    }
  );
  if (res.ok) {
    return redirect("/log-in");
  }

  if (res.status === 422) {
    return res.json();
  }
};

export default SignUp;
