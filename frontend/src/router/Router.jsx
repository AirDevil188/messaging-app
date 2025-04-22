import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../src/App";
import LogIn from "../src/components/LogIn";

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        {
          path: "/log-in",
          element: <LogIn />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
