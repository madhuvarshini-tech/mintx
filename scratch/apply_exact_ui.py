import os

# 1. Update styles.css
styles_path = "styles.css"
with open(styles_path, "r", encoding="utf-8") as f:
    css_content = f.read()

css_start_marker = "/* 2. Chat Window UI & Dedicated Robot Companion Stage */\n.chatbot-window {"
if css_start_marker not in css_content:
    css_start_marker = "/* 2. Chat Window UI & Dedicated Robot Companion Stage */\r\n.chatbot-window {"

css_end_marker = "/* =========================================================\n   PREMIUM MOUSE EFFECTS & CUSTOM CURSOR ENGINE\n   ========================================================= */"
if css_end_marker not in css_content:
    css_end_marker = "/* =========================================================\r\n   PREMIUM MOUSE EFFECTS & CUSTOM CURSOR ENGINE\r\n   ========================================================= */"

if css_start_marker not in css_content or css_end_marker not in css_content:
    print("Error: CSS markers not found!")
    exit(1)

css_start_idx = css_content.index(css_start_marker)
css_end_idx = css_content.index(css_end_marker)

new_chatbot_css = """/* 2. Chat Window UI & Exact Reference Layout */
.chatbot-window {
  position: absolute;
  bottom: 74px;
  right: 0;
  width: 442px;
  height: 690px;
  max-width: calc(100vw - 28px);
  max-height: calc(100vh - 88px);
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 
    0 24px 64px -12px rgba(11, 20, 45, 0.45),
    0 0 0 1px rgba(0, 0, 0, 0.08);
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
  font-family: var(--font-body, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
}

.chatbot-window.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

/* Header */
.chatbot-header {
  background: #0B132B;
  padding: 16px 20px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.chatbot-header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chatbot-avatar {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #070D1E;
  border: 1.5px solid rgba(0, 210, 180, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 14px -2px rgba(0, 210, 180, 0.4);
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
  background: radial-gradient(ellipse at center, rgba(147, 197, 253, 0.95) 0%, rgba(0, 210, 180, 0.75) 50%, transparent 80%);
  box-shadow: 0 0 8px 2px rgba(0, 210, 180, 0.9);
  mix-blend-mode: screen;
  pointer-events: none;
  animation: robotEyePulse 3.2s ease-in-out infinite;
}

.chatbot-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chatbot-title-row h3 {
  font-size: 1.02rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.chatbot-pill-pro {
  background: rgba(0, 210, 180, 0.08);
  border: 1px solid #00D2B4;
  color: #00D2B4;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 9999px;
  letter-spacing: 0.04em;
  line-height: 1.2;
}

.chatbot-header-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.76rem;
  color: #8FA0B5;
  margin-top: 3px;
  font-weight: 500;
}

.chatbot-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #00D2B4;
  box-shadow: 0 0 6px #00D2B4;
}

.chatbot-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chatbot-action-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #CBD5E1;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.chatbot-action-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(0, 210, 180, 0.4);
  color: #ffffff;
  transform: scale(1.05);
}

/* Quick Action Nav Bar */
.chatbot-quick-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 18px;
  background: #ffffff;
  border-bottom: 1px solid #F1F5F9;
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
  border-radius: 9999px;
  padding: 7px 14px;
  font-size: 0.80rem;
  font-weight: 600;
  color: #1E293B;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  justify-content: center;
}

.chatbot-quick-tab:hover {
  background: #E2E8F0;
  border-color: #CBD5E1;
  color: #0F172A;
  transform: translateY(-1px);
}

.quick-tab-icon {
  font-size: 0.9rem;
}

/* =========================================================
   SCROLLABLE BODY & TWO-COLUMN WELCOME PANEL
   ========================================================= */
.chatbot-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: #CBD5E1 transparent;
}

.chatbot-body::-webkit-scrollbar {
  width: 6px;
}

.chatbot-body::-webkit-scrollbar-track {
  background: transparent;
}

.chatbot-body::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 99px;
}

.chatbot-body::-webkit-scrollbar-thumb:hover {
  background: #94A3B8;
}

/* Premium Robot Welcome Panel (Exact Two-Column Dark Navy Card) */
.chatbot-welcome-panel {
  background: linear-gradient(145deg, #0B142D 0%, #070E22 100%);
  border: 1px solid rgba(0, 210, 180, 0.28);
  border-radius: 18px;
  margin: 14px 16px 16px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 28px -6px rgba(7, 13, 30, 0.45);
  flex-shrink: 0;
}

.chatbot-welcome-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 18% 40%, rgba(0, 210, 180, 0.12) 0%, transparent 55%),
    radial-gradient(circle at 85% 80%, rgba(56, 189, 248, 0.08) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

/* Robot Card (Left column inside welcome panel) */
.chatbot-robot-card {
  width: 138px;
  min-width: 138px;
  background: #060B19;
  border: 1px solid rgba(0, 210, 180, 0.42);
  border-radius: 13px;
  padding: 7px 8px 7px;
  box-shadow: 
    0 8px 20px -4px rgba(0, 0, 0, 0.5),
    0 0 14px -2px rgba(0, 210, 180, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.robot-card-topbar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 0 1px;
}

.robot-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.robot-status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #00D2B4;
  box-shadow: 0 0 6px #00D2B4;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.robot-status-text {
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #00D2B4;
  text-transform: uppercase;
  font-family: var(--font-mono, monospace);
  line-height: 1;
}

.robot-badge-model {
  font-size: 0.48rem;
  font-weight: 600;
  color: #64748B;
  font-family: var(--font-mono, monospace);
  letter-spacing: 0.02em;
  line-height: 1;
}

/* Figure Wrap */
.robot-figure-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1900 / 2026;
  border-radius: 9px;
  overflow: hidden;
  background: radial-gradient(circle at 50% 42%, #141C38 0%, #060B19 100%);
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

.robot-ground-shadow {
  width: 74%;
  height: 4px;
  margin: 3px auto 1px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0, 210, 180, 0.45) 0%, rgba(10, 16, 32, 0.85) 50%, transparent 75%);
  transition: transform 0.35s ease, opacity 0.35s ease;
  will-change: transform, opacity;
}

.robot-eye-glow {
  position: absolute;
  width: 8px;
  height: 5px;
  border-radius: 50%;
  background: #00D2B4;
  box-shadow: 
    0 0 6px 2px #00D2B4,
    0 0 12px 3px #38BDF8;
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
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(0.95);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.15);
  }
}

.robot-core-aura {
  position: absolute;
  top: 48%;
  left: 50%;
  width: 36px;
  height: 36px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 210, 180, 0.35) 0%, transparent 70%);
  pointer-events: none;
  opacity: 0.35;
  transition: opacity 0.35s ease;
  mix-blend-mode: screen;
  z-index: 3;
}

.robot-card-footer {
  margin-top: 3px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.robot-caption-title {
  font-size: 0.58rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.15;
  letter-spacing: -0.01em;
}

.robot-caption-sub {
  font-size: 0.50rem;
  color: #00D2B4;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: 0.01em;
}

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
  background: #00D2B4;
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
  color: #00D2B4;
  font-weight: 600;
  margin-left: 3px;
  font-family: var(--font-mono, monospace);
}

/* Vertical Divider inside Welcome Panel */
.chatbot-welcome-divider {
  width: 1px;
  min-width: 1px;
  height: 130px;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 210, 180, 0.45) 20%, rgba(0, 210, 180, 0.45) 80%, transparent 100%);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

/* Welcome Text (Right column inside welcome panel) */
.chatbot-welcome-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #ffffff;
  position: relative;
  z-index: 1;
}

.welcome-heading {
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 2px 0;
  line-height: 1.25;
}

.welcome-subheading {
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 10px 0;
  line-height: 1.3;
}

.welcome-highlight {
  color: #00D2B4;
}

.welcome-role {
  font-size: 0.84rem;
  font-weight: 500;
  color: #F1F5F9;
  margin: 0 0 8px 0;
  line-height: 1.35;
}

.welcome-desc {
  font-size: 0.76rem;
  color: #94A3B8;
  line-height: 1.48;
  margin: 0;
}

/* =========================================================
   ROBOT ANIMATION STATES
   ========================================================= */
.chatbot-robot-card:not(.is-thinking):not(.is-responding):not(.is-acknowledging):not(.is-listening) .robot-figure-img {
  animation: robotFigureIdleFloat 4.8s ease-in-out infinite;
}

@keyframes robotFigureIdleFloat {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-4px) scale(1.008); }
}

.chatbot-robot-card:not(.is-thinking):not(.is-responding):not(.is-acknowledging):not(.is-listening) .robot-ground-shadow {
  animation: robotGroundShadowPulse 4.8s ease-in-out infinite;
}

@keyframes robotGroundShadowPulse {
  0%, 100% { transform: scale(1); opacity: 0.85; }
  50% { transform: scale(0.85); opacity: 0.45; }
}

/* Acknowledgement Nod */
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
  50% { transform: translate(-50%, -50%) scale(1.35); opacity: 1; filter: drop-shadow(0 0 10px #00D2B4); }
}

/* Listening */
.chatbot-robot-card.is-listening {
  border-color: rgba(0, 210, 180, 0.7);
  box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.6), 0 0 18px rgba(0, 210, 180, 0.4);
}

.chatbot-robot-card.is-listening .robot-figure-img {
  transform: rotate(2deg) translateY(-1px);
}

/* Thinking */
.chatbot-robot-card.is-thinking {
  border-color: rgba(0, 210, 180, 0.85);
  box-shadow: 0 12px 28px -4px rgba(0, 0, 0, 0.65), 0 0 22px rgba(0, 210, 180, 0.5);
}

.chatbot-robot-card.is-thinking .robot-figure-img {
  animation: robotThinkingTilt 2.2s ease-in-out infinite !important;
}

@keyframes robotThinkingTilt {
  0%, 100% { transform: translateY(-2px) rotate(-1.6deg); }
  50% { transform: translateY(0.5px) rotate(0.8deg); }
}

.chatbot-robot-card.is-thinking .robot-core-aura {
  opacity: 1;
  animation: robotCoreEnergyPulse 1.6s ease-in-out infinite;
}

@keyframes robotCoreEnergyPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.45; }
  50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.9; }
}

/* Responding */
.chatbot-robot-card.is-responding {
  border-color: #00D2B4;
  box-shadow: 0 12px 28px -4px rgba(0, 0, 0, 0.7), 0 0 24px rgba(0, 210, 180, 0.55);
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

.chatbot-robot-card.is-responding .robot-speech-wave {
  display: flex;
}

.chatbot-robot-card.is-responding .robot-caption-sub {
  display: none;
}

/* =========================================================
   CONVERSATION MESSAGES LIST & BUBBLES
   ========================================================= */
.chatbot-messages-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 0 16px 16px;
}

/* Message Rows */
.chatbot-msg-row {
  display: flex;
  width: 100%;
  animation: chatbotMsgFadeIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes chatbotMsgFadeIn {
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}

.chatbot-msg-row.user {
  justify-content: flex-end;
}

.chatbot-msg-row.assistant {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  justify-content: flex-start;
}

/* Circular Assistant Robot Avatar beside message */
.chatbot-msg-avatar {
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  overflow: hidden;
  background: #0B132B;
  border: 1.5px solid #00D2B4;
  box-shadow: 0 0 8px rgba(0, 210, 180, 0.35);
  position: relative;
  flex-shrink: 0;
  margin-top: 2px;
}

.chatbot-msg-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  display: block;
}

.chatbot-msg-bubble-wrap {
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 44px);
}

.chatbot-msg-bubble-wrap.right {
  align-items: flex-end;
  max-width: 84%;
}

/* Message Bubbles */
.chatbot-msg-bubble {
  padding: 12px 18px;
  border-radius: 18px;
  font-size: 0.86rem;
  line-height: 1.6;
  word-break: break-word;
}

/* Customer message (Right - Solid Teal) */
.chatbot-msg-row.user .chatbot-msg-bubble {
  background: #008F87;
  color: #ffffff;
  border-bottom-right-radius: 4px;
  box-shadow: 0 3px 12px rgba(0, 143, 135, 0.25);
  font-size: 0.88rem;
  font-weight: 500;
}

/* Assistant message (Left - Pure White Card) */
.chatbot-msg-row.assistant .chatbot-msg-bubble {
  background: #ffffff;
  color: #1E293B;
  border: 1px solid #E2E8F0;
  border-top-left-radius: 4px;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
}

.chatbot-msg-bubble strong {
  font-weight: 700;
  color: #0F172A;
}

.chatbot-msg-bubble a {
  color: #008F87;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2.5px;
}

/* Checkmark List Items (Exact match to reference green circles) */
.chatbot-list-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 5px 0;
  font-size: 0.86rem;
  color: #1E293B;
  line-height: 1.4;
}

.chatbot-check-icon {
  width: 17px;
  height: 17px;
  min-width: 17px;
  border-radius: 50%;
  background: #008F87;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 800;
  line-height: 1;
  flex-shrink: 0;
}

.chatbot-p-gap {
  height: 10px;
}

/* Timestamps & Delivery Receipts */
.chatbot-msg-meta {
  display: flex;
  align-items: center;
  font-size: 0.68rem;
  color: #94A3B8;
  margin-top: 4px;
  font-weight: 500;
}

.chatbot-msg-meta.right {
  justify-content: flex-end;
  gap: 4px;
}

.chatbot-msg-meta.left {
  justify-content: flex-start;
}

.meta-check {
  color: #008F87;
  stroke: #008F87;
  display: inline-block;
  vertical-align: middle;
}

/* Thinking Indicator Bubble */
.chatbot-typing-bubble {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  border-radius: 18px;
  border-top-left-radius: 4px;
  width: fit-content;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.chatbot-typing-dots {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.chatbot-typing-dot {
  width: 6.5px;
  height: 6.5px;
  border-radius: 50%;
  background: #00D2B4;
  animation: chatbotTypingBounce 1.3s infinite ease-in-out;
}

.chatbot-typing-dot:nth-child(2) { animation-delay: 0.2s; }
.chatbot-typing-dot:nth-child(3) { animation-delay: 0.4s; }

.chatbot-typing-label {
  font-size: 0.82rem;
  font-weight: 500;
  color: #64748B;
  letter-spacing: -0.01em;
}

@keyframes chatbotTypingBounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
  40% { transform: translateY(-4px); opacity: 1; }
}

/* Action Cards */
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
  background: #008F87;
  color: #ffffff !important;
}

.chatbot-card-btn.primary:hover {
  background: #007770;
  transform: translateY(-1px);
}

.chatbot-card-btn.secondary {
  background: #ffffff;
  color: #0F172A !important;
  border: 1px solid #CBD5E1;
}

.chatbot-card-btn.secondary:hover {
  background: #F1F5F9;
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
  padding: 6px 12px;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chatbot-chip:hover {
  background: rgba(0, 210, 180, 0.08);
  border-color: #00D2B4;
  color: #008F87;
  transform: translateY(-1px);
}

/* =========================================================
   BOTTOM FIXED INPUT BAR (Exact Match to Reference)
   ========================================================= */
.chatbot-footer {
  padding: 12px 18px;
  background: #ffffff;
  border-top: 1px solid #F1F5F9;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.chatbot-input {
  flex: 1;
  height: 46px;
  border: 1.5px solid #00D2B4;
  background: #ffffff;
  border-radius: 9999px;
  padding: 0 20px;
  font-size: 0.88rem;
  color: #1E293B;
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;
}

.chatbot-input::placeholder {
  color: #94A3B8;
}

.chatbot-input:focus {
  border-color: #00B89D;
  box-shadow: 0 0 0 3px rgba(0, 210, 180, 0.18);
}

.chatbot-send-btn {
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 50%;
  background: #00A896;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 168, 150, 0.35);
}

.chatbot-send-btn:hover:not(:disabled) {
  background: #008F80;
  transform: scale(1.05);
}

.chatbot-send-btn:disabled {
  background: #CBD5E1;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Mobile & Tablet Responsiveness */
@media (max-width: 480px) {
  .mintx-chatbot-root {
    bottom: 0;
    right: 0;
  }
  .chatbot-window {
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }
  .chatbot-welcome-panel {
    flex-direction: column;
    text-align: center;
    padding: 14px 12px;
    margin: 10px 10px 14px;
  }
  .chatbot-welcome-divider {
    width: 80%;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(0, 210, 180, 0.45) 20%, rgba(0, 210, 180, 0.45) 80%, transparent 100%);
    margin: 12px 0;
  }
  .chatbot-welcome-content {
    align-items: center;
  }
}

/* Accessibility & Animation Performance */
.chatbot-window:not(.open) .robot-figure-img,
.chatbot-window:not(.open) .robot-eye-glow,
.chatbot-window:not(.open) .robot-core-aura,
.chatbot-robot-card.is-paused .robot-figure-img,
.chatbot-robot-card.is-paused .robot-eye-glow,
.chatbot-robot-card.is-paused .robot-core-aura {
  animation-play-state: paused !important;
}

@media (prefers-reduced-motion: reduce) {
  .chatbot-robot-card,
  .robot-figure-img,
  .robot-ground-shadow,
  .robot-eye-glow,
  .robot-core-aura {
    animation: none !important;
    transform: none !important;
  }
}

"""

new_css = css_content[:css_start_idx] + new_chatbot_css + css_content[css_end_idx:]
with open(styles_path, "w", encoding="utf-8") as f:
    f.write(new_css)

print("styles.css updated successfully!")
