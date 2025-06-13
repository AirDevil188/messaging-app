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
    <main>
      <section className={styles.loginSection}>
        <section className={styles.loginWrapper}>
          <section className={styles.headingSection}>
            <h1>Login to Your Account</h1>
          </section>

          <section className={styles.socialIconsSection}>
            <ul>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0,0,256,256"
                  style={{ fill: "#27b498" }}
                >
                  <g
                    fill="#27b498"
                    fillRule="nonzero"
                    stroke="none"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray=""
                    strokeDashoffset="0"
                    fontFamily="none"
                    fontWeight="none"
                    fontSize="none"
                    textAnchor="none"
                    style={{ mixBlendMode: "normal" }}
                  >
                    <g transform="scale(5.12,5.12)">
                      <path d="M25,3c-12.15,0 -22,9.85 -22,22c0,11.03 8.125,20.137 18.712,21.728v-15.897h-5.443v-5.783h5.443v-3.848c0,-6.371 3.104,-9.168 8.399,-9.168c2.536,0 3.877,0.188 4.512,0.274v5.048h-3.612c-2.248,0 -3.033,2.131 -3.033,4.533v3.161h6.588l-0.894,5.783h-5.694v15.944c10.738,-1.457 19.022,-10.638 19.022,-21.775c0,-12.15 -9.85,-22 -22,-22z"></path>
                    </g>
                  </g>
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0,0,256,256"
                  style={{ fill: "#27b498" }}
                >
                  <g
                    fill="#27b498"
                    fillRule="nonzero"
                    stroke="none"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray=""
                    strokeDashoffset="0"
                    fontFamily="none"
                    fontWeight="none"
                    fontSize="none"
                    textAnchor="none"
                    style={{ mixBlendMode: "normal" }}
                  >
                    <g transform="scale(4,4)">
                      <path d="M32.52148,6c-14.363,0 -26.00586,11.642 -26.00586,26c0,14.358 11.64286,26 26.00586,26c21.688,0 26.57697,-20.13403 24.54297,-30.33203h-5.88281h-1.91211h-16.75391v8.66602h16.76367c-1.92754,7.47083 -8.69118,12.99805 -16.76367,12.99805c-9.572,0 -17.33398,-7.76003 -17.33398,-17.33203c0,-9.572 7.76198,-17.33203 17.33398,-17.33203c4.353,0 8.31928,1.61563 11.36328,4.26563l6.1543,-6.1543c-4.623,-4.212 -10.76672,-6.7793 -17.51172,-6.7793z"></path>
                    </g>
                  </g>
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0,0,256,256"
                  style={{ fill: " #27b498" }}
                >
                  <g
                    fillRule="nonzero"
                    stroke="none"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray=""
                    strokeDashoffset="0"
                    fontFamily="none"
                    fontWeight="none"
                    fontSize="none"
                    textAnchor="none"
                    style={{ mixBlendMode: "normal" }}
                  >
                    <g transform="scale(5.12,5.12)">
                      <path d="M41,4h-32c-2.76,0 -5,2.24 -5,5v32c0,2.76 2.24,5 5,5h32c2.76,0 5,-2.24 5,-5v-32c0,-2.76 -2.24,-5 -5,-5zM17,20v19h-6v-19zM11,14.47c0,-1.4 1.2,-2.47 3,-2.47c1.8,0 2.93,1.07 3,2.47c0,1.4 -1.12,2.53 -3,2.53c-1.8,0 -3,-1.13 -3,-2.53zM39,39h-6c0,0 0,-9.26 0,-10c0,-2 -1,-4 -3.5,-4.04h-0.08c-2.42,0 -3.42,2.06 -3.42,4.04c0,0.91 0,10 0,10h-6v-19h6v2.56c0,0 1.93,-2.56 5.81,-2.56c3.97,0 7.19,2.73 7.19,8.26z"></path>
                    </g>
                  </g>
                </svg>
              </li>
            </ul>
          </section>
          <hr />
          <section className={styles.loginFormSection}>
            <fetcher.Form method={"post"}>
              <FormWrapper
                id={"username"}
                name={"username"}
                inputType={"text"}
                isRequired={true}
                placeholder={"Username"}
              ></FormWrapper>
              <FormWrapper
                id={"password"}
                name={"password"}
                inputType={"password"}
                isRequired={true}
                placeholder={"Password"}
              ></FormWrapper>
              <Button text={"Sign In"} className={styles.loginButton}></Button>
            </fetcher.Form>
          </section>
        </section>
      </section>
      <section className={`${styles.signupSection} ${styles.fadeIn}`}>
        <section className={styles.signupWrapper}>
          <section className={styles.headingSection}>
            <h1>New Here?</h1>
          </section>
          <section className={styles.smallSection}>
            <small>
              Sign up and discover a great amount of new opportunities!
            </small>
          </section>
          <section className={styles.buttonSection}>
            <a href="/sign-up">
              <Button
                type={"button"}
                text={"Sign up"}
                className={styles.signupButton}
              />
            </a>
          </section>
        </section>
      </section>
    </main>
  );
};

export const handleLogin = async ({ request }) => {
  const formData = await request.formData();
  const submission = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const res = await handleFetch("/log-in", submission, "post");

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
