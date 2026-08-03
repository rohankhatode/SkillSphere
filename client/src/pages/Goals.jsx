import StepProgress from "../components/StepProgress";

function Goals() {
  return (
    <div className="p-10">
      <StepProgress currentStep={3} />

      <h1>Goals Page</h1>
    </div>
  );
}

export default Goals;