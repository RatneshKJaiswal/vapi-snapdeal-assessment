import { Phone, PhoneOff, Wifi, Headset } from "lucide-react";
import type { CallStatus, SellerProfile } from "../types";
import BusinessSwitcher from "./header/BusinessSwitcher";

interface HeaderProps {
  status: CallStatus;
  activeSeller: SellerProfile;
  onSelectSeller: (seller: SellerProfile) => void;
}

const statusConfig: Record<
  CallStatus,
  { label: string; bg: string; text: string; dot: string; icon: typeof Wifi }
> = {
  idle: {
    label: "Ready to Call",
    bg: "bg-emerald-50 border-emerald-200/60",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    icon: Headset,
  },
  connecting: {
    label: "Connecting...",
    bg: "bg-amber-50 border-amber-200/60",
    text: "text-amber-700",
    dot: "bg-amber-500 animate-ping",
    icon: Wifi,
  },
  connected: {
    label: "In Voice Call",
    bg: "bg-snapdeal/10 border-snapdeal/20",
    text: "text-snapdeal",
    dot: "bg-snapdeal animate-pulse",
    icon: Phone,
  },
  disconnecting: {
    label: "Ending...",
    bg: "bg-gray-100 border-gray-200",
    text: "text-gray-600",
    dot: "bg-gray-400",
    icon: PhoneOff,
  },
};

export default function Header({
  status,
  activeSeller,
  onSelectSeller,
}: HeaderProps) {
  const { label, bg, text, dot, icon: Icon } = statusConfig[status];

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-40 backdrop-blur-md bg-surface/95">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Snapdeal Branding */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-snapdeal flex items-center justify-center shadow-xs">
            <span className="text-white font-extrabold text-lg tracking-tight">
              S
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-text-primary">
                Snapdeal
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-snapdeal/10 text-snapdeal">
                Seller Central
              </span>
            </div>
            <p className="text-xs text-text-secondary flex items-center gap-1.5">
              <span>AI Key Account Manager</span>
              <span className="text-gray-300">•</span>
              <span className="text-emerald-600 font-medium">Virtual KAM Active</span>
            </p>
          </div>
        </div>

        {/* Center/Right: Business Switcher & Status */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Multi-business store selector */}
          <BusinessSwitcher
            activeSeller={activeSeller}
            onSelectSeller={onSelectSeller}
            callStatus={status}
          />

          {/* Connection status badge */}
          <div
            className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border shadow-xs transition-colors ${bg} ${text}`}
          >
            <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
            <Icon size={14} className="shrink-0" />
            <span className="hidden sm:inline">{label}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
