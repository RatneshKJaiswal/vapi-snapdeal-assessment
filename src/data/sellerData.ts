import type { SellerProfile, SellerMetric } from "../types";

/**
 * Multi-Business Performance Configuration
 * 
 * To add a new seller/business:
 * 1. Add a new object to the `businesses` array below.
 * 2. Define the 5 key metrics (Sales, Orders, ASP, OOS, Cancellations).
 * 3. Provide contextual insights, recommended actions, and prompt suggestions.
 * 4. The UI and the AI Voice KAM will automatically adapt to the new business!
 */
export const businesses: SellerProfile[] = [
  {
    id: "rajesh-electronics",
    name: "Rajesh Electronics",
    sellerId: "SNP-2024-1847",
    category: "Electronics & Accessories",
    tier: "Gold Partner",
    rating: 4.3,
    avatarColor: "bg-blue-600",
    tagline: "High-volume smartphone accessories & consumer gadgets",
    scenarioDescription:
      "Sales plummeted by 32.5% this month despite stable pricing. Stockouts on hero products and surging order cancellations are eroding customer trust.",
    metrics: [
      {
        label: "Total Sales",
        lastMonth: 200000,
        thisMonth: 135000,
        unit: "currency",
        trend: "down",
        changePercent: -32.5,
        insight: "Sales dropped by ₹65,000 (-32.5%) — urgent intervention needed.",
      },
      {
        label: "Orders",
        lastMonth: 400,
        thisMonth: 270,
        unit: "count",
        trend: "down",
        changePercent: -32.5,
        insight: "130 fewer orders fulfilled. Order drop perfectly matches revenue drop.",
      },
      {
        label: "Avg. Selling Price",
        lastMonth: 500,
        thisMonth: 500,
        unit: "currency",
        trend: "neutral",
        changePercent: 0,
        insight: "ASP constant at ₹500. Pricing is NOT the driver of sales decline.",
      },
      {
        label: "Out-of-Stock Products",
        lastMonth: 5,
        thisMonth: 18,
        unit: "count",
        trend: "up",
        changePercent: 260,
        insight: "13 more items unavailable (+260%). Top revenue drivers are unlisted.",
      },
      {
        label: "Cancellation Rate",
        lastMonth: 8,
        thisMonth: 14,
        unit: "percentage",
        trend: "up",
        changePercent: 75,
        insight: "Surged to 14% (+6pp). High cancellations hurt platform ranking & GMV.",
      },
    ],
    insights: [
      {
        id: "oos-crisis",
        title: "Severe Inventory Stockouts",
        description:
          "18 SKUs are currently out of stock compared to just 5 last month (+260%). When high-demand items go out of stock, Snapdeal algorithms suppress organic listing visibility.",
        severity: "critical",
        relatedMetric: "Out-of-Stock Products",
      },
      {
        id: "cancellation-surge",
        title: "Unacceptable Cancellation Rate",
        description:
          "Cancellations climbed from 8% to 14%. Platform benchmark is under 5%. Frequent seller cancellations lead to penalty fees and suppressed buy-box positioning.",
        severity: "critical",
        relatedMetric: "Cancellation Rate",
      },
      {
        id: "price-stability",
        title: "Healthy Pricing Integrity",
        description:
          "Average selling price held firm at ₹500. Demand exists at this price point; lost sales are entirely supply-chain and fulfillment driven.",
        severity: "positive",
        relatedMetric: "Avg. Selling Price",
      },
    ],
    actions: [
      {
        id: "action-restock",
        priority: 1,
        title: "Restock Top 10 High-Velocity SKUs",
        description:
          "Prioritize restocking fast-moving chargers and tempered glass. Set buffer safety stock threshold at 15 units to trigger automated reorder alerts.",
        category: "inventory",
        impact: "Estimated +₹45,000 monthly GMV recovery",
        defaultChecked: false,
      },
      {
        id: "action-sla",
        priority: 2,
        title: "Audit Dispatch SLAs & Stock Accuracy",
        description:
          "Audit warehouse inventory daily at 10 AM before confirming orders. Target bringing cancellation rate back under 6% within 14 days.",
        category: "operations",
        impact: "Prevents search rank suppression & penalty fees",
        defaultChecked: false,
      },
      {
        id: "action-ads",
        priority: 3,
        title: "Reactivate Sponsored Visibility Post-Restock",
        description:
          "Allocate ₹3,000 in Snapdeal Sponsored Product Ads once catalog inventory is replenished to regain page-1 search ranking.",
        category: "marketing",
        impact: "Recovers organic search momentum",
        defaultChecked: false,
      },
    ],
    suggestedPrompts: [
      "Why did my sales drop 32% this month?",
      "Is my product pricing causing the decline?",
      "How do the 18 out-of-stock items affect my store?",
      "What are the top 3 actions I should take today?",
    ],
    diagnosisFramework: {
      revenueAnalysis:
        "Sales dropped by 32.5% (₹2,00,000 to ₹1,35,000) driven by an identical 32.5% decrease in order volume (400 to 270 orders).",
      pricingFactor:
        "ASP remained unchanged at ₹500, confirming pricing is not the reason for lower sales.",
      inventoryFactor:
        "Out-of-stock products spiked from 5 to 18 (+260%). This is the primary driver of lost conversion.",
      cancellationFactor:
        "Cancellations escalated from 8% to 14% (+75% relative increase), indicating fulfillment delays or inventory count inaccuracies.",
    },
  },
  {
    id: "aarav-footwear",
    name: "Aarav Footwear & Apparel",
    sellerId: "SNP-2024-3912",
    category: "Footwear & Lifestyle",
    tier: "Platinum Merchant",
    rating: 4.6,
    avatarColor: "bg-indigo-600",
    tagline: "Casual sneakers, ethnic juttis & comfort footwear",
    scenarioDescription:
      "Aggressive discounting reduced ASP by 20%, but failed to drive volume. Courier dispatch delays in the North zone caused cancellation rates to reach 19%.",
    metrics: [
      {
        label: "Total Sales",
        lastMonth: 450000,
        thisMonth: 315000,
        unit: "currency",
        trend: "down",
        changePercent: -30.0,
        insight: "Sales dropped by ₹1,35,000 (-30%) due to lower ASP and cancelled shipments.",
      },
      {
        label: "Orders",
        lastMonth: 600,
        thisMonth: 525,
        unit: "count",
        trend: "down",
        changePercent: -12.5,
        insight: "Orders dropped by 75 units despite promotional discounts.",
      },
      {
        label: "Avg. Selling Price",
        lastMonth: 750,
        thisMonth: 600,
        unit: "currency",
        trend: "down",
        changePercent: -20.0,
        insight: "ASP eroded from ₹750 to ₹600 (-20%) without lifting order velocity.",
      },
      {
        label: "Out-of-Stock Products",
        lastMonth: 8,
        thisMonth: 9,
        unit: "count",
        trend: "neutral",
        changePercent: 12.5,
        insight: "Inventory levels are stable with only 9 items out of stock.",
      },
      {
        label: "Cancellation Rate",
        lastMonth: 6,
        thisMonth: 19,
        unit: "percentage",
        trend: "up",
        changePercent: 216.7,
        insight: "Massive spike to 19% (+13pp) caused by regional courier pickup failures.",
      },
    ],
    insights: [
      {
        id: "cancellation-crisis",
        title: "Logistics Breakdown: 19% Cancellations",
        description:
          "Cancellations surged by over 200% to 19%. Customer complaints indicate third-party courier pickup missed 48-hour SLAs, forcing automatic platform cancellations.",
        severity: "critical",
        relatedMetric: "Cancellation Rate",
      },
      {
        id: "pricing-erosion",
        title: "Discounting Without Volume Elasticity",
        description:
          "Lowering prices from ₹750 to ₹600 failed to attract incremental buyers and directly burned ₹150 margin per order. Discount elasticity was negative.",
        severity: "warning",
        relatedMetric: "Avg. Selling Price",
      },
      {
        id: "stable-catalog",
        title: "Healthy Catalog Availability",
        description:
          "Stockout rate is under control (only 9 SKUs out of stock). Catalog breadth remains solid.",
        severity: "positive",
        relatedMetric: "Out-of-Stock Products",
      },
    ],
    actions: [
      {
        id: "action-courier",
        priority: 1,
        title: "Switch to Snapdeal Smart Logistics Partner",
        description:
          "Migrate Delhi-NCR dispatch to Snapdeal Express Logistics to guarantee same-day warehouse handover and bring cancellations under 4%.",
        category: "operations",
        impact: "Recovers ~₹60,000 lost revenue in cancelled shipments",
        defaultChecked: false,
      },
      {
        id: "action-price-restore",
        priority: 2,
        title: "Restore Baseline ASP to ₹720+",
        description:
          "End unprofitable blanket discounting on best-selling sneakers. Replace with combo bundle offers (e.g. shoes + socks combo) to preserve margin.",
        category: "pricing",
        impact: "Restores ₹75,000 monthly gross margin",
        defaultChecked: false,
      },
      {
        id: "action-festive-prep",
        priority: 3,
        title: "Enroll in Snapdeal End of Season Sale",
        description:
          "Submit curated ethnic footwear catalog for banner placement in the upcoming seasonal campaign.",
        category: "marketing",
        impact: "Targets 2.5x volume expansion",
        defaultChecked: false,
      },
    ],
    suggestedPrompts: [
      "Why did my revenue drop even though I gave heavy discounts?",
      "How do I fix the 19% cancellation rate?",
      "Should I increase my prices back to ₹750?",
      "Can Snapdeal help with courier pickup delays?",
    ],
    diagnosisFramework: {
      revenueAnalysis:
        "Sales dropped 30% from ₹4.5 lakh to ₹3.15 lakh, primarily caused by price dilution and severe order cancellation rates.",
      pricingFactor:
        "ASP dropped from ₹750 to ₹600 (-20%). Discounting failed to stimulate demand, leading to net margin destruction.",
      inventoryFactor:
        "Inventory is healthy with only 9 items out of stock; catalog availability is not the issue.",
      cancellationFactor:
        "Cancellations reached an alarming 19% due to regional courier transit and dispatch delays.",
    },
  },
  {
    id: "kavita-home",
    name: "Kavita Home Essentials",
    sellerId: "SNP-2024-5108",
    category: "Home & Kitchen Appliances",
    tier: "Silver Seller",
    rating: 4.1,
    avatarColor: "bg-emerald-600",
    tagline: "Cast iron cookware, organizers & kitchen utilities",
    scenarioDescription:
      "Rapid sales growth (+33.3%) is hitting a severe inventory wall. 25 products are now out of stock, and fulfillment capacity is straining under high order volume.",
    metrics: [
      {
        label: "Total Sales",
        lastMonth: 180000,
        thisMonth: 240000,
        unit: "currency",
        trend: "up",
        changePercent: 33.3,
        insight: "Strong revenue growth (+33.3%) powered by viral cookware listings.",
      },
      {
        label: "Orders",
        lastMonth: 300,
        thisMonth: 480,
        unit: "count",
        trend: "up",
        changePercent: 60.0,
        insight: "Orders exploded from 300 to 480 (+60%). Demand is surging.",
      },
      {
        label: "Avg. Selling Price",
        lastMonth: 600,
        thisMonth: 500,
        unit: "currency",
        trend: "down",
        changePercent: -16.7,
        insight: "Entry-level spice racks & cookware drove volume at lower price points.",
      },
      {
        label: "Out-of-Stock Products",
        lastMonth: 12,
        thisMonth: 25,
        unit: "count",
        trend: "up",
        changePercent: 108.3,
        insight: "25 products OOS (+108%). Inventory depletion threatens to stall growth.",
      },
      {
        label: "Cancellation Rate",
        lastMonth: 5,
        thisMonth: 9,
        unit: "percentage",
        trend: "up",
        changePercent: 80.0,
        insight: "Creeping up to 9% due to warehouse packaging delays under high order volume.",
      },
    ],
    insights: [
      {
        id: "growth-bottleneck",
        title: "Growth Bottleneck: 25 OOS SKUs",
        description:
          "Sales increased +33% but 25 items are now completely sold out. Without rapid restocking, store momentum will collapse by mid-month.",
        severity: "critical",
        relatedMetric: "Out-of-Stock Products",
      },
      {
        id: "fulfillment-strain",
        title: "Warehouse Bottleneck & Packing Delays",
        description:
          "Fulfillment volume grew 60%, pushing cancellation rate from 5% to 9%. Dispatch backlog needs additional packaging staff or extended SLA window.",
        severity: "warning",
        relatedMetric: "Cancellation Rate",
      },
      {
        id: "strong-demand",
        title: "High Consumer Demand & Viral Traffic",
        description:
          "Customer conversion is at an all-time high. Cast iron skillet collection is trending in Home & Kitchen category.",
        severity: "positive",
        relatedMetric: "Orders",
      },
    ],
    actions: [
      {
        id: "action-working-capital",
        priority: 1,
        title: "Scale Inventory Orders with 30-Day Buffer",
        description:
          "Double production order on top 5 cast iron SKUs. Reorder at 25-unit trigger to avoid stockouts during demand spikes.",
        category: "inventory",
        impact: "Unlocks potential ₹3,50,000+ monthly run rate",
        defaultChecked: false,
      },
      {
        id: "action-packaging",
        priority: 2,
        title: "Streamline Packaging & Dispatch Process",
        description:
          "Pre-box high-volume items before order influx to reduce dispatch time from 36 hours to under 12 hours.",
        category: "operations",
        impact: "Brings cancellations back down under 4%",
        defaultChecked: false,
      },
      {
        id: "action-premium-upsell",
        priority: 3,
        title: "Introduce Premium Cookware Bundles",
        description:
          "Launch 3-piece cast iron combo kits at ₹1,299 to lift ASP while maintaining high customer conversion.",
        category: "pricing",
        impact: "Expands blended ASP back above ₹600",
        defaultChecked: false,
      },
    ],
    suggestedPrompts: [
      "How do I sustain my 33% sales growth?",
      "What should I do about the 25 out-of-stock items?",
      "Why is my cancellation rate creeping up to 9%?",
      "How can I increase my average order value?",
    ],
    diagnosisFramework: {
      revenueAnalysis:
        "Sales grew 33.3% from ₹1.8 lakh to ₹2.4 lakh with a 60% jump in order volume (300 to 480 orders).",
      pricingFactor:
        "ASP softened from ₹600 to ₹500 as entry-level products drove bulk volume.",
      inventoryFactor:
        "Out of stock escalated to 25 products (+108%). Inventory depletion is the biggest risk to sustaining momentum.",
      cancellationFactor:
        "Cancellations rose to 9% as warehouse packing struggled to keep up with the 60% surge in order volume.",
    },
  },
];

export const defaultBusiness: SellerProfile = businesses[0]!;

export function getBusinessById(id: string): SellerProfile {
  return businesses.find((b) => b.id === id) ?? defaultBusiness;
}

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
