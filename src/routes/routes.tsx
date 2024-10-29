import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { pageRoutes } from "./page.routes";
import { adminRoutes } from "./admin.routes";
import { userRoutes } from "./user.routes";
import PrivateRoute from "./PrivateRoute";
import { routeGenerator } from "../utils/routesGenerator";
import Dashboard from "../layouts/Dashboard";
import NotFoundError from "../components/error/NotFoundError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(pageRoutes),
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: routeGenerator(adminRoutes),
  },
  {
    path: "/user",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: routeGenerator(userRoutes),
  },
  {
    path: "*",
    element: <NotFoundError />,
  },
]);