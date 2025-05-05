import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import LogIn, { handleLogin } from "../components/LogIn";
import SignUp, { handleSignUp } from "../components/Signup";
import ErrorBoundary from "../components/ErrorBoundary";

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
