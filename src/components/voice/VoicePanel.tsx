import { Mic, PhoneOff, Loader2 } from "lucide-react";
import type { CallStatus } from "../../types";

interface VoicePanelProps {
  status: CallStatus;
  isSpeaking: boolean;
  volumeLevel: number;
  callDuration: number;
  onStartCall: () => void;
  onEndCall: () => void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function WaveformVisualizer({
  volume,
  isSpeaking,
  active,
}: {
  volume: number;
  isSpeaking: boolean;
  active: boolean;
}) {
  if (!active) return null;

  const barCount = 5;
  const baseColor = isSpeaking ? "bg-snapdeal" : "bg-emerald-500";

  return (
    <div className="flex items-center gap-1 h-8">
      {Array.from({ length: barCount }, (_, i) => {
        // Create a natural-looking waveform: center bars are taller
        const centerWeight = 1 - Math.abs(i - 2) / 3;
        const height = Math.max(0.15, volume * centerWeight);

        return (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-100 ${baseColor}`}
            style={{
              height: `${height * 32}px`,
              opacity: 0.6 + volume * 0.4,
              animationDelay: `${i * 80}ms`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function VoicePanel({
  status,
  isSpeaking,
  volumeLevel,
  callDuration,
  onStartCall,
  onEndCall,
}: VoicePanelProps) {
  const isActive = status === "connected";
  const isConnecting = status === "connecting";
  const isDisconnecting = status === "disconnecting";
  const isIdle = status === "idle";

  const stateLabel = isConnecting
    ? "Connecting…"
    : isDisconnecting
      ? "Ending call…"
      : isActive && isSpeaking
        ? "KAM is speaking…"
        : isActive
          ? "Listening…"
          : "Ready to start";

  return (
    <div className="bg-surface rounded-xl border border-border p-6 flex flex-col items-center gap-5">
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide self-start">
        Voice Conversation
      </h2>

      {/* Mic Button */}
      <div className="relative flex items-center justify-center">
        {/* Pulse ring when active */}
        {isActive && (
          <div
            className="absolute w-24 h-24 rounded-full bg-snapdeal/20"
            style={{ animation: "pulse-ring 2s ease-out infinite" }}
          />
        )}

        <button
          onClick={isActive || isDisconnecting ? onEndCall : onStartCall}
          disabled={isConnecting || isDisconnecting}
          className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer
            ${
              isActive
                ? "bg-snapdeal hover:bg-snapdeal-dark text-white"
                : isConnecting || isDisconnecting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-snapdeal hover:bg-snapdeal-dark text-white hover:shadow-xl"
            }`}
          aria-label={isActive ? "End call" : "Start call"}
        >
          {isConnecting || isDisconnecting ? (
            <Loader2 size={28} className="animate-spin" />
          ) : isActive ? (
            <PhoneOff size={28} />
          ) : (
            <Mic size={28} />
          )}
        </button>
      </div>

      {/* Waveform */}
      <WaveformVisualizer
        volume={volumeLevel}
        isSpeaking={isSpeaking}
        active={isActive}
      />

      {/* State label */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isActive
                ? isSpeaking
                  ? "bg-snapdeal"
                  : "bg-emerald-500 animate-pulse"
                : isConnecting
                  ? "bg-warning animate-pulse"
                  : "bg-gray-300"
            }`}
          />
          <span className="text-sm font-medium text-text-secondary">
            {stateLabel}
          </span>
        </div>

        {(isActive || callDuration > 0) && (
          <span className="text-xs text-text-secondary font-mono tabular-nums">
            {formatDuration(callDuration)}
          </span>
        )}
      </div>

      {/* Start/End button label for idle */}
      {isIdle && (
        <p className="text-xs text-text-secondary text-center max-w-[220px]">
          Click the microphone to start a voice conversation with your Snapdeal
          KAM
        </p>
      )}
    </div>
  );
}
