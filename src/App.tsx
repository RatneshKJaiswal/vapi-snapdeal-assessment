import { useState } from "react";
import { AlertCircle, X, ShieldAlert } from "lucide-react";
import Header from "./components/Header";
import Dashboard from "./components/dashboard/Dashboard";
import { useVapi } from "./hooks/useVapi";
import { defaultBusiness } from "./data/sellerData";
import type { SellerProfile } from "./types";

function ConfigError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-alt p-6">
      <div className="bg-surface rounded-2xl border border-danger/30 p-8 max-w-md shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircle className="text-danger" size={20} />
          </div>
          <h2 className="text-lg font-bold">Configuration Required</h2>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          The Vapi public key is not configured. Create a{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">
            .env
          </code>{" "}
          file in the project root with:
        </p>
        <pre className="bg-gray-50 rounded-lg p-3 text-xs font-mono text-text-primary overflow-x-auto border border-gray-200">
          VITE_VAPI_PUBLIC_KEY=your_key_here
        </pre>
        <p className="text-xs text-text-secondary mt-4">
          Get your public key from{" "}
          <a
            href="https://dashboard.vapi.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-snapdeal font-semibold underline"
          >
            dashboard.vapi.ai
          </a>
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const vapi = useVapi();
  const [activeSeller, setActiveSeller] = useState<SellerProfile>(defaultBusiness);

  const handleSelectSeller = (seller: SellerProfile) => {
    // Prevent switching while a live voice call is active
    if (vapi.status === "connected" || vapi.status === "connecting") {
      return;
    }
    setActiveSeller(seller);
    vapi.clearMessages();
  };

  if (!vapi.isConfigured) {
    return <ConfigError />;
  }

  return (
    <div className="min-h-screen bg-surface-alt text-text-primary flex flex-col font-sans">
      {/* Top Navigation Header with Business Switcher */}
      <Header
        status={vapi.status}
        activeSeller={activeSeller}
        onSelectSeller={handleSelectSeller}
      />

      {/* Global Error Banner */}
      {vapi.error && (
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-4 w-full">
          <div className="bg-red-50 border border-danger/30 rounded-xl px-4 py-3 flex items-start gap-3 shadow-xs">
            <ShieldAlert className="text-danger shrink-0 mt-0.5" size={17} />
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-wider text-danger block">
                Voice Assistant Error
              </span>
              <p className="text-sm text-danger mt-0.5">{vapi.error}</p>
            </div>
            <button
              onClick={vapi.clearError}
              className="text-danger/60 hover:text-danger cursor-pointer p-1 rounded-lg hover:bg-red-100 transition-colors"
              aria-label="Dismiss error"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Main Multi-Business Dashboard */}
      <Dashboard {...vapi} activeSeller={activeSeller} />
    </div>
  );
}
