
import { Routes, Route } from "react-router-dom";

import Loading from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddChild from "./pages/AddChild";
import Dashboard from "./pages/Dashboard";

import Interests from "./pages/Interests";
import Goals from "./pages/Goals";
import Recommendations from "./pages/Recommendations";
import OTP from "./pages/otp";
import Welcome from "./pages/Welcome";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Loading />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard /> } />
      <Route path="/add-child" element={<AddChild />} />
      <Route path="/interests" element={<Interests />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/recommended" element={<Recommendations />} />
      <Route path="/OTP" element={<OTP />} />
      <Route path="/Welcome" element={<Welcome />} />
    </Routes>
  );
}

export default App;

