import Navbar from "../Components/Dashboard/Navbar";
import Sidebar from "../Components/Dashboard/Sidebar";
import AccountDetails from "../Components/Dashboard/AccountDetails";

function AccountDetailsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Top Navbar */}
      <Navbar />

      <div className="flex">

        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 px-8 py-8">

          <AccountDetails />

        </main>

      </div>

    </div>
  );
}

export default AccountDetailsPage;