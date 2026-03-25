import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LandingNav from "../components/landing/LandingNav";
import HeroSection from "../components/landing/HeroSection";
import SocialProofBar from "../components/landing/SocialProofBar";
import FeatureCards from "../components/landing/FeatureCards";
import HowItWorks from "../components/landing/HowItWorks";
import DashboardPreview from "../components/landing/DashboardPreview";
import AIShowcase from "../components/landing/AIShowcase";
import MetricsSection from "../components/landing/MetricsSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import FinalCTA from "../components/landing/FinalCTA";
import LandingFooter from "../components/landing/LandingFooter";
import AuthSlidePanel from "../components/landing/AuthSlidePanel";
import { useAuth } from "../contexts/AuthContext";

export default function LandingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [authPanel, setAuthPanel] = useState({ open: false, mode: "login" });

  // Auto-open panel based on URL
  useEffect(() => {
    if (location.pathname === "/login") {
      setAuthPanel({ open: true, mode: "login" });
    } else if (location.pathname === "/signup") {
      setAuthPanel({ open: true, mode: "signup" });
    }
  }, [location.pathname]);

  // If authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/analytics-overview", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const openLogin = () => {
    setAuthPanel({ open: true, mode: "login" });
    window.history.replaceState(null, "", "/login");
  };

  const openSignup = () => {
    setAuthPanel({ open: true, mode: "signup" });
    window.history.replaceState(null, "", "/signup");
  };

  const closeAuth = () => {
    setAuthPanel((prev) => ({ ...prev, open: false }));
    window.history.replaceState(null, "", "/");
  };

  return (
    <div className="bg-[#0a0b0f] min-h-screen">
      <LandingNav onLogin={openLogin} onSignup={openSignup} />
      <HeroSection onSignup={openSignup} />
      <SocialProofBar />
      <FeatureCards />
      <HowItWorks />
      <DashboardPreview />
      <AIShowcase />
      <MetricsSection />
      <TestimonialsSection />
      <FinalCTA onSignup={openSignup} />
      <LandingFooter />

      <AuthSlidePanel
        isOpen={authPanel.open}
        onClose={closeAuth}
        initialMode={authPanel.mode}
      />
    </div>
  );
}
