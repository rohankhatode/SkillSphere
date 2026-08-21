
import { Routes, Route } from "react-router-dom";

import Loading from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SelectChild from "./pages/selectChild";
import AddChild from "./pages/AddChild";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import Interests from "./pages/Interests";
import Goals from "./pages/Goals";
import Recommendations from "./pages/Recommendations";
import OTP from "./pages/otp";
import Welcome from "./pages/Welcome";
import AccountDetailsPage from "./pages/AccountDetailsPage";
import UpcomingExamPage from "./pages/UpcomingExamPage";
import ExamInformation from "./pages/ExamInstructions";
import ExamStart from "./pages/ExamStart";
import ResultPage from "./pages/ResultPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Loading />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/select-child" element={<SelectChild />}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />
      <Route path="/add-child" element={<ProtectedRoute><AddChild /></ProtectedRoute>} />
      <Route path="/interests" element={<ProtectedRoute><Interests /></ProtectedRoute>} />
      <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
      <Route path="/recommended" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
      <Route path="/OTP" element={<OTP />} />
      <Route path="/Welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
      <Route path="/account-details" element={<ProtectedRoute><AccountDetailsPage /></ProtectedRoute>} />
      <Route path="/upcoming-exam" element={<ProtectedRoute><UpcomingExamPage /></ProtectedRoute>} />
      <Route path="/exam-information" element={<ProtectedRoute><ExamInformation /></ProtectedRoute>} />
      <Route path="/exam-start" element={<ProtectedRoute><ExamStart /></ProtectedRoute>} />
      <Route path="/result/:resultId" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
      
    </Routes>
  );
}

export default App;

