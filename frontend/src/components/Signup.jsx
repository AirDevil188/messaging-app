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
    <section className={styles.signUpSection}>
      <fetcher.Form method="post">
        <FormWrapper
          labelText={"Username: "}
          inputType={"text"}
          id={"username"}
          name={"username"}
          isRequired={true}
        />
        <FormWrapper
          labelText={"Password: "}
          inputType={"password"}
          id={"password"}
          name={"password"}
          isRequired={true}
        ></FormWrapper>
        <FormWrapper
          labelText={"Confirm Password: "}
          inputType={"password"}
          id={"confirm_password"}
          name={"confirm_password"}
          isRequired={true}
        ></FormWrapper>
        <Button text={"Log In"} type={"submit"} />
      </fetcher.Form>
    </section>
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
