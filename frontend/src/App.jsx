import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import LandingPage from "./pages/candidate/LandingPage";
import Login from "./pages/candidate/Login";
import Auth_1 from "./pages/candidate/Auth_1";
import Auth_2 from "./pages/candidate/Auth_2";
import OTPVerification from "./pages/candidate/OTPVerification";
import Candi_Dashboard from "./pages/candidate/Candi_Dashboard";
import ExamPage from "./pages/candidate/ExamPage";
import Report from "./pages/candidate/Report";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Analytics from "./pages/admin/Analytics";
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <main className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user_login" element={<Login />} />
        <Route path="/auth_1" element={<Auth_1 />} />
        <Route path="/auth_2" element={<Auth_2 />} />
        <Route path="/otp_verify" element={<OTPVerification />} />
        <Route path="/admin_login" element={<AdminLogin />}/>
        <Route path="*" element={<PageNotFound />}/>
        <Route
          path="/candidate_dashboard"
          element={
            <ProtectedRoute>
              <Candi_Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exam"
          element={
            <ProtectedRoute>
              <ExamPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin_dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedAdminRoute>
              <Analytics />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </main>
  );
};

export default App;
