import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { 
  FiGrid, 
  FiUser, 
  FiCalendar,
  FiClipboard,
  FiBookOpen,
  FiAward,
  FiBell,
  FiHelpCircle,
  FiLogOut,
  FiSun,
  FiMoon,
} from "react-icons/fi";


function Sidebar() {
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState("Overview");
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    {
      name: "Overview",
      icon: FiGrid,
      path: "/dashboard",
    },
    {
      name: "Account Details",
      icon: FiUser,
      path: "/account-details",
    },
    {
      name: "Upcoming Exam",
      icon: FiCalendar,
      path: "/upcoming-exam",
    },
    {
      name: "Psychometric Test",
      icon: FiClipboard,
      path: "/psychometric-test",
    },
    {
      name: "Courses",
      icon: FiBookOpen,
      path: "/courses",
    },
    {
      name: "Certificates",
      icon: FiAward,
      path: "/certificates",
    },
    {
      name: "Notification Setting",
      icon: FiBell,
      path: "/notifications",
    },
  ];

  const handleNavigation = (item) => {
    setActiveItem(item.name);
    navigate(item.path);
  };

  const handleLogout = () => {
    // Remove persistent authentication
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("childId");
    sessionStorage.removeItem("childId");
    // Remove session authentication
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside
      className="h-[850px] w-[245px] bg-[#F4F1FF] rounded-[24px] flex flex-col px-[16px] py-[16px] mt-8 ml-14">

      <nav className="flex flex-col gap-[6px]">

        {menuItems.map((item) => {

          const Icon = item.icon;
          const isActive = activeItem === item.name;

          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item)}
              className={`w-full h-[44px] flex items-center px-[12px] text-left transition-all
                ${
                  isActive
                    ? "text-[#7C3AED]"
                    : "text-[#626274] hover:bg-[#ECE8FA]"
                }`} >

              <Icon className={`w-[24px] h-[24px] flex
                  ${
                    isActive
                      ? "text-[#7C3AED]"
                      : "text-[#686878]"
                  }`}
                strokeWidth={1.7} />

              <span className="ml-[10px] text-[16px] font-medium">
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="h-[1px] bg-[#E2DFF0] mx-[8px] mt-[17px] mb-[12px]" />

      <button
        onClick={() => {
          setActiveItem("Help Center");
          navigate("/help-center");
        }}
        className="w-full h-[44px] flex items-center px-[12px] rounded-[18px] text-[#626274] hover:bg-[#ECE8FA]">

        <FiHelpCircle className="w-[24px] h-[24px]" />

        <span className="ml-[10px] text-[16px] font-medium">
          Help Center
        </span>

      </button>

      <div className="mt-auto">

        <div className="flex items-center justify-between px-[10px] mb-[18px]">

          {/* LIGHT */}
          <button
            onClick={() => setDarkMode(false)}
            className={`
              flex
              items-center
              gap-[7px]
              px-[10px]
              py-[7px]
              rounded-[10px]
              transition-all
              ${
                !darkMode
                  ? "bg-white shadow-sm text-[#272735]"
                  : "text-[#767686]"
              }
            `}>

            <FiSun className="w-[24px] h-[24px]"
              strokeWidth={2} />

            <span className="text-[14px] font-medium">
              Light
            </span>

          </button>


          {/* DARK */}

          <button
            onClick={() => setDarkMode(true)}
            className={`
              flex
              items-center
              gap-[7px]
              px-[9px]
              py-[7px]
              rounded-[10px]
              transition-all
              ${
                darkMode
                  ? "bg-white shadow-sm text-[#272735]"
                  : "text-[#767686]"
              }
            `}>

            <FiMoon className="w-[24px] h-[24px]" strokeWidth={2}/>

            <span className="text-[14px] font-medium">
              Dark
            </span>
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="
            w-full
            h-[40px]
            rounded-[10px]
            bg-[#F8DDE8]
            text-[#FF3B5C]
            flex
            items-center
            justify-center
            gap-[8px]
            hover:bg-[#F5CBDC]
            transition-all
          ">

          <span className="text-[16px] font-medium">
            Logout
          </span>

          <FiLogOut
            className="w-[20px] h-[20px]"
            strokeWidth={2}
          />

        </button>

      </div>
    </aside>
  );
}

export default Sidebar;