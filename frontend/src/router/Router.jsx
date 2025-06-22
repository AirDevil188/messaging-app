import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import LogIn, { handleLogin } from "../components/LogIn";
import SignUp, { handleSignUp } from "../components/Signup";
import Messages, { handleMessageSubmit } from "../components/Messages";
import {
  getAllChatRooms,
  getGlobalChatroom,
  getLoggedInUser,
  getUsers,
} from "../utils/loaders";
import ErrorElement from "../components/ErrorElement";
import GlobalChatroom, {
  handleGlobalMessageSubmit,
} from "../components/GlobalChatroom";
import Profile from "../components/Profile";
import Users, { handleUserMessageSubmit } from "../components/Users";

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
          action: handleUserMessageSubmit,
        },
        {
          path: "/messages",
          element: <Messages />,
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
        {
          path: "/profile",
          element: <Profile />,
          errorElement: <ErrorElement />,
          loader: getLoggedInUser,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
