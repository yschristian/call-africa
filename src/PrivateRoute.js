import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./hooks/useAuth";

function CheckRole({ children, ...props }) {
  const { user } = useContext(UserContext);
  const location = useLocation();
  if (user?.auth) return <React.Fragment {...props}>{children}</React.Fragment>;
  return <Navigate {...props} to="/login" state={location.pathname} />;
}

export default CheckRole;
