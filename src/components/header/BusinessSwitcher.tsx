import { useState, useRef, useEffect } from "react";
import { ChevronDown, Store, Sparkles } from "lucide-react";
import { businesses, formatCurrency } from "../../data/sellerData";
import type { SellerProfile, CallStatus } from "../../types";

interface BusinessSwitcherProps {
  activeSeller: SellerProfile;
  onSelectSeller: (seller: SellerProfile) => void;
  callStatus: CallStatus;
}

export default function BusinessSwitcher({
  activeSeller,
  onSelectSeller,
  callStatus,
}: BusinessSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isCallActive = callStatus === "connected" || callStatus === "connecting";

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          if (!isCallActive) {
            setIsOpen((prev) => !prev);
          }
        }}
        disabled={isCallActive}
        title={
          isCallActive
            ? "Cannot switch seller account while voice call is active"
            : "Switch Seller Store"
        }
        className={`flex items-center gap-3 px-3.5 py-2 rounded-xl border text-left transition-all duration-200 ${
          isCallActive
            ? "bg-gray-100/80 border-gray-200 cursor-not-allowed opacity-75"
            : "bg-surface hover:bg-surface-alt border-border hover:border-gray-300 shadow-xs cursor-pointer"
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-lg ${activeSeller.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}
        >
          {activeSeller.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </div>

        {/* Name & ID */}
        <div className="flex flex-col min-w-0 pr-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-text-primary truncate max-w-[150px] sm:max-w-[200px]">
              {activeSeller.name}
            </span>
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-text-secondary border border-gray-200/60 hidden sm:inline-block">
              {activeSeller.sellerId}
            </span>
          </div>
          <span className="text-xs text-text-secondary truncate">
            {activeSeller.category}
          </span>
        </div>

        <ChevronDown
          size={16}
          className={`text-text-secondary transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && !isCallActive && (
        <div className="absolute right-0 sm:left-0 top-full mt-2 w-80 sm:w-96 bg-surface rounded-2xl border border-border shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-3.5 bg-surface-alt border-b border-border flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <Store size={14} className="text-snapdeal" />
                Select Seller Account
              </div>
              <p className="text-[11px] text-text-secondary mt-0.5">
                Switch store to diagnose metrics & talk with AI KAM
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-snapdeal/10 text-snapdeal">
              {businesses.length} Stores Available
            </span>
          </div>

          <div className="p-2 space-y-1.5 max-h-80 overflow-y-auto">
            {businesses.map((biz) => {
              const isSelected = biz.id === activeSeller.id;
              const salesMetric = biz.metrics[0];
              const isSalesUp = (salesMetric?.changePercent ?? 0) >= 0;

              return (
                <button
                  key={biz.id}
                  onClick={() => {
                    onSelectSeller(biz);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-snapdeal/5 border border-snapdeal/30"
                      : "hover:bg-surface-alt border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl ${biz.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}
                    >
                      {biz.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-sm font-semibold truncate ${
                            isSelected ? "text-snapdeal" : "text-text-primary"
                          }`}
                        >
                          {biz.name}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-snapdeal shrink-0" />
                        )}
                      </div>
                      <div className="text-xs text-text-secondary truncate mt-0.5">
                        {biz.category} •{" "}
                        <span className="font-mono text-[11px]">
                          {biz.sellerId}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0 pl-3">
                    <span className="text-xs font-bold text-text-primary">
                      {salesMetric ? formatCurrency(salesMetric.thisMonth) : "—"}
                    </span>
                    <span
                      className={`text-[10px] font-semibold ${
                        isSalesUp ? "text-success" : "text-danger"
                      }`}
                    >
                      {salesMetric
                        ? `${isSalesUp ? "+" : ""}${salesMetric.changePercent}%`
                        : ""}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-surface-alt/70 border-t border-border flex items-center gap-2 text-[11px] text-text-secondary">
            <Sparkles size={13} className="text-amber-500 shrink-0" />
            <span>
              Voice KAM prompts dynamically update based on the active store.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
