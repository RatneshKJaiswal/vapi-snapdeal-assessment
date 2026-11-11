import MetricsPanel from "../metrics/MetricsPanel";
import VoicePanel from "../voice/VoicePanel";
import TranscriptPanel from "../conversation/TranscriptPanel";
import InsightsPanel from "../insights/InsightsPanel";
import type { UseVapiReturn } from "../../hooks/useVapi";
import type { SellerProfile } from "../../types";

interface DashboardProps extends UseVapiReturn {
  activeSeller: SellerProfile;
}

export default function Dashboard({
  status,
  isSpeaking,
  volumeLevel,
  messages,
  callDuration,
  startCall,
  endCall,
  activeSeller,
}: DashboardProps) {
  return (
    <main className="max-w-7xl mx-auto p-4 lg:p-6 space-y-5">
      {/* Top: Active Seller KPI Overview */}
      <MetricsPanel activeSeller={activeSeller} />

      {/* Middle: 3-Column Responsive Interaction Grid with Fixed Height & Internal Scrolling */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px_1.1fr] gap-4 lg:h-[540px]">
        {/* Left Column: Live Conversation Transcript */}
        <div className="order-2 lg:order-1 h-[480px] lg:h-full min-h-0 overflow-hidden">
          <TranscriptPanel
            messages={messages}
            isActive={status === "connected"}
            activeSeller={activeSeller}
          />
        </div>

        {/* Center Column: Live Voice Interaction Hub */}
        <div className="order-1 lg:order-2 h-auto lg:h-full min-h-0 overflow-hidden">
          <VoicePanel
            status={status}
            isSpeaking={isSpeaking}
            volumeLevel={volumeLevel}
            callDuration={callDuration}
            activeSeller={activeSeller}
            onStartCall={startCall}
            onEndCall={endCall}
          />
        </div>

        {/* Right Column: AI Diagnostics & Action Plan Checklist */}
        <div className="order-3 h-[480px] lg:h-full min-h-0 overflow-hidden">
          <InsightsPanel
            status={status}
            hasMessages={messages.length > 0}
            activeSeller={activeSeller}
          />
        </div>
      </div>
    </main>
  );
}
