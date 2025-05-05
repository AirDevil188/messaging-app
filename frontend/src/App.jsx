import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { validateToken } from "./utils/validateToken";

function App() {
  const [userObject, setUserObject] = useState({ token: null });

  useEffect(() => {
    const token = validateToken();
    if (token) {
      setUserObject({ ...userObject, token: token });
    }
  }, [userObject.token]);

  return (
    <Outlet
      context={{
        userObject: [userObject, setUserObject],
      }}
    ></Outlet>
  );
}

export default App;
