import Navbar from "../Components/Dashboard/Navbar";
import Sidebar from "../Components/Dashboard/Sidebar";
import UpcomingExams from "../Components/Dashboard/UpcomingExams";

function UpcomingExamPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Top Navbar */}
      <Navbar />

      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 px-8 py-8">
          <UpcomingExams />
        </main>

      </div>

    </div>
  );
}

export default UpcomingExamPage;