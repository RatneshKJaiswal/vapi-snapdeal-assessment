import { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  Copy,
  Check,
  Bot,
  Sparkles,
  Headphones,
} from "lucide-react";
import type { TranscriptMessage, SellerProfile } from "../../types";

interface TranscriptPanelProps {
  messages: TranscriptMessage[];
  isActive: boolean;
  activeSeller: SellerProfile;
}

function MessageBubble({
  message,
  activeSeller,
}: {
  message: TranscriptMessage;
  activeSeller: SellerProfile;
}) {
  const isUser = message.role === "user";
  const time = message.timestamp.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      className={`flex items-start gap-2.5 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ${
          isUser
            ? `${activeSeller.avatarColor} text-white`
            : "bg-snapdeal text-white"
        }`}
      >
        {isUser ? (
          activeSeller.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
        ) : (
          <Bot size={15} />
        )}
      </div>

      {/* Bubble Content */}
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[85%]`}>
        <div className="flex items-center gap-1.5 mb-1 text-[11px] text-text-secondary">
          <span className="font-bold">
            {isUser ? activeSeller.name : "Snapdeal KAM"}
          </span>
          <span>•</span>
          <span className="font-mono text-[10px] text-gray-400">{time}</span>
        </div>

        <div
          className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
            isUser
              ? "bg-snapdeal text-white rounded-tr-xs"
              : "bg-surface-alt border border-border/80 text-text-primary rounded-tl-xs"
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}

export default function TranscriptPanel({
  messages,
  isActive,
  activeSeller,
}: TranscriptPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Auto-scroll on new transcript message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleCopyTranscript = () => {
    if (messages.length === 0) return;
    const text = messages
      .map(
        (m) =>
          `[${m.timestamp.toLocaleTimeString()}] ${
            m.role === "user" ? activeSeller.name : "Snapdeal KAM"
          }: ${m.content}`
      )
      .join("\n\n");
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-surface rounded-2xl border border-border flex flex-col h-full max-h-full overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-snapdeal" />
          <h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Live Call Transcript
          </h2>
          {messages.length > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-gray-100 text-text-secondary">
              {messages.length}
            </span>
          )}
        </div>

        {/* Copy Button */}
        {messages.length > 0 && (
          <button
            onClick={handleCopyTranscript}
            className="flex items-center gap-1 text-[11px] font-medium text-text-secondary hover:text-snapdeal transition-colors cursor-pointer"
          >
            {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
            <span>{copied ? "Copied" : "Copy Notes"}</span>
          </button>
        )}
      </div>

      {/* Transcript Body - Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 transcript-scroll"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 text-text-secondary gap-3">
            <div className="w-12 h-12 rounded-2xl bg-surface-alt border border-border flex items-center justify-center text-gray-400">
              <Headphones size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">
                {isActive ? "Listening to voice input..." : "No conversation yet"}
              </p>
              <p className="text-xs text-text-secondary max-w-[240px] mt-1">
                {isActive
                  ? "Speak into your microphone. Words will appear here in real time."
                  : `Click the microphone to start a business review with your Snapdeal KAM for ${activeSeller.name}.`}
              </p>
            </div>

            {!isActive && (
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-snapdeal bg-snapdeal/5 px-2.5 py-1 rounded-full border border-snapdeal/20 mt-1">
                <Sparkles size={12} />
                <span>Supports natural interruptions & barge-in</span>
              </div>
            )}
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              activeSeller={activeSeller}
            />
          ))
        )}
      </div>
    </div>
  );
}
