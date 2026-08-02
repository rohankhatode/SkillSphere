import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "iconoir-react";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="absolute top-7 left-0 w-full">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-[75px]">

        <div className="items-center">
          <span className="text-[#FFFFFF] font-bold text-[25px]">
            SS.
          </span>

          <span className="ml-1 text-[#FFFFFF] font-medium text-[25px]">
            SkillSphere
          </span>
        </div>

        <button onClick={() => navigate("/login")}
            className="flex items-center gap-3 h-[50px] rounded-full border border-white pl-[20px] 
                      pr-[5px] hover:bg-white/20">
            
            <span className="text-[#FFFFFF] text-[15px] font-medium">
                Login
            </span>

            <div
                className="w-[40px] h-[40px] rounded-full bg-[#FFFFFF] flex items-center 
                          justify-center">
                <ArrowUpRight className="text-[#7C3AED]" />
            </div>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;