import React from "react";

const childSteps = [
  {
    id: 1,
    title: "Add Child",
    description: "Create your child's profile.",
  },
  {
    id: 2,
    title: "Interest",
    description: "Choose their interests.",
  },
  {
    id: 3,
    title: "Goals",
    description: "Set learning goals.",
  },
  {
    id: 4,
    title: "Recommendations",
    description: "Discover the best activities.",
  },
  {
    id: 5,
    title: "Dashboard",
    description: "Manage their learning journey.",
  },
];

function StepProgress({ currentStep = 1 }) {
  return (
    <div className="w-[1320px] h-[75px] mx-auto flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">

      {childSteps.map((step, index) => {
        const completed = step.id < currentStep;
        const active = step.id === currentStep;

        return (
          <React.Fragment key={step.id}>
            {/* Step */}
            <div
              className={`relative w-[290px] h-[80px] flex items-center pl-8 pr-1
              ${
                index !== 0 ? "-ml-5" : ""
              }
              [clip-path:polygon(0_0,92%_0,100%_50%,92%_100%,0_100%,8%_50%)]
              ${
                active
                  ? "bg-gradient-to-r from-[#6F3BFF] to-[#8B5CFF] text-white z-20"
                  : completed
                  ? "bg-[#7C3AED] text-white z-10"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >

              {/* Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0
                ${
                  active
                    ? "border-2 border-white text-white"
                    : completed
                    ? "bg-[#7C3AED] text-white border-2 border-white"
                    : "border border-gray-400 text-gray-600"
                }`}
              >
                {completed ? `0${step.id}` : `0${step.id}`}
              </div>

              {/* Text */}
              <div className="ml-2">
                <h4
                  className={`text-[14px] font-semibold ${
                    active || completed ? "text-white" : "text-gray-700"
                  }`}
                >{step.title}
                </h4>

                <p
                  className={`text-[14px] ${
                    active || completed
                      ? "text-white/80"
                      : "text-gray-500"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connector */}
            
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default StepProgress;