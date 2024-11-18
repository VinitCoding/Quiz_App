import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OTPVerification from "./pages/OTPVerification";
import Candi_Dashboard from "./pages/Candi_Dashboard";
// import ExamPage from "./pages/ExamPage";
import Login from "./pages/Login";
import Auth_1 from "./pages/Auth_1";
import Auth_2 from "./pages/Auth_2";
import Testing from "./pages/Testing";
import ProtectedRoute from "./routes/ProtectedRoute";
import Testing_2 from "./pages/Testing_2";
import Report from "./pages/Report";

const App = () => {
  return (
    <main className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth_1" element={<Auth_1 />} />
        <Route path="/auth_2" element={<Auth_2 />} />
        <Route path="/otp_verify" element={<OTPVerification />} />
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
              {/* <ExamPage /> */}
              <Testing_2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              {/* <ExamPage /> */}
              <Report />
            </ProtectedRoute>
          }
        />
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </main>
  );
};

export default App;
