import Navbar from "../Components/Dashboard/Navbar";
import PsychometricSummary from "../Components/Dashboard/PsychometricSummary";
import RecentActivity from "../Components/Dashboard/RecentActivity";
import Sidebar from "../Components/Dashboard/Sidebar";
import StatCards from "../Components/Dashboard/StatCards";
import UpcomingAssessments from "../Components/Dashboard/UpcomingAssessments";
import UpcomingExam from "../Components/Dashboard/UpcomingExam";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
      <main className="flex-1 px-8 py-8">
        <StatCards />
      <UpcomingExam />
      <PsychometricSummary />
      <UpcomingAssessments />
      <RecentActivity />
      </main>
      
      </div>
      
      
    </>
  );
}

export default Dashboard;