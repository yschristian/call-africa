import React, { useContext } from "react";
import Notify from "./components/Notify";
import { UserContext } from "./hook/useAuth";

export default function ProtectedRoutes(obj) {
  const { user } = useContext(UserContext);
  if (!user?.auth) {
    return obj.children;
  }
  return <Notify />;
}
