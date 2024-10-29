import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Book from "../pages/book/Book";
import Reviews from "../pages/Reviews";
import Home from "../pages/root/Home";
import ServiceDetails from "../pages/root/ServiceDetails";
import Services from "../pages/root/Services";



export const pageRoutes = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/service-details/:id",
        element: <ServiceDetails />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "book-now",
        element: <Book />,
      },
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];