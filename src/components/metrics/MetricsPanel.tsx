import {
  TrendingDown,
  TrendingUp,
  Minus,
  IndianRupee,
  ShoppingCart,
  Tag,
  PackageX,
  XCircle,
} from "lucide-react";
import { sellerData, formatMetricValue } from "../../data/sellerData";
import type { SellerMetric } from "../../data/sellerData";

const metricIcons: Record<string, typeof IndianRupee> = {
  "Total Sales": IndianRupee,
  Orders: ShoppingCart,
  "Avg. Selling Price": Tag,
  "Out-of-Stock Products": PackageX,
  "Cancellation Rate": XCircle,
};

function MetricCard({ metric }: { metric: SellerMetric }) {
  const Icon = metricIcons[metric.label] ?? Tag;

  const trendColor =
    metric.trend === "neutral"
      ? "text-text-secondary bg-gray-50"
      : // For OOS and cancellations, "up" is bad
        (metric.label === "Out-of-Stock Products" ||
            metric.label === "Cancellation Rate")
        ? metric.trend === "up"
          ? "text-danger bg-red-50"
          : "text-success bg-green-50"
        : metric.trend === "down"
          ? "text-danger bg-red-50"
          : "text-success bg-green-50";

  const TrendIcon =
    metric.trend === "up"
      ? TrendingUp
      : metric.trend === "down"
        ? TrendingDown
        : Minus;

  return (
    <div className="bg-surface rounded-xl border border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-text-secondary">
          <Icon size={16} />
          <span className="text-xs font-medium uppercase tracking-wide">
            {metric.label}
          </span>
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${trendColor}`}
        >
          <TrendIcon size={12} />
          <span>
            {metric.changePercent > 0 ? "+" : ""}
            {metric.changePercent}%
          </span>
        </div>
      </div>

      <div className="text-xl font-bold text-text-primary">
        {formatMetricValue(metric.thisMonth, metric.unit)}
      </div>
      <div className="text-xs text-text-secondary mt-1">
        Last month: {formatMetricValue(metric.lastMonth, metric.unit)}
      </div>
    </div>
  );
}

export default function MetricsPanel() {
  return (
    <section>
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
        Business Performance
      </h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
        {sellerData.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
    </section>
  );
}
