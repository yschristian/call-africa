import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import Messages from "../pages/Messages";
import Organization from "../pages/OrgAdmin";
import Profile from "../pages/Profile";

function DashboardRoutes() {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  return (
    <PrivateRoute>
      <div className="flex flex-col min-h-screen">
        <Sidebar toggle={handleClick} style="hidden lg:flex" />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orgs" element={<Organization />} />
        </Routes>
      </div>
    </PrivateRoute>
  );
}

export default DashboardRoutes;
