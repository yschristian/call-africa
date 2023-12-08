import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  ChartPieIcon,
  LogoutIcon,
  ChatIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { CogIcon, OfficeBuildingIcon } from "@heroicons/react/outline";
import Tooltip from "./ToolTip";
import { UserContext } from "../hooks/useAuth";
import CheckRole from "../utils/CheckRoles";
import SideNavLink from "./SideNavLink";

function Sidebar({ style, toggle }) {
  const { logout } = useContext(UserContext);
  const [togglei, setTogglei] = useState(false);
  useEffect(() => {}, [togglei]);
  return (
    <div
      className={`${style} flex-col fixed h-[90%] mt-[90px] pt-[3vh] lg:pt-[11vh] bg-white  border-r p-2`}
    >
      <div className="list-none pr-8">
        <SideNavLink onClick={toggle} name="Dashboard" to="/dashboard/">
          <ChartPieIcon className="w-5 mr-2 " />
        </SideNavLink>
        <CheckRole roles={["org"]}>
          <SideNavLink
            onClick={toggle}
            name="Messages"
            to="/dashboard/messages"
          >
            <ChatIcon className="w-5 mr-2 " />
          </SideNavLink>
        </CheckRole>
        <CheckRole roles={["super-admin"]}>
          <SideNavLink
            onClick={toggle}
            name="Organizations"
            to="/dashboard/orgs"
          >
            <OfficeBuildingIcon className="w-5 mr-2 " />
          </SideNavLink>
        </CheckRole>

        <SideNavLink
          onClick={toggle}
          name="Profile"
          to="/dashboard/profile"
          className="mt-20"
        >
          <UserIcon className="w-5 mr-2 " />
        </SideNavLink>
        {/* Add icons */}
        <div className="flex flex-row ml-10 mt-auto list-none">
          <li className="px-2 mt-10">
            <NavLink to="#link">
              <Tooltip message="Logout">
                <LogoutIcon
                  onClick={logout}
                  className="w-5 text-red-700 dark:text-red-600 hover:text-red-900"
                />
              </Tooltip>
            </NavLink>
          </li>
          <li className="px-2">
            <NavLink
              to="/dashboard/settings"
              className={(navData) => {
                if (navData.isActive) {
                  return "flex flex-row font-bold text-primary dark:text-primary";
                }
                return "flex flex-row dark:text-dark-text-fill";
              }}
            >
              <Tooltip message="Settings">
                <CogIcon className="w-5 hover:text-primary " onClick={toggle} />
              </Tooltip>
            </NavLink>
          </li>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
