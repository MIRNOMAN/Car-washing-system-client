import Home from "@/pages/home/Home";
import Details from "@/pages/details/Details";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Reviews from "@/pages/Reviews";
import Service from "@/pages/service/Service";
import Book from "@/pages/book/Book";
import ServiceCompare from "@/pages/ServiceCompare";

export const pageRoutes = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/service-details/:id",
        element: <Details />,
      },
      {
        path: "services",
        element: <Service />,
      },
      {
        path: "services-compare",
        element: <ServiceCompare />,
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
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
];