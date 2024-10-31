
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
  const sidebarItems = user?.role === "ADMIN" ? adminRoutes : userRoutes;

  return (
    <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
      <h1 className="border-b py-6 text-4xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        {/* Sidebar Menu for Larger Screens */}
        <div className="hidden col-span-2 sm:block">
          <ul>
            {sidebarItems.map((route, index) => (
              <li key={index} className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
                {route.name}
                {route.children && (
                  <ul className="ml-4 mt-2">
                    {route.children.map((child, childIndex) => (
                      <li key={childIndex} className="cursor-pointer px-2 py-2 text-sm text-gray-700 hover:text-blue-700">
                        {child.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

      {/* Main Content */}
     
        
      </div>
    </div>
  );
};

export default Dashboard;
