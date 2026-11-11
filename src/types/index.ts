export interface TranscriptMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export type CallStatus = "idle" | "connecting" | "connected" | "disconnecting";

export interface SellerMetric {
  label: string;
  lastMonth: number;
  thisMonth: number;
  unit: "currency" | "count" | "percentage";
  trend: "up" | "down" | "neutral";
  changePercent: number;
  insight: string;
}

export interface InsightItem {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info" | "positive";
  relatedMetric?: string;
}

export interface RecommendedAction {
  id: string;
  priority: number;
  title: string;
  description: string;
  category: "inventory" | "operations" | "marketing" | "pricing";
  impact: string;
  defaultChecked?: boolean;
}

export interface SellerProfile {
  id: string;
  name: string;
  sellerId: string;
  category: string;
  tier: "Gold Partner" | "Platinum Merchant" | "Silver Seller";
  rating: number;
  avatarColor: string;
  tagline: string;
  scenarioDescription: string;
  metrics: SellerMetric[];
  insights: InsightItem[];
  actions: RecommendedAction[];
  suggestedPrompts: string[];
  diagnosisFramework: {
    revenueAnalysis: string;
    pricingFactor: string;
    inventoryFactor: string;
    cancellationFactor: string;
  };
}
