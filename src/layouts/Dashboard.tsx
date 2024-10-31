import { TUser, useCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

type TRoute = {
  path: string;
  name: string;
  children?: TRoute[];
};

const adminRoutes: TRoute[] = [
  {
    path: "/service-management",
    name: "Service Management",
  },
  {
    path: "/slot-management",
    name: "Slot Management",
  },
  {
    path: "/user-management",
    name: "User Management",
    children: [
      {
        path: "/user-management/bookings",
        name: "Bookings",
      },
      {
        path: "/user-management",
        name: "User Management",
      },
    ],
  },
];

const userRoutes: TRoute[] = [
  {
    path: "/profile",
    name: "Profile",
  },
  {
    path: "/past-bookings",
    name: "Past Bookings",
  },
  {
    path: "/upcoming-bookings",
    name: "Upcoming Bookings",
  },
];

const Dashboard = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const userRole = {
    ADMIN: "admin",
    USER: "user",
  };
  
  const sidebarItems = user?.role === userRole.ADMIN ? adminRoutes : userRoutes;

  return (
    <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
      <h1 className="border-b py-6 text-4xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        {/* Sidebar Menu for Larger Screens */}
        <div className="hidden col-span-2 sm:block">
          <ul>
            {sidebarItems.map((route) => (
              <li
                key={route.path}
                className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700"
              >
                {route.name}
                {route.children && (
                  <ul className="ml-4">
                    {route.children.map((child) => (
                      <li
                        key={child.path}
                        className="mt-3 cursor-pointer text-sm text-gray-600 transition hover:text-blue-700"
                      >
                        {child.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Settings Content Area */}
        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
          <div className="pt-4">
            <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
          </div>
          <hr className="mt-4 mb-8" />
          <p className="py-2 text-xl font-semibold">Email Address</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600">Your email address is <strong>{user.email}</strong></p>
            <button className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Change</button>
          </div>
          <hr className="mt-4 mb-8" />

          <p className="py-2 text-xl font-semibold">Password</p>
          <div className="flex flex-col sm:flex-row sm:space-x-3">
            <label className="block w-full sm:w-1/2">
              <span className="text-sm text-gray-500">Current Password</span>
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="password" className="w-full border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
              </div>
            </label>
            <label className="block w-full sm:w-1/2">
              <span className="text-sm text-gray-500">New Password</span>
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="password" className="w-full border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
              </div>
            </label>
          </div>
          <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Save Password</button>
          <hr className="mt-4 mb-8" />

          <div className="mb-10">
            <p className="py-2 text-xl font-semibold">Delete Account</p>
            <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Proceed with caution
            </p>
            <p className="mt-2">Make sure you have taken a backup of your account in case you ever need to access your data. We will completely wipe your data. There is no way to access your account after this action.</p>
            <button className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">Continue with deletion</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
