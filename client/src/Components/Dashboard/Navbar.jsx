import { FiChevronDown } from "react-icons/fi";

function Navbar() {
return(
    <div className="w-full bg-white">
        <div className="min-w-[1440px] h-[80px] flex items-center justify-between px-14 py-4">

            <div className="text-violet-600 text-[16px]">

                <span className="font-extrabold">SS.</span>
                <span className="pl-1 font-semibold">SkillSphere</span>

            </div>
            
            <div className="w-[365px] h-[55px] flex items-center bg-white border rounded-full px-5 py-2 shadow-sm">

        <div className="w-8 h-8 rounded-full text-[12px] bg-[#F3ECFF] flex items-center justify-center font-semibold text-[#7C3AED]">

          AM

        </div>

        <div className="ml-4 mr-5">

          <h3 className="text-[12px] font-semibold">

            Aarav Mahatre

          </h3>

          <p className="text-[12px] text-gray-500">

            Grade 5 •Green Valley Public School• Age 10

          </p>

        </div>

        <FiChevronDown />

      </div>
        </div>
    </div>
);

}

export default Navbar;