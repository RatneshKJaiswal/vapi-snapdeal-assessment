export interface SellerMetric {
  label: string;
  lastMonth: number;
  thisMonth: number;
  unit: "currency" | "count" | "percentage";
  trend: "up" | "down" | "neutral";
  changePercent: number;
  insight: string;
}

export interface SellerProfile {
  name: string;
  sellerId: string;
  category: string;
  metrics: SellerMetric[];
}

export const sellerData: SellerProfile = {
  name: "Rajesh Electronics",
  sellerId: "SNP-2024-1847",
  category: "Electronics & Accessories",
  metrics: [
    {
      label: "Total Sales",
      lastMonth: 200000,
      thisMonth: 135000,
      unit: "currency",
      trend: "down",
      changePercent: -32.5,
      insight: "Revenue dropped by ₹65,000 — a 32.5% decline",
    },
    {
      label: "Orders",
      lastMonth: 400,
      thisMonth: 270,
      unit: "count",
      trend: "down",
      changePercent: -32.5,
      insight:
        "Order volume decline mirrors sales decline — volume is the driver",
    },
    {
      label: "Avg. Selling Price",
      lastMonth: 500,
      thisMonth: 500,
      unit: "currency",
      trend: "neutral",
      changePercent: 0,
      insight: "ASP unchanged — pricing is NOT the cause of decline",
    },
    {
      label: "Out-of-Stock Products",
      lastMonth: 5,
      thisMonth: 18,
      unit: "count",
      trend: "up",
      changePercent: 260,
      insight: "13 additional products went OOS — major contributor to lost sales",
    },
    {
      label: "Cancellation Rate",
      lastMonth: 8,
      thisMonth: 14,
      unit: "percentage",
      trend: "up",
      changePercent: 75,
      insight:
        "6pp increase — fulfillment issues eroding net revenue and visibility",
    },
  ],
};

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMetricValue(value: number, unit: SellerMetric["unit"]): string {
  switch (unit) {
    case "currency":
      return formatCurrency(value);
    case "percentage":
      return `${value}%`;
    case "count":
      return value.toLocaleString("en-IN");
  }
}
