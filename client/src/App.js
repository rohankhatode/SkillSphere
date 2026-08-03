
import { Routes, Route } from "react-router-dom";

import Loading from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddChild from "./pages/AddChild";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Loading />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
      <Route path="/add-child" element={<AddChild />} />
    </Routes>
  );
}

export default App;

