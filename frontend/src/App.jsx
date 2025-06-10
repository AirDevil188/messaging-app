import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { validateToken } from "./utils/validateToken";
import Navigation from "./components/Navigation";

function App() {
  const [userObject, setUserObject] = useState({ token: null });

  useEffect(() => {
    const token = validateToken();

    if (token) {
      setUserObject({
        ...userObject,
        token: localStorage.getItem("token"),
        user: token.user,
        userImage: token.userImage,
      });
    }
  }, [userObject.token]);

  return (
    <>
      <Navigation userObject={userObject} />
      <Outlet
        context={{
          userObject: [userObject, setUserObject],
        }}
      ></Outlet>
    </>
  );
}

export default App;
