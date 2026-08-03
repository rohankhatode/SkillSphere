
import { Routes, Route } from "react-router-dom";

import Loading from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddChild from "./pages/AddChild";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import Interests from "./pages/Interests";
import Goals from "./pages/Goals";
import Recommendations from "./pages/Recommendations";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Loading />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
      <Route path="/add-child" element={<AddChild />} />
      <Route path="/interests" element={<Interests />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/recommended" element={<Recommendations />} />
    </Routes>
  );
}

export default App;

