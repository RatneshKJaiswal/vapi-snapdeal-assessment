import { useState } from "react";
import {
  Mic,
  PhoneOff,
  Loader2,
  Sparkles,
  Volume2,
  Radio,
  Check,
  Copy,
} from "lucide-react";
import type { CallStatus, SellerProfile } from "../../types";

interface VoicePanelProps {
  status: CallStatus;
  isSpeaking: boolean;
  volumeLevel: number;
  callDuration: number;
  activeSeller: SellerProfile;
  onStartCall: (seller: SellerProfile) => void;
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

  const barCount = 7;
  const baseColor = isSpeaking ? "bg-snapdeal" : "bg-emerald-500";

  return (
    <div className="flex items-center justify-center gap-1.5 h-10 py-1">
      {Array.from({ length: barCount }, (_, i) => {
        // Center-weighted natural amplitude
        const centerWeight = 1 - Math.abs(i - 3) / 3.5;
        const normalizedVol = Math.max(0.18, volume * centerWeight * 1.5);

        return (
          <div
            key={i}
            className={`w-1.5 rounded-full transition-all duration-100 ${baseColor} shadow-xs`}
            style={{
              height: `${Math.min(36, Math.max(6, normalizedVol * 36))}px`,
              opacity: 0.7 + volume * 0.3,
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
  activeSeller,
  onStartCall,
  onEndCall,
}: VoicePanelProps) {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const isActive = status === "connected";
  const isConnecting = status === "connecting";
  const isDisconnecting = status === "disconnecting";

  const stateLabel = isConnecting
    ? "Connecting to Voice KAM…"
    : isDisconnecting
      ? "Ending conversation…"
      : isActive && isSpeaking
        ? "KAM is speaking…"
        : isActive
          ? "Listening to you…"
          : "Ready to start voice review";

  const handlePromptClick = (prompt: string) => {
    navigator.clipboard?.writeText(prompt);
    setCopiedPrompt(prompt);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  return (
    <div className="bg-surface rounded-2xl border border-border p-5 shadow-xs flex flex-col items-center justify-between gap-5 h-full relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-snapdeal/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="w-full flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-snapdeal animate-pulse" />
          <h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Live Voice KAM
          </h2>
        </div>

        {/* Live Call Duration */}
        {(isActive || callDuration > 0) && (
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gray-100 text-text-primary text-xs font-mono font-bold tabular-nums border border-gray-200">
            <Radio size={12} className="text-snapdeal animate-pulse" />
            <span>{formatDuration(callDuration)}</span>
          </div>
        )}
      </div>

      {/* Main Interactive Mic Hub */}
      <div className="flex flex-col items-center my-auto w-full py-2">
        <div className="relative flex items-center justify-center">
          {/* Animated Wave Rings */}
          {isActive && (
            <>
              <div
                className={`absolute w-32 h-32 rounded-full ${
                  isSpeaking ? "bg-snapdeal/15" : "bg-emerald-500/15"
                } animate-ping pointer-events-none`}
                style={{ animationDuration: "2.5s" }}
              />
              <div
                className={`absolute w-28 h-28 rounded-full ${
                  isSpeaking ? "bg-snapdeal/20" : "bg-emerald-500/20"
                } pointer-events-none`}
              />
            </>
          )}

          {/* Big Action Mic Button */}
          <button
            onClick={() => {
              if (isActive || isDisconnecting) {
                onEndCall();
              } else {
                onStartCall(activeSeller);
              }
            }}
            disabled={isConnecting || isDisconnecting}
            className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-xl cursor-pointer group ${
              isActive
                ? "bg-snapdeal hover:bg-snapdeal-dark text-white ring-4 ring-snapdeal/30"
                : isConnecting || isDisconnecting
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-snapdeal hover:bg-snapdeal-dark text-white hover:scale-105 ring-4 ring-snapdeal/20 hover:ring-snapdeal/40"
            }`}
            aria-label={isActive ? "End call" : "Start voice review"}
          >
            {isConnecting || isDisconnecting ? (
              <Loader2 size={34} className="animate-spin" />
            ) : isActive ? (
              <>
                <PhoneOff size={30} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-wider mt-1 opacity-90">
                  End Call
                </span>
              </>
            ) : (
              <>
                <Mic size={32} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-wider mt-1 opacity-90">
                  Start Talk
                </span>
              </>
            )}
          </button>
        </div>

        {/* Dynamic Waveform Visualizer */}
        <div className="h-10 mt-3 flex items-center justify-center">
          {isActive ? (
            <WaveformVisualizer
              volume={volumeLevel}
              isSpeaking={isSpeaking}
              active={isActive}
            />
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <Volume2 size={15} className="text-gray-400" />
              <span>Click to start two-way voice call</span>
            </div>
          )}
        </div>

        {/* State Label Pill */}
        <div className="flex items-center gap-2 mt-1 px-3 py-1 rounded-full bg-surface-alt border border-border/80 text-xs font-semibold text-text-secondary">
          <span
            className={`w-2 h-2 rounded-full ${
              isActive
                ? isSpeaking
                  ? "bg-snapdeal animate-pulse"
                  : "bg-emerald-500 animate-pulse"
                : isConnecting
                  ? "bg-amber-500 animate-ping"
                  : "bg-gray-400"
            }`}
          />
          <span>{stateLabel}</span>
        </div>
      </div>

      {/* Suggested Spoken Prompts */}
      <div className="w-full pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1">
            <Sparkles size={12} className="text-amber-500" />
            Suggested Questions to Ask
          </span>
          {copiedPrompt && (
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <Check size={11} /> Copied!
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-1.5">
          {activeSeller.suggestedPrompts.slice(0, 3).map((prompt, i) => (
            <button
              key={i}
              onClick={() => handlePromptClick(prompt)}
              title="Click to copy prompt or use as speaking idea"
              className="w-full text-left p-2 rounded-xl bg-surface-alt hover:bg-gray-100 border border-border/60 hover:border-gray-300 text-xs text-text-secondary hover:text-text-primary transition-all flex items-center justify-between gap-2 cursor-pointer group"
            >
              <span className="truncate">"{prompt}"</span>
              <Copy
                size={12}
                className="text-gray-400 group-hover:text-snapdeal shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
