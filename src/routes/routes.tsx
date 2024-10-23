import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFoundError from "../components/error/NotFoundError";
import Home from "../pages/root/Home";
import Booking from "../pages/root/Booking";
import Services from "../pages/root/Services";
import ServiceDetails from "../pages/root/ServiceDetails";
import ProfileSettings from "../pages/profile/ProfileSettings";
import Payout from "../pages/root/payment/Payout";
import Contact from "../pages/root/Contact";
import Recover from "../pages/auth/Recover";
import AllReviews from "../components/Home/AllReviews";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    errorElement: <NotFoundError/>,
    children: [
      { index: true, element: <Home /> },
      { path: '/booking', element: <Booking  /> },
      { path: '/services', element: <Services  /> },
      { path: '/contact', element: <Contact/> },
      { path: '/reviews', element: <AllReviews/> },
      { path: '/services/details/:_id', element: <ServiceDetails /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/recover', element: <Recover /> },
      { path: '/profile/settings', element: <ProfileSettings /> },
      { path: '/user/booking/payout/:bookingId', element: <Payout /> },


      // admin

      // {
      //   path: '/dashboard/admin',
      //   element: <RoleGard role="admin"> <AdminRoot /></RoleGard>,
      //   children: [
      //     { path: 'overview', element: <AdminOverview /> },
      //     { path: 'vehicles/manage/view', element: <AllVehicles /> },
      //     { path: 'vehicles/manage/new', element: <AddVehicle /> },
      //     { path: 'vehicles/manage/edit/:_id', element: <EditVehicle /> },
      //     { path: 'bookings/manage/upcoming', element: <UpcomingBookings /> },
      //     { path: 'bookings/manage/ongoing', element: <OngoingBookings /> },
      //     { path: 'bookings/manage/success', element: <SuccessfulBookings /> },
      //     { path: 'bookings/manage/canceled', element: <CanceledBookings /> },
      //     { path: 'users/manage/admins', element: <Admins /> },
      //     { path: 'users/manage/customers', element: <Customers /> },
      //   ]
      // },


      // {
      //   path: '/dashboard/user',
      //   element: <RoleGard role="user"><UserRoot /></RoleGard>,
      //   children: [
      //     { path: 'overview', element: <UserOverview /> },
      //     { path: 'bookings/manage', element: <Bookings /> },

      //   ]
      // }
    ]
    },
    
   
  ]);
  
  export default router;
  