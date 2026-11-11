import { useState, useEffect, useRef, useCallback } from "react";
import Vapi from "@vapi-ai/web";
import { getAssistantConfig } from "../services/vapiConfig";
import type { TranscriptMessage, CallStatus, SellerProfile } from "../types";

const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY as string | undefined;

// Module-level singleton — survives React re-renders and StrictMode double-mount
let vapiInstance: Vapi | null = null;

function getVapi(): Vapi {
  if (!vapiInstance && publicKey) {
    vapiInstance = new Vapi(publicKey);
  }
  if (!vapiInstance) {
    throw new Error("Vapi public key is not configured");
  }
  return vapiInstance;
}

export interface UseVapiReturn {
  status: CallStatus;
  isSpeaking: boolean;
  volumeLevel: number;
  messages: TranscriptMessage[];
  error: string | null;
  callDuration: number;
  startCall: (seller?: SellerProfile) => Promise<void>;
  endCall: () => void;
  clearError: () => void;
  clearMessages: () => void;
  isConfigured: boolean;
}

export function useVapi(): UseVapiReturn {
  const [status, setStatus] = useState<CallStatus>("idle");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [callDuration, setCallDuration] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const callStartTimeRef = useRef<number | null>(null);

  const isConfigured = Boolean(publicKey);

  // Timer management
  const startTimer = useCallback(() => {
    callStartTimeRef.current = Date.now();
    setCallDuration(0);
    timerRef.current = setInterval(() => {
      if (callStartTimeRef.current) {
        setCallDuration(
          Math.floor((Date.now() - callStartTimeRef.current) / 1000)
        );
      }
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    callStartTimeRef.current = null;
  }, []);

  // Set up Vapi event listeners
  useEffect(() => {
    if (!isConfigured) return;

    const vapi = getVapi();

    const onCallStart = () => {
      setStatus("connected");
      setError(null);
      startTimer();
    };

    const onCallEnd = () => {
      setStatus("idle");
      setIsSpeaking(false);
      setVolumeLevel(0);
      stopTimer();
    };

    const onSpeechStart = () => {
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      setIsSpeaking(false);
    };

    const onVolumeLevel = (volume: number) => {
      setVolumeLevel(volume);
    };

    const onError = (err: unknown) => {
      console.error("Vapi error:", err);
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err !== null && "error" in err
            ? String(
                (err as { error: { message?: string } }).error?.message ??
                  "Connection failed"
              )
            : "An unexpected error occurred";
      setError(message);
      setStatus("idle");
      stopTimer();
    };

    const onMessage = (msg: Record<string, unknown>) => {
      if (msg.type === "transcript" && msg.transcriptType === "final") {
        const role = msg.role as "user" | "assistant";
        const content = msg.transcript as string;
        if (content) {
          setMessages((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              role,
              content,
              timestamp: new Date(),
            },
          ]);
        }
      }
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("volume-level", onVolumeLevel);
    vapi.on("error", onError);
    vapi.on("message", onMessage);

    return () => {
      vapi.removeAllListeners();
      stopTimer();
    };
  }, [isConfigured, startTimer, stopTimer]);

  const startCall = useCallback(async (seller?: SellerProfile) => {
    if (!isConfigured) {
      setError("Vapi public key is not configured. Add VITE_VAPI_PUBLIC_KEY to your .env file.");
      return;
    }

    // Guard against duplicate calls
    if (status === "connecting" || status === "connected") {
      return;
    }

    setStatus("connecting");
    setError(null);
    setMessages([]);
    setCallDuration(0);

    try {
      const vapi = getVapi();
      const config = getAssistantConfig(seller);
      await vapi.start(config);
    } catch (err) {
      console.error("Failed to start call:", err);

      let message = "Failed to start the conversation.";
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        message =
          "Microphone access was denied. Please allow microphone permissions in your browser settings and try again.";
      } else if (
        err instanceof DOMException &&
        err.name === "NotFoundError"
      ) {
        message =
          "No microphone found. Please connect a microphone and try again.";
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
      setStatus("idle");
    }
  }, [isConfigured, status]);

  const endCall = useCallback(() => {
    if (status !== "connected" && status !== "connecting") return;

    setStatus("disconnecting");
    try {
      const vapi = getVapi();
      vapi.stop();
    } catch {
      // If stop fails, force reset state
      setStatus("idle");
      stopTimer();
    }
  }, [status, stopTimer]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    status,
    isSpeaking,
    volumeLevel,
    messages,
    error,
    callDuration,
    startCall,
    endCall,
    clearError,
    clearMessages,
    isConfigured,
  };
}
