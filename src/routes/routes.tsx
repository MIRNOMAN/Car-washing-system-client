import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    // {
    //   path: "/admin",
    //   element: (
    //     <ProtectedRoute role="admin">
    //       <App />
    //     </ProtectedRoute>
    //   ),
    //   children: routeGenarator(adminPaths),
    // },
    {
      path: "/login",
      element: <Login />,
    },
   
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  
  export default router;
  