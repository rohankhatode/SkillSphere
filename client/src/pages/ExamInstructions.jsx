import Navbar from "../Components/Dashboard/Navbar";
import Sidebar from "../Components/Dashboard/Sidebar";
import ExamInformation from "../Components/Dashboard/ExamInformation";

function ExamInstructions() {
  return (
    <div className="min-h-screen bg-white">

      {/* Top Navbar */}
      <Navbar />

      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 px-8 py-8">
          <ExamInformation />
        </main>

      </div>

    </div>
  );
}

export default ExamInstructions;