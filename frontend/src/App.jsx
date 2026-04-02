import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LandingPage } from "./pages/Landing";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";
import { DashboardPage } from "./pages/Dashboard";
import { DetectionPage } from "./pages/Detection";
import { PreventionPage } from "./pages/Prevention";
import { ContactPage } from "./pages/Contact";

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => {
    setIsDark(!isDark);
  };

  return (
    <Router>
      <div style={{ backgroundColor: isDark ? "#1a1a1a" : "#f0f0f0", minHeight: "100vh", color: isDark ? "#fff" : "#000" }}>
        <Navbar isDark={isDark} toggleDark={toggleDark} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/detection" 
            element={
              <ProtectedRoute>
                <DetectionPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/prevention" 
            element={
              <ProtectedRoute>
                <PreventionPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
