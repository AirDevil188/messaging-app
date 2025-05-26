import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import LogIn, { handleLogin } from "../components/LogIn";
import SignUp, { handleSignUp } from "../components/Signup";
import Users, { handleMessageSubmit } from "../components/Users";
import { getUsers } from "../utils/loaders";

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        {
          path: "/",
        },
        {
          path: "/log-in",
          element: <LogIn />,
          action: handleLogin,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
          action: handleSignUp,
        },
        {
          path: "all-users",
          element: <Users />,
          loader: getUsers,
          action: handleMessageSubmit,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
