import welcome from "../assets/images/welcome img.png";
import logo from "../assets/icons/Vector.svg";
import { useNavigate } from "react-router-dom";
import {
  FiTarget,
  FiAward,
} from "react-icons/fi";

function Welcome() {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex">
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between px-16 py-12">
        <div className="mb-10 flex">
        
            <img src={logo} alt="SkillSphere" className="w-[32px] h-[32px]" />
        
                <p className="pl-3 font-medium text-[24px] text-[#7C3AED]">
                    SkillSphere
                </p>
        </div>

        <div className="flex items-center justify-center">
            <img src={welcome} alt="Welcome" className="w-[650px] h-[650px]" />
        </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">

      <div className="w-full max-w-[650px] rounded-3xl bg-white border border-[#E8E2FF] p-10 shadow-sm">

        {/* Small Title */}

        <p className="text-[#7C3AED] font-semibold text-[16px]">
          Join SkillSphere
        </p>

        {/* Main Heading */}

        <h1 className="mt-4 text-[48px] font-bold text-[#111827]">
          Welcome to{" "}
          <span className="text-[#7C3AED]">
            SkillSphere!
          </span>
        </h1>

        {/* Description */}

        <p className="mt-8 text-[19px] leading-[28px] text-[#6B7280]">
          Your account is ready! Let's create your child's profile
          to discover personalised activities, trusted learning
          providers, and exciting opportunities designed just for
          them.
        </p>

        {/* Feature Heading */}

        <h5 className="mt-10 text-[28px] font-bold text-[#111827]">
          Feature Highlights
        </h5>

        {/* Features */}

        <div className="mt-8 flex justify-between items-center">

          <div className="flex items-center gap-3 w-60">

            <div className="w-11 h-11 rounded-2xl bg-[#F3EEFF] flex items-center justify-center">
              <FiTarget
                size={22}
                className="text-[#7C3AED]"
              />
            </div>

            
              <h3 className="text-[16px] font-semibold text-[#111827]">
                Personalized for Your Child
              </h3>
            

          </div>  

          <div className="flex items-center gap-3 w-64">

            <div className="w-11 h-11 rounded-2xl bg-[#F3EEFF] flex items-center justify-center">
              <FiAward
                size={22}
                className="text-[#7C3AED]"
              />
            </div>

            
              <h3 className="text-[16px] font-semibold text-[#111827]">
                Track Every Milestone
              </h3>
            

          </div>

        </div>

        {/* Button */}

        <button
          onClick={() => navigate("/add-child")}
          className="mt-12 w-full h-[44px] rounded-full  bg-[#7C3AED] text-white text-[16px] font-semibold hover:opacity-95 transition"
        >
          Set Up Child Profile
        </button>

        {/* Footer */}

        <p className="text-center mt-8 text-[15px] text-[#6B7280]">
          It only takes{" "}
          <span className="text-[#7C3AED] font-semibold">
            2 minutes
          </span>{" "}
          to set up your child's profile.
        </p>

      </div>

    </div>
    </div>
  );
}

export default Welcome;