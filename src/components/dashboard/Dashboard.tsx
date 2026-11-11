import MetricsPanel from "../metrics/MetricsPanel";
import VoicePanel from "../voice/VoicePanel";
import TranscriptPanel from "../conversation/TranscriptPanel";
import InsightsPanel from "../insights/InsightsPanel";
import type { UseVapiReturn } from "../../hooks/useVapi";

type DashboardProps = UseVapiReturn;

export default function Dashboard({
  status,
  isSpeaking,
  volumeLevel,
  messages,
  callDuration,
  startCall,
  endCall,
}: DashboardProps) {
  return (
    <main className="max-w-7xl mx-auto p-4 lg:p-6 space-y-5">
      {/* Top: Metrics */}
      <MetricsPanel />

      {/* Middle: Voice + Transcript + Insights — 3-column on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px_1fr] gap-4 lg:min-h-[420px]">
        {/* Voice — center on desktop, first on mobile (primary interaction) */}
        <div className="lg:order-2">
          <VoicePanel
            status={status}
            isSpeaking={isSpeaking}
            volumeLevel={volumeLevel}
            callDuration={callDuration}
            onStartCall={startCall}
            onEndCall={endCall}
          />
        </div>

        {/* Transcript */}
        <div className="lg:order-1">
          <TranscriptPanel
            messages={messages}
            isActive={status === "connected"}
          />
        </div>

        {/* Insights */}
        <div className="lg:order-3">
          <InsightsPanel
            status={status}
            hasMessages={messages.length > 0}
          />
        </div>
      </div>
    </main>
  );
}
