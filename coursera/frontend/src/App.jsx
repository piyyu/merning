import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UserAuth from "./pages/UserAuth";
import AdminAuth from "./pages/AdminAuth";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/userAuth" element={<UserAuth />} />
        <Route path="/adminAuth" element={<AdminAuth />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}