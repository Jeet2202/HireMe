import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/common/Home";
import Login from "./pages/common/Login";
import Signup from "./pages/common/Signup";
import ForgotPassword from "./pages/common/ForgotPassword";
import UserSelection from "./pages/common/UserSelection";
import ContractorDashboard from "./pages/Contractor/ContractorDashboard";
import ContractorProfile from "./pages/Contractor/ContractorProfile";
import LabourerDashboard from "./pages/Labourer/LabourerDashboard";
import ContractorFindLabourers from "./pages/Contractor/ContractorFindLabourers";
import LabourerVerification from "./pages/Labourer/LabourerVerification";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/select-role" element={<UserSelection />} />
        <Route path="/contractor-dashboard" element={<ContractorDashboard />}/>
        <Route path="/contractor/profile" element={<ContractorProfile />} />
        <Route path="/labour/dashboard" element={<LabourerDashboard />} />
        <Route path="/contractor/find-labourers" element={<ContractorFindLabourers />} />
        <Route path="/labourer/verification" element={<LabourerVerification />} />


        

        {/* 404 */}
        <Route path="*" element={<h1 className="text-center mt-20 text-3xl font-bold">Page Not Found</h1>} />

      </Routes>

    </BrowserRouter>
  );
}

