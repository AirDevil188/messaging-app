import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Login.module.css";
import Form from "./Form";
import FormWrapper from "./FormWrapper";
import Button from "./Button";

const LogIn = () => {
  //   const {
  //     userObject: [userObject, setUserObject],
  //   } = useOutletContext();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (userObject.token) {
  //       navigate("/");
  //     }
  //   }, [userObject.token]);

  return (
    <section className={styles.loginSection}>
      <Form method={"post"}>
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
      </Form>
    </section>
  );
};

export default LogIn;
