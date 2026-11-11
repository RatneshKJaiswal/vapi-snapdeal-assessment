export interface TranscriptMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export type CallStatus = "idle" | "connecting" | "connected" | "disconnecting";
