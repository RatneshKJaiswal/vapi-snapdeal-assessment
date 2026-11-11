import {
  TrendingDown,
  TrendingUp,
  Minus,
  IndianRupee,
  ShoppingCart,
  Tag,
  PackageX,
  XCircle,
  Star,
  ShieldCheck,
  Info,
} from "lucide-react";
import { formatMetricValue } from "../../data/sellerData";
import type { SellerMetric, SellerProfile } from "../../types";

const metricIcons: Record<string, typeof IndianRupee> = {
  "Total Sales": IndianRupee,
  Orders: ShoppingCart,
  "Avg. Selling Price": Tag,
  "Out-of-Stock Products": PackageX,
  "Cancellation Rate": XCircle,
};

function MetricCard({ metric }: { metric: SellerMetric }) {
  const Icon = metricIcons[metric.label] ?? Tag;

  const isOosOrCancel =
    metric.label === "Out-of-Stock Products" ||
    metric.label === "Cancellation Rate";

  const isFavorable = isOosOrCancel
    ? metric.changePercent <= 0
    : metric.changePercent >= 0;

  const isNeutral = metric.changePercent === 0;

  const trendBadgeClass = isNeutral
    ? "text-gray-600 bg-gray-100 border-gray-200"
    : isFavorable
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : "text-red-700 bg-red-50 border-red-200";

  const TrendIcon =
    metric.changePercent > 0
      ? TrendingUp
      : metric.changePercent < 0
        ? TrendingDown
        : Minus;

  // Compute comparative percentage bar (relative to max of the two months)
  const maxVal = Math.max(metric.lastMonth, metric.thisMonth, 1);
  const thisMonthPct = Math.min(100, Math.round((metric.thisMonth / maxVal) * 100));

  return (
    <div className="bg-surface rounded-2xl border border-border/80 p-4 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Metric Header */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 text-text-secondary">
            <div className="w-7 h-7 rounded-lg bg-surface-alt flex items-center justify-center text-text-secondary group-hover:text-snapdeal group-hover:bg-snapdeal/10 transition-colors">
              <Icon size={15} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              {metric.label}
            </span>
          </div>

          <div
            className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${trendBadgeClass}`}
          >
            <TrendIcon size={12} strokeWidth={2.5} />
            <span>
              {metric.changePercent > 0 ? "+" : ""}
              {metric.changePercent}%
            </span>
          </div>
        </div>

        {/* Current Metric Value */}
        <div className="text-2xl font-extrabold text-text-primary tracking-tight">
          {formatMetricValue(metric.thisMonth, metric.unit)}
        </div>

        <div className="text-xs text-text-secondary mt-1 flex items-center gap-1.5">
          <span className="text-gray-400">Previous:</span>
          <span className="font-medium text-text-primary">
            {formatMetricValue(metric.lastMonth, metric.unit)}
          </span>
        </div>
      </div>

      {/* Relative Comparison Bar */}
      <div className="mt-3.5 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
          <span>This Month vs Last</span>
          <span>{thisMonthPct}% of peak</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex gap-0.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isFavorable ? "bg-emerald-500" : isNeutral ? "bg-gray-400" : "bg-snapdeal"
            }`}
            style={{ width: `${thisMonthPct}%` }}
          />
        </div>
        <p className="text-[11px] text-text-secondary mt-2 line-clamp-1 group-hover:line-clamp-none transition-all">
          {metric.insight}
        </p>
      </div>
    </div>
  );
}

export default function MetricsPanel({
  activeSeller,
}: {
  activeSeller: SellerProfile;
}) {
  return (
    <section className="space-y-3.5">
      {/* Seller Header Summary Strip */}
      <div className="bg-surface rounded-2xl border border-border p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-2xl ${activeSeller.avatarColor} text-white flex items-center justify-center font-extrabold text-base shadow-sm shrink-0`}
          >
            {activeSeller.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-text-primary">
                {activeSeller.name}
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center gap-1">
                <ShieldCheck size={12} />
                {activeSeller.tier}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center gap-1">
                <Star size={11} className="fill-blue-500 text-blue-500" />
                {activeSeller.rating} Rating
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              {activeSeller.tagline} •{" "}
              <span className="font-mono text-gray-500">
                {activeSeller.sellerId}
              </span>
            </p>
          </div>
        </div>

        {/* Active Scenario Banner */}
        <div className="md:max-w-md bg-surface-alt rounded-xl p-2.5 border border-border/80 flex items-start gap-2 text-xs text-text-secondary">
          <Info size={15} className="text-snapdeal shrink-0 mt-0.5" />
          <p className="line-clamp-2 text-[11px] leading-relaxed">
            <span className="font-semibold text-text-primary">Diagnosis: </span>
            {activeSeller.scenarioDescription}
          </p>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
        {activeSeller.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
    </section>
  );
}
