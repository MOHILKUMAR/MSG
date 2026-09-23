import Login from "./Login.jsx";
import Browse from "./Browse.jsx";
import AuthLayout from "./AuthLayout.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

// Created once at module level; re-creating it on render would reset navigation.
const appRouter = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
    ],
  },
]);

const Body = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
