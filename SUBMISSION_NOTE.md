# Snapdeal Mini AI Voice KAM — Technical Note & Architecture Overview

**Author:** Snapdeal AI First Intern Candidate  
**Project:** Mini AI Voice Key Account Manager (Virtual KAM)  
**Submission Format:** 1-Page Technical Overview  

---

### 1. Executive Summary & Objective
The Mini AI Voice KAM is a browser-native, two-way conversational voice assistant built to emulate a senior Snapdeal Key Account Manager. When a seller calls reporting a sudden drop in sales (*"My sales have dropped significantly this month. I don’t understand why. Can you help me?"*), the assistant actively listens, asks targeted diagnostic questions, cross-references underlying performance data, and delivers prioritized business recommendations.

---

### 2. Voice Pipeline & AI Stack

| Layer | Technology | Rationale & Selection Criteria |
| :--- | :--- | :--- |
| **Voice Infrastructure** | **Vapi Web SDK (`@vapi-ai/web`)** | Handles real-time WebRTC audio streaming, bidirectional turn-taking, barge-in/interruption detection, and volume telemetry directly in the browser with sub-second latency. |
| **Speech-to-Text (STT)** | **Deepgram Nova-2** (`en`) | Industry-leading latency (<250ms) and accuracy for conversational English speech and Indian business accents. Emits interim and final transcripts for live UI feedback. |
| **Intelligence Engine (LLM)** | **OpenAI GPT-4o** (`temp: 0.7`) | High reasoning capability required to cross-reference multi-dimensional business metrics without hallucinations, maintaining structured multi-turn conversation memory. |
| **Text-to-Speech (TTS)** | **ElevenLabs** (`voice: Burt`) | Ultra-realistic, expressive voice synthesis with conversational pacing, avoiding robotic cadence and supporting natural inflection. |
| **Frontend Framework** | **React 18 + TypeScript + Vite + Tailwind CSS** | Clean component-driven architecture with zero latency overhead, responsive 3-column layout, and Snapdeal branding. |

---

### 3. Business Logic & Diagnostic Framework

The AI KAM grounds its reasoning in the provided mock dataset:
- **Revenue & Orders:** ₹2,00,000 → ₹1,35,000 (-32.5%) and 400 → 270 orders (-32.5%). The decline is 100% volume-driven.
- **Average Selling Price (ASP):** Remained constant at ₹500. The AI immediately rules out price increases or discounting issues as the root cause.
- **Inventory Out-of-Stock (OOS):** Surged from 5 to 18 products (+260%). The AI identifies this as the **primary root cause**: customers cannot convert on unavailable catalog items, depressing organic rank.
- **Cancellation Rate:** Increased from 8% to 14% (+75% relative surge). The AI diagnoses this as an **operational bottleneck**: dispatch delays and inventory sync failures erode net sales and degrade seller rating.

---

### 4. Conversational Lifecycle & System Prompting

The system prompt enforces strict voice-first guardrails:
1. **Intake & Active Listening:** Greets warmly as a Snapdeal KAM; avoids immediate data dumping; lets the seller articulate their concerns.
2. **Contextual Investigation:** Inquires about recent supplier delays, fulfillment bottlenecks, or category trends **one question at a time**.
3. **Data-Driven Diagnosis:** Explains findings using human-friendly spoken phrasing (e.g., *"two lakh"* instead of *"200000"*, *"thirty-two percent drop"*).
4. **Actionable Recommendations:** Delivers 3 concrete steps:
   - *Inventory Recovery:* Prioritize restocking top-velocity SKUs and configure automated safety stock thresholds.
   - *Fulfillment Audit:* Align dispatch SLAs to bring cancellation rates below platform benchmarks (<8%).
   - *Visibility Re-activation:* Run targeted Snapdeal promotions/sponsored ads to recover lost organic placement once catalog stock is replenished.
5. **Call Summary:** Crisp recap of confirmed bottlenecks, agreed next steps, and follow-up timeline.

---

### 5. Client Architecture & Resilience
- **Transient Inline Assistant:** Defined dynamically via client-side configuration, removing brittle dependencies on remote dashboard IDs and allowing reproducible git-versioned prompt iterations.
- **Microphone Permissions & Error Handling:** Explicit handling for `NotAllowedError` (mic denied), `NotFoundError`, and WebRTC reconnects.
- **State Synchronization:** Dedicated `useVapi` hook isolating voice lifecycle states (`idle`, `connecting`, `connected`, `disconnecting`), real-time transcript streaming, volume levels, and call timers.
