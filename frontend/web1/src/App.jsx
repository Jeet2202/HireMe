import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Sidebars
import ContractorSidebar from "./components/ContractorSidebar";
import LabourerSidebar from "./components/LabourerSidebar";
import AdminSidebar from "./components/AdminSidebar";
import UnionSidebar from "./components/UnionSidebar";

// Common pages
import Home from "./pages/common/home";
import Login from "./pages/common/login";
import Signup from "./pages/common/signup";

// Contractor pages
import ContractorDashboard from "./pages/Contractor/ContractorDashboard";
import ContractorProfile from "./pages/Contractor/ContractorProfile";
import ContractorFindLabourers from "./pages/Contractor/ContractorFindLabourers";
import ContractorFindHelpers from "./pages/Contractor/ContractorFindHelpers";
import ContractorJobPosts from "./pages/Contractor/ContractorJobPosts";
import ContractorVerification from "./pages/Contractor/ContractorVerification";

// Labourer pages
import LabourerDashboard from "./pages/Labourer/LabourerDashboard";
import LabourerVerification from "./pages/Labourer/LabourerVerification";
import LabourerJobRequests from "./pages/Labourer/LabourerJobRequests";
import LabourerProfile from "./pages/Labourer/LabourerProfile";

// Union pages
import UnionDashboard from "./pages/Union/UnionDashboard";
import UnionMyUnions from "./pages/Union/UnionMyUnions";
import UnionCreate from "./pages/Union/UnionCreate";
import UnionJobRequests from "./pages/Union/UnionJobRequests";
import UnionSettings from "./pages/Union/UnionSettings";

// Admin pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminVerification from "./pages/Admin/AdminVerification";
import AdminWorkerManagement from "./pages/Admin/AdminWorkerManagement";
import AdminContractorManagement from "./pages/Admin/AdminContractorManagement";
import AdminJobManagement from "./pages/Admin/AdminJobManagement";

/* ─── Layout Wrappers ─────────────────────────────────────────── */

function ContractorLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-white">
      <ContractorSidebar />
      <div className="flex-1 ml-[280px] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

function LabourerLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-white">
      <LabourerSidebar />
      <div className="flex-1 ml-[280px] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

function UnionLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-white">
      <UnionSidebar />
      <div className="flex-1 ml-[280px] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-surface-stage">
      <AdminSidebar />
      <div className="flex-1 ml-[280px] p-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

/* ─── App ─────────────────────────────────────────────────────── */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Public / Common ─────────────────────────────── */}
        <Route path="/"        element={<Home />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/signup"  element={<Signup />} />

        {/* ── Contractor ──────────────────────────────────── */}
        <Route path="/contractor-dashboard" element={
          <ContractorLayout><ContractorDashboard /></ContractorLayout>
        } />
        <Route path="/contractor/profile" element={
          <ContractorLayout><ContractorProfile /></ContractorLayout>
        } />
        <Route path="/contractor/find-labourers" element={
          <ContractorLayout><ContractorFindLabourers /></ContractorLayout>
        } />
        <Route path="/contractor/find-helpers" element={
          <ContractorLayout><ContractorFindHelpers /></ContractorLayout>
        } />
        <Route path="/contractor/job-posts" element={
          <ContractorLayout><ContractorJobPosts /></ContractorLayout>
        } />
        <Route path="/contractor/verification" element={
          <ContractorLayout><ContractorVerification /></ContractorLayout>
        } />

        {/* ── Labourer ────────────────────────────────────── */}
        <Route path="/labour/dashboard" element={
          <LabourerLayout><LabourerDashboard /></LabourerLayout>
        } />
        <Route path="/labourer/job-requests" element={
          <LabourerLayout><LabourerJobRequests /></LabourerLayout>
        } />
        <Route path="/labourer/profile" element={
          <LabourerLayout><LabourerProfile /></LabourerLayout>
        } />
        <Route path="/labourer/verification" element={
          <LabourerLayout><LabourerVerification /></LabourerLayout>
        } />

        {/* ── Union ───────────────────────────────────────── */}
        <Route path="/union/dashboard" element={
          <UnionLayout><UnionDashboard /></UnionLayout>
        } />
        <Route path="/union/my-unions" element={
          <UnionLayout><UnionMyUnions /></UnionLayout>
        } />
        <Route path="/union/create" element={
          <UnionLayout><UnionCreate /></UnionLayout>
        } />
        <Route path="/union/job-requests" element={
          <UnionLayout><UnionJobRequests /></UnionLayout>
        } />
        <Route path="/union/settings" element={
          <UnionLayout><UnionSettings /></UnionLayout>
        } />

        {/* ── Admin ───────────────────────────────────────── */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={
          <AdminLayout><AdminDashboard /></AdminLayout>
        } />
        <Route path="/admin/contractors" element={
          <AdminLayout><AdminContractorManagement /></AdminLayout>
        } />
        <Route path="/admin/workers" element={
          <AdminLayout><AdminWorkerManagement /></AdminLayout>
        } />
        <Route path="/admin/jobs" element={
          <AdminLayout><AdminJobManagement /></AdminLayout>
        } />
        <Route path="/admin/verification" element={
          <AdminLayout><AdminVerification /></AdminLayout>
        } />

        {/* ── 404 ─────────────────────────────────────────── */}
        <Route path="*" element={
          <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-on-surface">404 — Page Not Found</h1>
          </div>
        } />

      </Routes>
    </BrowserRouter>
  );
}


