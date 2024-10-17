import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { useCurentUser } from "../../redux/features/auth/authSlice";


type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const location = useLocation();
    const user = useAppSelector(useCurentUser);

    if (!user) return <Navigate to={'/auth/login'} replace state={location.pathname} />;
    if (user.role !== role) {
        return <Navigate to={'/'} replace />;
    };
    return children;
};

export default ProtectedRoute;
