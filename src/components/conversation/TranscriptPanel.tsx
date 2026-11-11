import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import type { TranscriptMessage } from "../../types";

interface TranscriptPanelProps {
  messages: TranscriptMessage[];
  isActive: boolean;
}

function MessageBubble({ message }: { message: TranscriptMessage }) {
  const isUser = message.role === "user";
  const time = message.timestamp.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
          {isUser ? "You" : "KAM"}
        </span>
        <span className="text-[10px] text-text-secondary">{time}</span>
      </div>
      <div
        className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-snapdeal text-white rounded-br-sm"
            : "bg-gray-100 text-text-primary rounded-bl-sm"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

export default function TranscriptPanel({
  messages,
  isActive,
}: TranscriptPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-surface rounded-xl border border-border flex flex-col h-[400px] lg:h-full">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
          Conversation
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 transcript-scroll"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-text-secondary gap-3">
            <MessageSquare size={32} strokeWidth={1.5} />
            <p className="text-sm text-center">
              {isActive
                ? "Listening… Speak to your KAM"
                : "Start a voice conversation to see the transcript here"}
            </p>
          </div>
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        )}
      </div>
    </div>
  );
}
