import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import LiveDemo from "./components/LiveDemo";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Comparison from "./components/Comparison";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import LeadFunnel from "./components/LeadFunnel";

const LandingPage = () => {
  const [showLeadFunnel, setShowLeadFunnel] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onOpenLeadFunnel={() => setShowLeadFunnel(true)} />
      <Hero onOpenLeadFunnel={() => setShowLeadFunnel(true)} />
      <LiveDemo />
      <Features />
      <Pricing />
      <Comparison />
      <Testimonials />
      <Footer />
      
      {showLeadFunnel && (
        <LeadFunnel onClose={() => setShowLeadFunnel(false)} />
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;