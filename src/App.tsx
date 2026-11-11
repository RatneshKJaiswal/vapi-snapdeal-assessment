import { AlertCircle, X } from "lucide-react";
import Header from "./components/Header";
import Dashboard from "./components/dashboard/Dashboard";
import { useVapi } from "./hooks/useVapi";

function ConfigError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-alt p-6">
      <div className="bg-surface rounded-xl border border-danger/30 p-8 max-w-md shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircle className="text-danger" size={20} />
          </div>
          <h2 className="text-lg font-semibold">Configuration Required</h2>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          The Vapi public key is not configured. Create a{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">
            .env
          </code>{" "}
          file in the project root with:
        </p>
        <pre className="bg-gray-50 rounded-lg p-3 text-xs font-mono text-text-primary overflow-x-auto">
          VITE_VAPI_PUBLIC_KEY=your_key_here
        </pre>
        <p className="text-xs text-text-secondary mt-4">
          Get your public key from{" "}
          <a
            href="https://dashboard.vapi.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-snapdeal underline"
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

  if (!vapi.isConfigured) {
    return <ConfigError />;
  }

  return (
    <div className="min-h-screen bg-surface-alt">
      <Header status={vapi.status} />

      {/* Error banner */}
      {vapi.error && (
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-4">
          <div className="bg-red-50 border border-danger/20 rounded-lg px-4 py-3 flex items-start gap-3">
            <AlertCircle className="text-danger shrink-0 mt-0.5" size={16} />
            <p className="text-sm text-danger flex-1">{vapi.error}</p>
            <button
              onClick={vapi.clearError}
              className="text-danger/60 hover:text-danger cursor-pointer"
              aria-label="Dismiss error"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <Dashboard {...vapi} />
    </div>
  );
}
