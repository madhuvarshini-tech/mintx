import os

styles_path = "styles.css"
with open(styles_path, "r", encoding="utf-8") as f:
    content = f.read()

start_marker = "/* 2. Chat Window UI */"
end_marker = "/* =========================================================\n   PREMIUM MOUSE EFFECTS & CUSTOM CURSOR ENGINE"

if start_marker not in content:
    print(f"Error: start_marker '{start_marker}' not found")
    exit(1)

if end_marker not in content:
    # Try with \r\n
    end_marker = "/* =========================================================\r\n   PREMIUM MOUSE EFFECTS & CUSTOM CURSOR ENGINE"
    if end_marker not in content:
        print("Error: end_marker not found")
        exit(1)

start_idx = content.index(start_marker)
end_idx = content.index(end_marker)

new_chatbot_css = """/* 2. Chat Window UI & Dedicated Robot Companion Stage */
.chatbot-window {
  position: absolute;
  bottom: 74px;
  right: 0;
  width: 400px;
  height: 610px;
  max-width: calc(100vw - 28px);
  max-height: calc(100vh - 90px);
  background: #ffffff;
  border-radius: 22px;
  box-shadow: 
    0 24px 60px -12px rgba(11, 19, 36, 0.42),
    0 0 0 1px rgba(101, 230, 197, 0.28),
    0 0 20px -4px rgba(10, 174, 158, 0.15);
  border: 1px solid rgba(226, 232, 240, 0.95);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transform: translateY(16px) scale(0.96);
  transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
              visibility 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
  z-index: 1000;
}

.chatbot-window.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

/* Header */
.chatbot-header {
  background: linear-gradient(135deg, #0e172c 0%, #172442 100%);
  padding: 13px 16px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.chatbot-header-info {
  display: flex;
  align-items: center;
  gap: 11px;
}

.chatbot-avatar {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: #0B1324;
  border: 1.5px solid rgba(101, 230, 197, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 14px -2px rgba(10, 174, 158, 0.45);
  flex-shrink: 0;
}

.chatbot-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 18%;
  display: block;
}

.chatbot-avatar-eye-glow {
  position: absolute;
  top: 22%;
  left: 50%;
  width: 18px;
  height: 6px;
  transform: translate(-50%, -50%);
  background: radial-gradient(ellipse at center, rgba(147, 197, 253, 0.95) 0%, rgba(56, 189, 248, 0.75) 50%, transparent 80%);
  box-shadow: 0 0 8px 2px rgba(56, 189, 248, 0.9);
  mix-blend-mode: screen;
  pointer-events: none;
  animation: robotEyePulse 3.2s ease-in-out infinite;
}

.chatbot-header-text h3 {
  font-size: 0.94rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
}

.chatbot-pill-pro {
  background: linear-gradient(135deg, rgba(10, 174, 158, 0.25) 0%, rgba(56, 189, 248, 0.25) 100%);
  border: 1px solid rgba(101, 230, 197, 0.45);
  color: #65E6C5;
  font-size: 0.64rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 1px 6px;
  border-radius: 99px;
  letter-spacing: 0.04em;
}

.chatbot-header-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  color: #94A3B8;
  margin-top: 2px;
}

.chatbot-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 8px #10B981;
}

.chatbot-header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.chatbot-action-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #CBD5E1;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.chatbot-action-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(101, 230, 197, 0.35);
  color: #ffffff;
}

/* Quick Action Nav Bar */
.chatbot-quick-bar {
  display: flex;
  gap: 6px;
  padding: 7px 12px;
  background: #ffffff;
  border-bottom: 1px solid #E2E8F0;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
  flex-shrink: 0;
}

.chatbot-quick-bar::-webkit-scrollbar {
  display: none;
}

.chatbot-quick-tab {
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  border-radius: 99px;
  padding: 4px 10px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.chatbot-quick-tab:hover {
  background: rgba(10, 174, 158, 0.12);
  border-color: #0AAE9E;
  color: #088F82;
  transform: translateY(-1px);
}

/* =========================================================
   DEDICATED INTERACTIVE ROBOT COMPANION STAGE
   (Pinned above conversation, always visible, zero overlap)
   ========================================================= */
.chatbot-robot-stage {
  flex-shrink: 0;
  background: radial-gradient(ellipse at 50% 60%, rgba(18, 30, 58, 0.98) 0%, rgba(11, 18, 36, 1) 100%);
  border-bottom: 1px solid rgba(101, 230, 197, 0.2);
  padding: 8px 12px 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: visible;
  perspective: 900px;
}

.chatbot-robot-stage::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 170px;
  height: 120px;
  transform: translate(-50%, -50%);
  background: radial-gradient(ellipse at center, rgba(10, 174, 158, 0.15) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 75%);
  pointer-events: none;
  z-index: 0;
}

/* Robot Card */
.chatbot-robot-card {
  width: 140px;
  max-width: 100%;
  background: linear-gradient(165deg, rgba(16, 26, 48, 0.95) 0%, rgba(10, 16, 32, 0.98) 100%);
  border: 1px solid rgba(101, 230, 197, 0.32);
  border-radius: 14px;
  padding: 6px 7px 5px;
  box-shadow: 
    0 10px 24px -6px rgba(10, 16, 32, 0.65),
    0 0 16px -2px rgba(10, 174, 158, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: box-shadow 0.35s ease, border-color 0.35s ease, transform 0.25s ease;
  transform-style: preserve-3d;
  position: relative;
  z-index: 1;
}

.chatbot-robot-card:hover {
  border-color: rgba(101, 230, 197, 0.6);
  box-shadow: 
    0 14px 28px -6px rgba(10, 16, 32, 0.75),
    0 0 22px 0px rgba(10, 174, 158, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
}

/* Card Topbar */
.robot-card-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
  padding: 0 1px;
}

.robot-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(10, 174, 158, 0.15);
  border: 1px solid rgba(101, 230, 197, 0.32);
  border-radius: 99px;
  padding: 2px 5px;
}

.robot-status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 6px #10B981;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  animation: pulseDot 2s infinite ease-in-out;
}

.robot-status-text {
  font-size: 0.50rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--mint-accent, #65E6C5);
  text-transform: uppercase;
  font-family: var(--font-mono, monospace);
  line-height: 1;
}

.robot-badge-model {
  font-size: 0.50rem;
  font-weight: 700;
  color: var(--slate-400, #94A3B8);
  font-family: var(--font-mono, monospace);
  letter-spacing: 0.03em;
  line-height: 1;
}

/* Figure Area (Responsive & preserves full robot proportions without cropping) */
.robot-figure-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1900 / 2026;
  border-radius: 9px;
  overflow: hidden;
  background: radial-gradient(circle at 55% 42%, #141c38 0%, #0a0f20 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transform-style: preserve-3d;
  will-change: transform;
}

.robot-figure-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
  display: block;
  will-change: transform;
  transform-origin: center bottom;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.3, 1);
}

/* Ground Shadow underneath figure */
.robot-ground-shadow {
  width: 76%;
  height: 5px;
  margin: 3px auto 1px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(10, 16, 32, 0.85) 0%, rgba(10, 174, 158, 0.3) 40%, transparent 75%);
  transition: transform 0.35s ease, opacity 0.35s ease;
  will-change: transform, opacity;
}

/* Precision Glowing Cyan Eyes anchored to the robot's visor */
.robot-eye-glow {
  position: absolute;
  width: 9px;
  height: 5px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(147, 197, 253, 0.98) 0%, rgba(56, 189, 248, 0.8) 50%, transparent 80%);
  box-shadow: 
    0 0 7px 2px rgba(56, 189, 248, 0.85),
    0 0 14px 4px rgba(96, 165, 250, 0.45);
  pointer-events: none;
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
  z-index: 5;
  animation: robotEyePulse 3s ease-in-out infinite;
}

.robot-eye-glow.left-eye {
  left: 42.4%;
  top: 22.8%;
  animation-delay: 0s;
}

.robot-eye-glow.right-eye {
  left: 57.2%;
  top: 22.0%;
  animation-delay: 0.15s;
}

@keyframes robotEyePulse {
  0%, 100% {
    opacity: 0.65;
    transform: translate(-50%, -50%) scale(0.94);
    filter: drop-shadow(0 0 3px #38bdf8);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.15);
    filter: drop-shadow(0 0 7px #60a5fa) drop-shadow(0 0 12px #38bdf8);
  }
}

/* Thinking Core Aura Glow behind chest */
.robot-core-aura {
  position: absolute;
  top: 48%;
  left: 50%;
  width: 38px;
  height: 38px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(10, 174, 158, 0.4) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 75%);
  pointer-events: none;
  opacity: 0.35;
  transition: opacity 0.35s ease;
  mix-blend-mode: screen;
  z-index: 3;
}

/* Card Footer */
.robot-card-footer {
  margin-top: 3px;
  padding: 1px 1px 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
  text-align: center;
}

.robot-caption-title {
  font-size: 0.58rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.01em;
  line-height: 1.15;
}

.robot-caption-sub {
  font-size: 0.48rem;
  color: var(--mint-accent, #65E6C5);
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1.15;
}

/* Speech Wave Equalizer Visualizer */
.robot-speech-wave {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 3px;
  height: 11px;
  margin: 1px 0;
}

.speech-bar {
  width: 2.5px;
  height: 4px;
  background: var(--mint-accent, #65E6C5);
  border-radius: 99px;
  animation: speechBarDance 0.75s ease-in-out infinite alternate;
}

.speech-bar:nth-child(1) { animation-delay: 0.1s; height: 5px; }
.speech-bar:nth-child(2) { animation-delay: 0.3s; height: 10px; }
.speech-bar:nth-child(3) { animation-delay: 0.15s; height: 8px; }
.speech-bar:nth-child(4) { animation-delay: 0.4s; height: 4px; }

@keyframes speechBarDance {
  0% { transform: scaleY(0.4); opacity: 0.5; }
  100% { transform: scaleY(1.3); opacity: 1; }
}

.speech-label {
  font-size: 0.48rem;
  color: var(--mint-accent, #65E6C5);
  font-weight: 600;
  margin-left: 3px;
  letter-spacing: 0.02em;
  font-family: var(--font-mono, monospace);
}

/* =========================================================
   ROBOT ANIMATION STATES: IDLE, ACKNOWLEDGE, THINKING, RESPONDING
   ========================================================= */

/* 1. Idle Floating Animation (Active when no question is asked) */
.chatbot-robot-card:not(.is-thinking):not(.is-responding):not(.is-acknowledging):not(.is-listening) .robot-figure-img {
  animation: robotFigureIdleFloat 4.8s ease-in-out infinite;
}

@keyframes robotFigureIdleFloat {
  0%, 100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-4px) scale(1.008);
  }
}

.chatbot-robot-card:not(.is-thinking):not(.is-responding):not(.is-acknowledging):not(.is-listening) .robot-ground-shadow {
  animation: robotGroundShadowPulse 4.8s ease-in-out infinite;
}

@keyframes robotGroundShadowPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.85;
  }
  50% {
    transform: scale(0.85);
    opacity: 0.45;
  }
}

/* 2. Customer Message Acknowledgement (Subtle Greeting / Nod) */
.chatbot-robot-card.is-acknowledging .robot-figure-img {
  animation: robotAcknowledgeNod 0.4s cubic-bezier(0.2, 0.8, 0.3, 1) !important;
}

@keyframes robotAcknowledgeNod {
  0% { transform: translateY(0) rotate(0deg); }
  35% { transform: translateY(3.5px) rotate(1.8deg); }
  70% { transform: translateY(-1px) rotate(-0.8deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

.chatbot-robot-card.is-acknowledging .robot-eye-glow {
  animation: robotEyeAcknowledgeFlare 0.4s ease-out !important;
}

@keyframes robotEyeAcknowledgeFlare {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
  50% { transform: translate(-50%, -50%) scale(1.35); opacity: 1; filter: drop-shadow(0 0 10px #65E6C5) drop-shadow(0 0 16px #38bdf8); }
}

/* 3. Listening State (Customer typing into input field) */
.chatbot-robot-card.is-listening {
  border-color: rgba(101, 230, 197, 0.6);
  box-shadow: 
    0 12px 26px -6px rgba(10, 16, 32, 0.65),
    0 0 18px -2px rgba(10, 174, 158, 0.35);
}

.chatbot-robot-card.is-listening .robot-figure-img {
  transform: rotate(2.2deg) translateY(-1px);
}

.chatbot-robot-card.is-listening .robot-eye-glow {
  transform: translate(-50%, -50%) scale(1.22);
  filter: drop-shadow(0 0 8px #65E6C5) drop-shadow(0 0 12px #38bdf8);
  opacity: 1;
}

/* 4. Thinking State (While assistant generates response) */
.chatbot-robot-card.is-thinking {
  border-color: rgba(101, 230, 197, 0.75);
  box-shadow: 
    0 14px 30px -8px rgba(10, 16, 32, 0.65),
    0 0 24px -2px rgba(10, 174, 158, 0.45),
    0 0 36px -4px rgba(56, 189, 248, 0.32);
}

.chatbot-robot-card.is-thinking .robot-figure-img {
  animation: robotThinkingTilt 2.2s ease-in-out infinite !important;
}

@keyframes robotThinkingTilt {
  0%, 100% { transform: translateY(-2px) rotate(-1.6deg); }
  50% { transform: translateY(0.5px) rotate(0.8deg); }
}

.chatbot-robot-card.is-thinking .robot-eye-glow {
  animation: robotEyeThinkingPulse 1.1s ease-in-out infinite !important;
}

@keyframes robotEyeThinkingPulse {
  0%, 100% {
    opacity: 0.75;
    transform: translate(-50%, -50%) scale(1.05);
    filter: drop-shadow(0 0 5px #38bdf8);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.35);
    filter: drop-shadow(0 0 10px #60a5fa) drop-shadow(0 0 16px #38bdf8);
  }
}

.chatbot-robot-card.is-thinking .robot-core-aura {
  opacity: 1;
  animation: robotCoreEnergyPulse 1.6s ease-in-out infinite;
}

@keyframes robotCoreEnergyPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(0.95);
    opacity: 0.45;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 0.9;
  }
}

/* 5. Responding / Speaking State (Robot visibly answering) */
.chatbot-robot-card.is-responding {
  border-color: rgba(101, 230, 197, 0.85);
  box-shadow: 
    0 14px 32px -6px rgba(10, 16, 32, 0.7),
    0 0 26px 0px rgba(10, 174, 158, 0.52),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.chatbot-robot-card.is-responding .robot-figure-img {
  animation: robotSpeakingMovement 2s ease-in-out infinite !important;
}

@keyframes robotSpeakingMovement {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-1.5px) rotate(-1.4deg); }
  50% { transform: translateY(0.8px) rotate(1.6deg); }
  75% { transform: translateY(-0.8px) rotate(-0.8deg); }
}

.chatbot-robot-card.is-responding .robot-eye-glow {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.2);
  filter: drop-shadow(0 0 8px #65E6C5) drop-shadow(0 0 14px #38bdf8);
}

.chatbot-robot-card.is-responding .robot-speech-wave {
  display: flex;
}

.chatbot-robot-card.is-responding .robot-caption-sub {
  display: none;
}

/* =========================================================
   SCROLLABLE CONVERSATION AREA & MESSAGE BUBBLES
   ========================================================= */
.chatbot-body {
  flex: 1;
  min-height: 0;
  padding: 14px 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #F8FAFC;
  scroll-behavior: smooth;
}

/* Messages List */
.chatbot-messages-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

/* Message Rows */
.chatbot-msg-row {
  display: flex;
  width: 100%;
  animation: chatbotMsgFadeIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes chatbotMsgFadeIn {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.chatbot-msg-row.user {
  justify-content: flex-end;
}

.chatbot-msg-row.assistant {
  justify-content: flex-start;
}

/* Message Bubbles */
.chatbot-msg-bubble {
  max-width: 88%;
  padding: 11px 15px;
  border-radius: 16px;
  font-size: 0.86rem;
  line-height: 1.55;
  word-break: break-word;
}

.chatbot-msg-row.user .chatbot-msg-bubble {
  background: linear-gradient(135deg, #0AAE9E 0%, #088F82 100%);
  color: #ffffff;
  border-bottom-right-radius: 4px;
  box-shadow: 0 4px 14px rgba(10, 174, 158, 0.25);
}

.chatbot-msg-row.assistant .chatbot-msg-bubble {
  background: #ffffff;
  color: #1E293B;
  border: 1px solid #E2E8F0;
  border-top-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
}

.chatbot-msg-bubble strong {
  font-weight: 700;
  color: #0F172A;
}

.chatbot-msg-row.user .chatbot-msg-bubble strong {
  color: #ffffff;
}

.chatbot-msg-bubble a {
  color: #088F82;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2.5px;
  transition: color 0.2s ease;
}

.chatbot-msg-bubble a:hover {
  color: #0AAE9E;
}

.chatbot-msg-row.user .chatbot-msg-bubble a {
  color: #ffffff;
}

/* Interactive Action Cards */
.chatbot-action-card {
  margin-top: 10px;
  padding: 10px 12px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 11px;
}

.chatbot-card-title {
  font-size: 0.72rem;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 7px;
}

.chatbot-card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chatbot-card-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 0.74rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;
  text-decoration: none !important;
  transition: all 0.2s ease;
}

.chatbot-card-btn.primary {
  background: #0AAE9E;
  color: #ffffff !important;
}

.chatbot-card-btn.primary:hover {
  background: #088F82;
  transform: translateY(-1px);
}

.chatbot-card-btn.secondary {
  background: #ffffff;
  color: #0F172A !important;
  border: 1px solid #CBD5E1;
}

.chatbot-card-btn.secondary:hover {
  background: #F1F5F9;
  border-color: #94A3B8;
  transform: translateY(-1px);
}

.chatbot-card-btn.whatsapp {
  background: #25D366;
  color: #ffffff !important;
}

.chatbot-card-btn.whatsapp:hover {
  background: #20bd5a;
  transform: translateY(-1px);
}

/* Typing Indicator */
.chatbot-typing-row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: #ffffff;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  border-top-left-radius: 4px;
  width: fit-content;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  animation: chatbotMsgFadeIn 0.24s ease-out both;
}

.chatbot-typing-dots {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.chatbot-typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #0AAE9E;
  animation: chatbotTypingBounce 1.3s infinite ease-in-out;
}

.chatbot-typing-dot:nth-child(2) { animation-delay: 0.2s; }
.chatbot-typing-dot:nth-child(3) { animation-delay: 0.4s; }

.chatbot-typing-label {
  font-size: 0.76rem;
  font-weight: 500;
  color: #64748B;
  letter-spacing: -0.01em;
}

@keyframes chatbotTypingBounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
  40% { transform: translateY(-4px); opacity: 1; }
}

/* Suggested Chips */
.chatbot-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.chatbot-chip {
  background: #ffffff;
  border: 1px solid #CBD5E1;
  color: #0F172A;
  font-size: 0.76rem;
  font-weight: 600;
  padding: 6px 11px;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chatbot-chip:hover {
  background: rgba(10, 174, 158, 0.08);
  border-color: #0AAE9E;
  color: #088F82;
  transform: translateY(-1px);
}

/* Footer / Input Area */
.chatbot-footer {
  padding: 10px 14px;
  background: #ffffff;
  border-top: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.chatbot-input {
  flex: 1;
  border: 1px solid #CBD5E1;
  background: #F8FAFC;
  border-radius: 9999px;
  padding: 9px 15px;
  font-size: 0.86rem;
  color: #0F172A;
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;
}

.chatbot-input:focus {
  border-color: #0AAE9E;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(10, 174, 158, 0.16);
}

.chatbot-send-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #0AAE9E;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.chatbot-send-btn:hover:not(:disabled) {
  background: #088F82;
  transform: scale(1.05);
}

.chatbot-send-btn:disabled {
  background: #CBD5E1;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Responsive & Mobile */
@media (max-width: 480px) {
  .mintx-chatbot-root {
    bottom: 16px;
    right: 16px;
  }
  .chatbot-window {
    right: -4px;
    bottom: 66px;
    width: calc(100vw - 24px);
    height: calc(100vh - 84px);
    max-height: calc(100vh - 84px);
  }
  .chatbot-robot-stage {
    padding: 6px 8px 4px;
  }
  .chatbot-robot-card {
    width: 122px;
    padding: 5px 6px 4px;
  }
  .chatbot-body {
    padding: 10px 12px;
    gap: 10px;
  }
}

/* Performance: Pause animations when chatbot is closed */
.chatbot-window:not(.open) .robot-figure-img,
.chatbot-window:not(.open) .robot-eye-glow,
.chatbot-window:not(.open) .robot-core-aura,
.chatbot-robot-card.is-paused .robot-figure-img,
.chatbot-robot-card.is-paused .robot-eye-glow,
.chatbot-robot-card.is-paused .robot-core-aura {
  animation-play-state: paused !important;
}

/* Accessibility: Respect Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .chatbot-robot-card,
  .robot-figure-img,
  .robot-ground-shadow,
  .robot-eye-glow,
  .robot-core-aura {
    animation: none !important;
    transform: none !important;
  }
  .robot-eye-glow {
    opacity: 0.85 !important;
  }
}

"""

new_content = content[:start_idx] + new_chatbot_css + content[end_idx:]

with open(styles_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"Successfully updated {styles_path} with new chatbot styles!")
