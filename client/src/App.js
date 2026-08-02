
import { Routes, Route } from "react-router-dom";

import Loading from "./pages/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Loading />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
    </Routes>
  );
}

export default App;

