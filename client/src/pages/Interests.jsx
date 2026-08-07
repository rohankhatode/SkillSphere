import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepProgress from "../Components/StepProgress";
import interests from "../data/interests";
import logo from "../assets/icons/Vector.svg";
import { HiArrowRight } from "react-icons/hi";
import { HiArrowLeft } from "react-icons/hi";
import API_URL from "../config/api";

function Interests() {
  const navigate = useNavigate();

  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleSelect = (title) => {
    if (selectedInterests.includes(title)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== title)
      );
    } else {
      setSelectedInterests([...selectedInterests, title]);
    }
  };

  const handleNext = async () => {

    if (selectedInterests.length === 0) {
      alert("Please select at least one interest.");
      return;
    }

    const childId = localStorage.getItem("childId");

    if (!childId) {
      alert("Child not found. Please add child details first.");
      navigate("/add-child");
      return;
    }

    try {

      const childId = localStorage.getItem("childId");

      const response = await fetch(
        `${API_URL}/child/interests/${childId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            interests: selectedInterests,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      navigate("/goals");

    } catch (err) {
      console.error(err);
      alert(err.message || "Unable to save interests.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFF]">

      <div className="max-w-[1320px] mx-auto py-8">

        {/* Logo */}

        <div className="flex items-center mb-8">

          <img
            src={logo}
            alt="SkillSphere"
            className="w-8 h-8"
          />

          <h2 className="ml-3 text-2xl font-semibold text-[#7C3AED]">
            SkillSphere
          </h2>

        </div>

        {/* Progress Strip */}

        <StepProgress currentStep={2} />
        

        {/* Heading */}

        <div className="mt-14">

          <h1 className="text-[48px] font-bold text-black">
            What are your{" "}
            <span className="text-[#7C3AED]">
              child's interests?
            </span>
          </h1>

          <p className="text-gray-500 text-[20px] mt-3">
            Select all that apply
          </p>

        </div>

        {/* Interest Cards */}

        <div className="grid grid-cols-5 gap-6 mt-12">

          {interests.map((interest) => {

            const selected =
              selectedInterests.includes(interest.title);

            return (

              <div
                key={interest.id}
                onClick={() => handleSelect(interest.title)}
                className={`

                  relative
                  rounded-3xl
                  h-[260px]
                  cursor-pointer
                  border-2
                  transition-all

                  ${
                    selected
                      ? "border-[#7C3AED] shadow-xl"
                      : "border-gray-200 hover:border-[#7C3AED]"
                  }

                `}
              >

                {/* Checkbox */}

                <input
                  type="checkbox"
                  checked={selected}
                  readOnly
                  className="absolute top-5 right-5 w-5 h-5 accent-[#7C3AED]"
                />

                {/* Circle */}

                <div
                  className="w-[150px] h-[150px] rounded-full mx-auto mt-10 flex items-center justify-center"
                  style={{
                    backgroundColor: interest.color,
                  }}
                >

                  <img
                    src={interest.image}
                    alt={interest.title}
                    className="w-24 h-24 object-contain"
                  />

                </div>

                {/* Title */}

                <h3 className="mt-4 text-center text-[16px] font-semibold">
                  {interest.title}
                </h3>

              </div>
            );
          })}

        </div>

        {/* Buttons */}

        <div className="flex justify-between mt-16">

          <button
            onClick={() => navigate("/add-child")}
            className="flex item-center gap-2 border-2 border-[#7C3AED] text-[#7C3AED] px-10 py-4 rounded-full font-semibold hover:bg-[#F5F0FF]"
          >
            <HiArrowLeft className="font-bold mt-1" />
            Back
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6B2FFF] text-white px-12 py-4 rounded-full font-semibold"
          >
            Next 
            <HiArrowRight className="font-bold" />
          </button>

        </div>

      </div>

    </div>
  );
}

export default Interests;