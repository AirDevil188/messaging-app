import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import LogIn, { handleLogin } from "../components/LogIn";
import SignUp, { handleSignUp } from "../components/Signup";
import Users, { handleMessageSubmit } from "../components/Users";
import { getAllChatRooms, getGlobalChatroom, getUsers } from "../utils/loaders";
import ErrorElement from "../components/ErrorElement";
import GlobalChatroom, {
  handleGlobalMessageSubmit,
} from "../components/GlobalChatroom";

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
          errorElement: <ErrorElement />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
          action: handleSignUp,
          errorElement: <ErrorElement />,
        },
        {
          path: "/all-users",
          element: <Users />,
          loader: getUsers,
          action: handleMessageSubmit,
        },
        {
          path: "/messages",
          element: <Users />,
          loader: getAllChatRooms,
          action: handleMessageSubmit,
          errorElement: <ErrorElement />,
        },
        {
          path: "/global",
          loader: getGlobalChatroom,
          action: handleGlobalMessageSubmit,
          element: <GlobalChatroom />,
          errorElement: <ErrorElement />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
