import React from "react";
import StepProgress from "../Components/StepProgress";
import { useNavigate } from "react-router-dom";
import childIllustration from "../assets/images/AddChild img.png";
import logo from "../assets/icons/Vector.svg";
import { HiArrowRight } from "react-icons/hi";

function AddChild() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="w-[1320px] mx-auto py-8">

        {/* Logo */}
        <div className="w-[162px] h-[32px] flex items-center gap-3 mb-12">
          <img src={logo} alt="SkillSphere" className="w-[32px] h-[32px]" />

          <h1 className="text-2xl font-medium text-[#7C3AED]">
            SkillSphere
          </h1>
        </div>

        {/* Progress Strip */}
        <StepProgress currentStep={1} />

        {/* Heading */}
        <div className="w-[1380px] h-[95px] mt-10">
          <h2 className="text-[48px] font-bold text-black">
            Tell Us <span className="text-[#7C3AED]">About</span> Your <span className="text-[#7C3AED]">Child</span>
          </h2>

          <p className="mt-3 text-[20px] text-gray-600">
            Help us personalize activities, courses, and learning opportunities
            based on your child's age, interests, and goals.
          </p>
        </div>

        {/* Form */}
        <div className="mt-16">

          <form className="grid grid-cols-3 gap-8">

            {/* Child Name */}
            <div>
              <label className="font-medium text-[16px]">Child Name</label>

              <input
                type="text"
                placeholder="Enter Child Name"
                className="w-[427px] h-[48px] mt-2 border rounded-lg p-3"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="font-medium text-[16px]">Gender</label>

              <select className="w-[427px] h-[48px] mt-2 border rounded-lg p-3">
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* DOB */}
            <div>
              <label className="font-medium text-[16px]">Date Of Birth</label>

              <input
                type="date"
                className="w-[427px] h-[48px] mt-2 border rounded-lg p-3"
              />
            </div>

            {/* School */}
            <div>
              <label className="font-medium text-[16px]">School Name</label>

              <input
                type="text"
                placeholder="Enter School Name"
                className="w-[427px] h-[48px] mt-2 border rounded-lg p-3"
              />
            </div>

            {/* Grade */}
            <div>
              <label className="font-medium text-[16px]">Grade</label>

              <select className="w-[427px] h-[48px] mt-2 border rounded-lg p-3">
                <option>Select Grade</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="font-medium text-[16px]">Preferred Language</label>

              <select className="w-[427px] h-[48px] mt-2 border rounded-lg p-3">
                <option>Select Language</option>
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="font-medium text-[16px]">City</label>

              <input
                type="text"
                placeholder="Enter City"
                className="w-[427px] h-[48px] mt-2 border rounded-lg p-3"
              />
            </div>

            {/* State */}
            <div>
              <label className="font-medium text-[16px]">State</label>

              <input
                type="text"
                placeholder="Enter State"
                className="w-[427px] h-[48px] mt-2 border rounded-lg p-3"
              />
            </div>

            {/* Address */}
            <div>
              <label className="font-medium text-[16px]">Address</label>

              <input
                type="text"
                placeholder="Enter Address"
                className="w-[427px] h-[48px] mt-2 border rounded-lg p-3"
              />
            </div>

          </form>
          <div className="flex justify-end mt-8">
          <button onClick={()=>navigate("/interests")}
              className="bg-violet-600 text-white flex items-center gap-2 px-10 py-3 rounded-full hover:bg-violet-700"
            >
              Next 
              <HiArrowRight className="font-bold" />
            </button>
          </div>

          {/* Bottom */}
          <div className="flex justify-between items-end">

            <img
              src={childIllustration}
              alt="Child"
              className="w-72"
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddChild;