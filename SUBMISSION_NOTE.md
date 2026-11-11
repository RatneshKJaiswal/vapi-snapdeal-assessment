# Snapdeal Mini AI Voice KAM — Technical Architecture & Submission Note

**Role:** Snapdeal AI First Intern Practical Assignment  
**Project:** Mini AI Voice Key Account Manager (Virtual KAM) with Multi-Business Support  
**Format:** 1-Page Technical Overview & Architecture Document  

---

### 1. Executive Summary & Objective
The Mini AI Voice KAM is a browser-native, two-way conversational voice assistant built to emulate an experienced Snapdeal Key Account Manager. The system supports multiple e-commerce businesses, diagnosing root causes through targeted multi-turn speech interaction, cross-referencing performance metrics (Sales, Orders, ASP, OOS, Cancellations), and delivering prioritized, actionable recommendations.

---

### 2. Voice Pipeline & AI Stack

| Layer | Technology | Engineering Rationale |
| :--- | :--- | :--- |
| **Voice Infrastructure** | **Vapi Web SDK (`@vapi-ai/web`)** | Browser-native WebRTC audio streaming, bidirectional turn-taking, barge-in / speech interruption handling, and dynamic volume telemetry with sub-second latency. |
| **Speech-to-Text (STT)** | **Deepgram Nova-2** (`language: en`) | Industry-leading latency (<250ms) and precision for conversational English speech and Indian business accents. Emits final transcripts for live UI rendering. |
| **Intelligence Engine (LLM)** | **OpenAI GPT-4o** (`temp: 0.7`) | High reasoning capacity required to calculate deltas, isolate root causes without hallucinating, and maintain contextual memory across multi-turn voice dialog. |
| **Text-to-Speech (TTS)** | **ElevenLabs** (`voice: Burt`) | Ultra-realistic, expressive vocal synthesis with conversational pacing, avoiding robotic inflection and supporting natural cadence. |
| **Frontend Framework** | **React 18 + TypeScript + Vite + Tailwind CSS** | Component-driven architecture, reactive state synchronization, and enterprise SaaS aesthetics with Snapdeal brand tokens (`#E40046`). |

---

### 3. Multi-Business Data Architecture & Root Cause Diagnostics

The application abstracts business metrics into an extensible typed configuration (`src/data/sellerData.ts`):

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Seller Profile Configuration                          │
├──────────────────────────┬──────────────────────────┬───────────────────────┤
│ Rajesh Electronics       │ Aarav Footwear           │ Kavita Home           │
│ (Core Assignment)        │ (Fashion & Apparel)      │ (Home & Kitchen)      │
│ Sales: -32.5% (₹2L→₹1.35L)│ Sales: -30% (₹4.5L→₹3.15L)│ Sales: +33% (₹1.8L→₹2.4L)│
│ ASP: Flat ₹500           │ ASP: Down -20% (₹750→₹600│ ASP: Down -16.7%      │
│ OOS: +260% (5 → 18)      │ Cancellations: 6% → 19%  │ OOS: +108% (12 → 25)  │
│ Cancellations: 8% → 14%  │ Courier transit delays   │ Growth constrained by │
│ Stockouts & SLA penalty  │ Discount price erosion   │ warehouse bottlenecks │
└──────────────────────────┴──────────────────────────┴───────────────────────┘
```

- **Diagnostic Principle:** The system strictly separates observed facts from hypotheses. E.g., for Rajesh Electronics, ASP is flat (ruling out pricing), while order decline (-32.5%) perfectly matches sales decline, pinpointing the 260% surge in stockouts and 75% rise in cancellations as primary drivers.

---

### 4. Dynamic Prompt Engineering & Conversational Lifecycle

The assistant configuration (`src/services/vapiConfig.ts`) dynamically compiles system instructions based on the active store:
1. **Intake & Active Listening:** Greets warmly as Snapdeal KAM; addresses the seller by name; avoids raw data dumping.
2. **Contextual Investigation:** Inquires about recent operational delays, supplier lead times, or stockouts **one question at a time**.
3. **Data-Driven Diagnosis:** Explains findings using human-friendly spoken phrasing (e.g., *"one lakh thirty-five thousand"* instead of *"135000"*, *"thirty-two percent"*).
4. **Actionable Recommendations:** Delivers 3 concrete steps:
   - *Inventory Recovery:* Prioritize restocking top-velocity SKUs and configure automated safety stock thresholds.
   - *Fulfillment Audit:* Align dispatch SLAs to bring cancellation rates below platform benchmarks (<8%).
   - *Visibility Re-activation:* Run targeted Snapdeal promotions/sponsored ads to recover lost organic placement once catalog stock is replenished.
5. **Call Summary & Wrap-up:** Crisp recap of confirmed bottlenecks, agreed next steps, and follow-up timeline.

---

### 5. Client Resilience & User Experience
- **Transient Inline Assistant:** Defined dynamically in code via `vapi.start(config)`, ensuring reproducible git-versioned prompt iterations without remote dashboard dependencies.
- **Interactive Action Plan:** Interactive checkboxes allow sellers to mark recommendations as "Agreed" during or after calls.
- **Safety Locks:** Store switcher automatically locks during active voice calls to prevent mid-conversation state desync.
