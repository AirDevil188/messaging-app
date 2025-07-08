import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { validateToken } from "./utils/validateToken";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {
  const [userObject, setUserObject] = useState({ token: null });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = validateToken();

    if (token) {
      setUserObject({
        ...userObject,
        token: localStorage.getItem("token"),
        user: token.user,
      });
    } else if (location.pathname !== "/sign-up") {
      navigate("/log-in");
    }
  }, [userObject.token]);

  return (
    <>
      {userObject.token ? (
        <>
          <Navigation userObject={userObject} setUserObject={setUserObject} />
          <Footer />
        </>
      ) : null}
      <Outlet
        context={{
          userObject: [userObject, setUserObject],
        }}
      ></Outlet>
    </>
  );
}

export default App;
