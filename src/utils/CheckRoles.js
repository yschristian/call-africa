import React, { ReactNode, useContext } from "react";
import { UserContext } from "../hooks/useAuth";

function CheckRole({ children, roles, ...props }) {
  const { user } = useContext(UserContext);
  if (roles?.includes(user?.role))
    return <React.Fragment {...props}>{children}</React.Fragment>;
  return <React.Fragment {...props} />;
}

export default CheckRole;
