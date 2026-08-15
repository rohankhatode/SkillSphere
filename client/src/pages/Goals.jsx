import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepProgress from "../Components/StepProgress";
import goals from "../data/goals";
import logo from "../assets/icons/Vector.svg";
import { HiArrowRight } from "react-icons/hi";
import { HiArrowLeft } from "react-icons/hi";
import API_URL from "../config/api";

function Goals() {
  const navigate = useNavigate();

  const [selectedGoals, setSelectedGoals] = useState([]);

  const handleSelect = (title) => {
    if (selectedGoals.includes(title)) {
      setSelectedGoals(
        selectedGoals.filter((item) => item !== title)
      );
    } else {
      setSelectedGoals([...selectedGoals, title]);
    }
  };

 const handleNext = async () => {

  if (selectedGoals.length === 0) {
    alert("Please select at least one goal.");
    return;
  }

  const childId = localStorage.getItem("childId");

  if (!childId) {
    alert("Child not found.");
    navigate("/add-child");
    return;
  }

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  try {

    const response = await fetch(
      `${API_URL}/child/goals/${childId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          goals: selectedGoals,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    
    console.log(
      "Child ID after saving goals:",
      localStorage.getItem("childId")
    );

    navigate("/recommended");

  } catch (err) {

    console.error(err);
    alert(err.message || "Unable to save goals.");

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

        <StepProgress currentStep={3} />
        

        {/* Heading */}

        <div className="mt-14">

          <h1 className="text-[48px] font-bold text-black">
            What are your{" "}
            <span className="text-[#7C3AED]">
              child's goals?
            </span>
          </h1>

          <p className="text-gray-500 text-[20px] mt-3">
            Choose the goals you want to focus on
          </p>

        </div>

        {/* Interest Cards */}

        <div className="grid grid-cols-6 gap-6 mt-12">

          {goals.map((goal) => {

            const selected =
              selectedGoals.includes(goal.title);

            return (

              <div
                key={goal.id}
                onClick={() => handleSelect(goal.title)}
                className={`

                  relative
                  rounded-3xl
                  h-[230px]
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
                  className="w-[100px] h-[100px] rounded-full mx-auto mt-12 flex items-center justify-center"
                  style={{
                    backgroundColor: goal.color,
                  }}
                >

                  <img
                    src={goal.image}
                    alt={goal.title}
                    className="w-24 h-24 object-contain"
                  />

                </div>

                {/* Title */}

                <h3 className="mt-4 text-center text-[16px] font-semibold">
                  {goal.title}
                </h3>

              </div>
            );
          })}

        </div>

        {/* Buttons */}

        <div className="flex justify-between mt-16">

          <button
            onClick={() => navigate("/interests")}
            className="flex items-center gap-2 border-2 border-[#7C3AED] text-[#7C3AED] px-10 py-4 rounded-full font-semibold hover:bg-[#F5F0FF]"
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

export default Goals;