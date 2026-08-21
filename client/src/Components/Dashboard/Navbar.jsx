import React, { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import API_URL from "../../config/api";

function Navbar() {
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const childId =
          localStorage.getItem("childId") ||
          sessionStorage.getItem("childId");

        const token =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token");

        if (!childId || !token) {
          return;
        }

        const response = await fetch(
          `${API_URL}/dashboard/account/${childId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("Navbar Account Data:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load account details"
          );
        }

        setAccountData(data.data);
      } catch (error) {
        console.error("Navbar Error:", error);
      }
    };

    fetchAccountDetails();
  }, []);

  // ==============================
  // CHILD INFORMATION
  // ==============================

  const childName =
    accountData?.personalInformation?.fullName || "Student";

  const grade =
    accountData?.schoolDetails?.grade || "";

  const school =
    accountData?.schoolDetails?.school || "";

  const age =
    accountData?.personalInformation?.age || "";

  // ==============================
  // INITIALS
  // ==============================

  const initials = childName
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-full bg-white">
      <div className="min-w-[1440px] h-[80px] flex items-center justify-between px-14 py-4">

        {/* LOGO */}

        <div className="text-violet-600 text-[24px]">
          <span className="font-extrabold">
            SS.
          </span>

          <span className="pl-1 font-semibold">
            SkillSphere
          </span>
        </div>

        {/* CHILD PROFILE */}

        <div className="w-[365px] h-[55px] flex items-center bg-white border rounded-full px-5 py-2 shadow-sm">

          {/* INITIALS */}

          <div className="w-8 h-8 rounded-full text-[12px] bg-[#F3ECFF] flex items-center justify-center font-semibold text-[#7C3AED]">
            {initials || "ST"}
          </div>

          {/* CHILD DETAILS */}

          <div className="ml-4 mr-5">

            <h3 className="text-[12px] font-semibold">
              {childName}
            </h3>

            <p className="text-[12px] text-gray-500">

              {grade && `Grade ${grade}`}

              {school && ` • ${school}`}

              {age && ` • Age ${age}`}

            </p>

          </div>

          {/* DROPDOWN ICON */}

          <ChevronsUpDown size={15} />

        </div>

      </div>
    </div>
  );
}

export default Navbar;