import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  // Not logged in
  if (!token) {
    if (location.pathname !== "/login") return <Navigate to="/login" replace />;
    return null;
  }

  // Not allowed role
  if (allowedRoles && !allowedRoles.includes(role)) {
    if (location.pathname !== "/unauthorized")
      return <Navigate to="/unauthorized" replace />;
    return null;
  }

  return children;
};

export default RequireAuth;
