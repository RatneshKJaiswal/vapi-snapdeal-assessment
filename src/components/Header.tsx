import { Phone, PhoneOff, Wifi, WifiOff } from "lucide-react";
import type { CallStatus } from "../types";

interface HeaderProps {
  status: CallStatus;
}

const statusConfig: Record<
  CallStatus,
  { label: string; color: string; icon: typeof Wifi }
> = {
  idle: { label: "Offline", color: "text-text-secondary", icon: WifiOff },
  connecting: { label: "Connecting…", color: "text-warning", icon: Wifi },
  connected: { label: "In Call", color: "text-success", icon: Phone },
  disconnecting: { label: "Ending…", color: "text-warning", icon: PhoneOff },
};

export default function Header({ status }: HeaderProps) {
  const { label, color, icon: Icon } = statusConfig[status];

  return (
    <header className="bg-surface border-b border-border px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Snapdeal brand mark */}
        <div className="w-8 h-8 rounded-lg bg-snapdeal flex items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <div>
          <h1 className="text-base font-semibold leading-tight">
            Snapdeal <span className="text-snapdeal">AI Voice KAM</span>
          </h1>
          <p className="text-xs text-text-secondary">
            Virtual Key Account Manager
          </p>
        </div>
      </div>

      <div className={`flex items-center gap-2 text-sm font-medium ${color}`}>
        <Icon size={16} />
        <span>{label}</span>
      </div>
    </header>
  );
}
