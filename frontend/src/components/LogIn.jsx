import { Navigate, useFetcher, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Login.module.css";
import FormWrapper from "./FormWrapper";
import Button from "./Button";
import { handleFetch } from "../utils/handleFetch";

const LogIn = () => {
  const {
    userObject: [userObject, setUserObject],
  } = useOutletContext();
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data) {
      setUserObject({ ...userObject, token: fetcher.data.token });
    }
  }, [fetcher.data]);

  if (userObject.token) {
    return <Navigate replace={true} to={"/messages"} />;
  }

  return (
    <section className={styles.loginSection}>
      <fetcher.Form method={"post"}>
        <FormWrapper
          id={"username"}
          name={"username"}
          inputType={"text"}
          isRequired={true}
          labelText={"Username: "}
        ></FormWrapper>
        <FormWrapper
          id={"password"}
          name={"password"}
          inputType={"password"}
          isRequired={true}
          labelText={"Password: "}
        ></FormWrapper>
        <Button text={"Submit"}></Button>
      </fetcher.Form>
    </section>
  );
};

export const handleLogin = async ({ request }) => {
  const formData = await request.formData();
  const submission = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const res = await handleFetch("/log-in", submission, "post");
  console.log(res);
  if (res.ok) {
    const data = await res.json();
    const user = {
      token: data,
    };
    localStorage.setItem("token", user.token);
    return user;
  } else {
    return res.json();
  }
};
export default LogIn;
