import childSteps from "../data/childSteps";

function StepProgress({ currentStep }) {
  return (
    <div className="w-full flex items-start justify-between mb-12">
      {childSteps.map((step, index) => {
        const active = step.id <= currentStep;

        return (
          <div
            key={step.id}
            className="flex items-start flex-1 last:flex-none"
          >
            {/* Step */}
            <div className="flex flex-col items-center w-[120px]">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                ${
                  active
                    ? "bg-[#7C3AED] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.id}
              </div>

              <h3
                className={`mt-3 text-sm font-semibold text-center
                ${
                  active ? "text-[#7C3AED]" : "text-gray-600"
                }`}
              >
                {step.title}
              </h3>

              <p className="text-xs text-gray-400 text-center mt-1">
                {step.description}
              </p>
            </div>

            {/* Connector */}
            {index !== childSteps.length - 1 && (
              <div
                className={`flex-1 h-[3px] mt-5 rounded-full transition-all
                ${
                  step.id < currentStep
                    ? "bg-[#7C3AED]"
                    : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepProgress;