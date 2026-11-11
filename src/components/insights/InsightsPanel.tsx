import { useState } from "react";
import {
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Package,
  Truck,
  TrendingUp,
  Tag,
  CheckSquare,
  Square,
  Sparkles,
} from "lucide-react";
import type { SellerProfile, CallStatus, RecommendedAction } from "../../types";

interface InsightsPanelProps {
  status: CallStatus;
  hasMessages: boolean;
  activeSeller: SellerProfile;
}

const categoryIcons = {
  inventory: Package,
  operations: Truck,
  marketing: TrendingUp,
  pricing: Tag,
};

const categoryBadgeColors = {
  inventory: "bg-blue-50 text-blue-700 border-blue-200",
  operations: "bg-purple-50 text-purple-700 border-purple-200",
  marketing: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pricing: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function InsightsPanel({
  activeSeller,
}: InsightsPanelProps) {
  // Interactive checklist state for recommended action items
  const [checkedActions, setCheckedActions] = useState<Record<string, boolean>>(
    {}
  );

  const toggleAction = (id: string) => {
    setCheckedActions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = activeSeller.actions.filter(
    (a) => checkedActions[a.id]
  ).length;

  return (
    <div className="bg-surface rounded-2xl border border-border flex flex-col h-[460px] lg:h-full shadow-xs">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb size={16} className="text-amber-500" />
          <h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Diagnostics & Action Plan
          </h2>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          {completedCount}/{activeSeller.actions.length} Agreed
        </span>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 transcript-scroll">
        {/* Identified Root Causes */}
        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <AlertTriangle size={13} className="text-snapdeal" />
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
              Diagnosed Root Causes
            </h3>
          </div>

          <div className="space-y-2">
            {activeSeller.insights.map((item) => {
              const borderClass =
                item.severity === "critical"
                  ? "border-l-danger bg-red-50/40 text-danger"
                  : item.severity === "warning"
                    ? "border-l-warning bg-amber-50/40 text-warning"
                    : "border-l-emerald-500 bg-emerald-50/40 text-emerald-600";

              return (
                <div
                  key={item.id}
                  className={`border-l-3 rounded-r-xl p-3 ${borderClass} border border-t-0 border-r-0 border-b-0 transition-colors`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-text-primary">
                      {item.title}
                    </span>
                    {item.relatedMetric && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-gray-100 text-text-secondary">
                        {item.relatedMetric}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actionable Corrective Plan */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-600" />
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                Prioritized Action Plan
              </h3>
            </div>
            <span className="text-[10px] text-gray-400">Click to mark agreed</span>
          </div>

          <div className="space-y-2.5">
            {activeSeller.actions.map((action: RecommendedAction) => {
              const isChecked = Boolean(checkedActions[action.id]);
              const CategoryIcon = categoryIcons[action.category] ?? Sparkles;
              const badgeStyle = categoryBadgeColors[action.category];

              return (
                <div
                  key={action.id}
                  onClick={() => toggleAction(action.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isChecked
                      ? "bg-emerald-50/30 border-emerald-300"
                      : "bg-surface-alt hover:bg-surface border-border/80 hover:border-gray-300"
                  }`}
                >
                  {/* Top Bar: Checkbox + Priority + Category */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-emerald-600 transition-colors"
                        aria-label="Toggle action agreement"
                      >
                        {isChecked ? (
                          <CheckSquare size={16} className="text-emerald-600" />
                        ) : (
                          <Square size={16} />
                        )}
                      </button>
                      <span
                        className={`text-xs font-bold ${
                          isChecked
                            ? "line-through text-gray-400"
                            : "text-text-primary"
                        }`}
                      >
                        P{action.priority}: {action.title}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1 ${badgeStyle}`}
                    >
                      <CategoryIcon size={10} />
                      {action.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-xs leading-relaxed pl-6 ${
                      isChecked ? "text-gray-400" : "text-text-secondary"
                    }`}
                  >
                    {action.description}
                  </p>

                  {/* Impact Tag */}
                  <div className="mt-2 pl-6 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                    <Sparkles size={11} className="text-emerald-600" />
                    <span>{action.impact}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
