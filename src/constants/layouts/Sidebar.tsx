import { adminPaths } from "../../routes/adminRoutes";
import { SidebarGenaretor } from "../../utils/sidebarItemGenaretor";
import { useAppSelector } from "../../redux/hooks";
import { Tuser, useCurentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const userRole = {
  ADMIN: "admin",
};

const Sidebar = () => {
  const token = useAppSelector(useCurentToken);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems = [];

  if ((user as Tuser)?.role === userRole.ADMIN) {
    sidebarItems = SidebarGenaretor(adminPaths, userRole.ADMIN);
  }

  return (
    <aside className="bg-gray-800 text-white h-full">
      <div className="flex items-center justify-center h-16 text-xl font-bold">
        <h1>PH Uni</h1>
      </div>
      <ul className="space-y-2 px-2">
        {sidebarItems?.map((item) => (
          <li key={item.key}>
            <a
              href={item.path}
              className="block p-2 rounded hover:bg-gray-700 transition"
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
