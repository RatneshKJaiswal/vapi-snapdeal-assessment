import {
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  PackageX,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { sellerData } from "../../data/sellerData";
import type { CallStatus } from "../../types";

interface InsightsPanelProps {
  status: CallStatus;
  hasMessages: boolean;
}

interface InsightItem {
  icon: typeof AlertTriangle;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info";
}

const insights: InsightItem[] = [
  {
    icon: PackageX,
    title: "Inventory Crisis",
    description: `Out-of-stock products surged from ${sellerData.metrics[3]!.lastMonth} to ${sellerData.metrics[3]!.thisMonth} — a ${sellerData.metrics[3]!.changePercent}% increase. This is likely the primary driver of lost orders.`,
    severity: "critical",
  },
  {
    icon: XCircle,
    title: "Rising Cancellations",
    description: `Cancellation rate jumped from ${sellerData.metrics[4]!.lastMonth}% to ${sellerData.metrics[4]!.thisMonth}%, reducing net revenue and hurting visibility.`,
    severity: "critical",
  },
  {
    icon: CheckCircle2,
    title: "Pricing is Stable",
    description:
      "Average selling price unchanged at ₹500 — pricing is not a factor in the decline.",
    severity: "info",
  },
];

interface ActionItem {
  priority: number;
  title: string;
  description: string;
}

const actions: ActionItem[] = [
  {
    priority: 1,
    title: "Restock Inventory",
    description:
      "Prioritize restocking high-velocity SKUs. Set up safety stock levels and reorder alerts.",
  },
  {
    priority: 2,
    title: "Reduce Cancellations",
    description:
      "Audit dispatch SLAs and inventory accuracy. Target cancellation rate below 8%.",
  },
  {
    priority: 3,
    title: "Recover Visibility",
    description:
      "Once inventory is restored, run promotions and sponsored listings to recover organic ranking.",
  },
];

const severityStyles: Record<InsightItem["severity"], string> = {
  critical: "border-l-danger bg-red-50/50",
  warning: "border-l-warning bg-amber-50/50",
  info: "border-l-emerald-500 bg-emerald-50/50",
};

export default function InsightsPanel({
  status,
  hasMessages,
}: InsightsPanelProps) {
  const showContent = status === "connected" || hasMessages;

  return (
    <div className="bg-surface rounded-xl border border-border flex flex-col h-[400px] lg:h-full">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
          Insights & Actions
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5 transcript-scroll">
        {!showContent ? (
          <div className="flex flex-col items-center justify-center h-full text-text-secondary gap-3">
            <Lightbulb size={32} strokeWidth={1.5} />
            <p className="text-sm text-center">
              AI insights and recommendations will appear here during the
              conversation
            </p>
          </div>
        ) : (
          <>
            {/* Identified Issues */}
            <div>
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle size={12} />
                Identified Issues
              </h3>
              <div className="space-y-2">
                {insights.map((item) => (
                  <div
                    key={item.title}
                    className={`border-l-3 rounded-r-lg p-3 ${severityStyles[item.severity]}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon size={14} className="shrink-0" />
                      <span className="text-sm font-semibold">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Actions */}
            <div>
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lightbulb size={12} />
                Recommended Actions
              </h3>
              <div className="space-y-2">
                {actions.map((action) => (
                  <div
                    key={action.priority}
                    className="flex gap-3 p-3 rounded-lg bg-surface-alt"
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-snapdeal text-white text-xs font-bold shrink-0">
                      {action.priority}
                    </div>
                    <div>
                      <div className="text-sm font-semibold flex items-center gap-1">
                        {action.title}
                        <ArrowRight size={12} className="text-text-secondary" />
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                        {action.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
