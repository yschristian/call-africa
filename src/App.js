import React from "react";
import "./index.css";
import Home from "./routes/home.js";
import About from "./routes/about.js";
import Contact from "./routes/contact.js";
import Services from "./routes/services.js";
import { Routes, Route } from "react-router-dom";
import LoginView from "./pages/LoginView";
import DashboardRoutes from "./routes/DashRoutes";
import ResetView from "./pages/ResetView";
import ForgotView from "./pages/ForgotView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/password/forgot" element={<ForgotView />} />
      <Route path="/password/reset/:id" element={<ResetView />} />
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
    </Routes>
  );
}

export default App;
