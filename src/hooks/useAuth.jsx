import React, { createContext, useMemo, useState } from "react";

const getInitialState = () => {
  if (window && window.localStorage) {
    const storedUser = window.localStorage.getItem("auth");
    if (storedUser) return JSON.parse(storedUser);
  }
  return { name: "", role: "user", auth: false };
};

export const UserContext = createContext(getInitialState);

function UserProvider({ children, ...props }) {
  const [user, setUser] = useState(getInitialState);
  const login = (data) => {
    localStorage.setItem(
      "auth",
      JSON.stringify({
        id: data?.user?._id,
        username: data?.user.username,
        auth: true,
        email: data.user?.email,
        role: data.user?.role,
      })
    );
    localStorage.setItem("accessToken", data?.user?.accessToken);

    setUser(() => ({
      id: data?.user?._id,
      username: data?.user.username,
      auth: true,
      email: data.user?.email,
      role: data.user?.role,
    }));
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setUser(() => ({ name: "", role: "user", auth: false }));
  };

  const setName = (name) => {
    setUser({ ...user, name });
  };

  const setProfileImage = (profileImage) => {
    setUser({ ...user, profileImage });
  };

  const value = useMemo(
    () => ({
      user,
      setName,
      setProfileImage,
      login,
      logout,
    }),
    [user]
  );

  return (
    <UserContext.Provider {...props} value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
