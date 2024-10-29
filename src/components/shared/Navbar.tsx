import { logout, TUser, useCurrentUser } from "../../redux/features/auth/authSlice";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { IoMenu } from "react-icons/io5";
import { MenuLinks } from "../../utils/list.utils";
import { useGetMyBookingQuery } from "../../redux/features/booking/booking.api";
import { filterUpcomingBookings, getTargetDateTime } from "../../utils/utils";
import { TBooking } from "../../types/booking.type";
import CountdownTimer from "./CountdownTimer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineCloseSquare } from "react-icons/ai";

const Navbar = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const dispatch = useAppDispatch();

  // Get the current location path
  const { pathname } = useLocation();
  const currentRoute = pathname.split('/')[1]; // Extract the first segment after the leading '/'

  // upcoming booking
  const { data, isLoading, error } = useGetMyBookingQuery(undefined);
  const bookingData = data?.data || [];
  const latestBooking = filterUpcomingBookings(bookingData) as TBooking | null;

  const latestDateAndTime = latestBooking
    ? getTargetDateTime(latestBooking.slot.date, latestBooking.slot.startTime)
    : null;

  const handleLogout = () => {
    dispatch(logout());
  };

  const conditionalLinks = (
    <>
      {!user && (
        <Link to={"/login"} className="primary-border-btn">
          Login
        </Link>
      )}
      {user && (
        <div className="flex lg:flex-row flex-col lg:items-center gap-3">
          <Link to={`/${user.role}/dashboard`}>Dashboard</Link>
          {latestDateAndTime && !isLoading && !error && (
            <CountdownTimer targetDateTime={latestDateAndTime} />
          )}
          <button onClick={handleLogout} className="primary-border-btn">
            Logout
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="h-[60px] flex justify-between items-center lg:px-[60px] px-5 py-2 bg-primary-foreground/10 text-slate-950">
      <Link to={"/"} className="flex gap-x-2 items-center">
        <p className="scale-100 cursor-pointer uppercase font-bold rounded-2xl px-3 py-2 text-2xl transition-all duration-200 hover:scale-110">
          <h2>Quick<span className='text-rose-600'>Wash</span></h2>
        </p>
      </Link>
      
      <div className="md:flex items-center gap-x-3 font-medium hidden">
        {MenuLinks?.map((menu, idx) => (
          <div key={idx} className="group relative">
            <Link to={menu?.path} className={currentRoute === menu.path.split('/')[1] ? 'text-rose-600' : ''}>
              {menu?.name}
            </Link>
            {/* Route indicator */}
            <span className={`mt-[2px] h-[3px] ${currentRoute === menu.path.split('/')[1] ? 'w-full' : 'w-0'} rounded-full bg-rose-600 transition-all duration-300 group-hover:w-full`}></span>
          </div>
        ))}
        {conditionalLinks}
      </div>
      <div className="md:hidden block">
        <Drawer direction="right">
          <DrawerTrigger>
            <IoMenu className="text-2xl" />
          </DrawerTrigger>
          <DrawerContent className="right-0 top-0 mt-0 ms-[200px] rounded-r-none">
            <DrawerClose className="flex justify-end m-2">
              <AiOutlineCloseSquare className="text-3xl p-1" />
            </DrawerClose>
            <div className="flex flex-col w-[200px] gap-y-3 font-medium px-4">
              {MenuLinks?.map((menu, idx) => (
                <div key={idx} className="group relative">
                  <Link to={menu?.path} className={currentRoute === menu.path.split('/')[1] ? 'text-rose-600' : ''}>
                    {menu?.name}
                  </Link>
                  {/* Route indicator */}
                  <span className={`mt-[2px] h-[3px] ${currentRoute === menu.path.split('/')[1] ? 'w-full' : 'w-0'} rounded-full bg-rose-600 transition-all duration-300 group-hover:w-full`}></span>
                </div>
              ))}
              {conditionalLinks}
              {latestDateAndTime && !isLoading && !error && (
                <CountdownTimer targetDateTime={latestDateAndTime} />
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
