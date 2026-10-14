import re

def update_styles():
    with open("styles.css", "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update trigger button animation
    old_trigger = """.chatbot-trigger-btn {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00D2B4 0%, #008F87 100%);
  border: none;
  box-shadow: 0 10px 28px -4px rgba(10, 174, 158, 0.45), 0 4px 12px rgba(15, 23, 42, 0.15);
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  outline: none;
}"""

    new_trigger = """.chatbot-trigger-btn {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00D2B4 0%, #008F87 100%);
  border: none;
  box-shadow: 0 10px 28px -4px rgba(10, 174, 158, 0.45), 0 4px 12px rgba(15, 23, 42, 0.15);
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  outline: none;
  animation: triggerBtnHovering 3.2s ease-in-out infinite;
}

@keyframes triggerBtnHovering {
  0%, 100% {
    transform: translateY(0);
    box-shadow: 0 10px 28px -4px rgba(10, 174, 158, 0.45), 0 4px 12px rgba(15, 23, 42, 0.15);
  }
  50% {
    transform: translateY(-5px);
    box-shadow: 0 16px 36px -4px rgba(10, 174, 158, 0.65), 0 8px 18px rgba(15, 23, 42, 0.25);
  }
}"""

    if old_trigger in content:
        content = content.replace(old_trigger, new_trigger, 1)
        print("Updated .chatbot-trigger-btn animation in styles.css")
    else:
        print("Warning: old_trigger not found in styles.css")

    # 2. Update header avatar animation
    old_avatar = """.chatbot-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 18%;
  display: block;
}"""

    new_avatar = """.chatbot-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 18%;
  display: block;
  animation: headerAvatarBreathing 2.8s ease-in-out infinite;
}

@keyframes headerAvatarBreathing {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-2px) scale(1.04); }
}"""

    if old_avatar in content:
        content = content.replace(old_avatar, new_avatar, 1)
        print("Updated .chatbot-avatar-img animation in styles.css")
    else:
        print("Warning: old_avatar not found in styles.css")

    # 3. Update robot card container, status dot, figure wrap, eye glow, core aura, ground shadow & states
    old_robot_card_block_start = "/* Robot Card (Left column inside welcome panel) */\n.chatbot-robot-card {"
    old_robot_card_block_end = "/* =========================================================\n   CONVERSATION MESSAGES LIST & BUBBLES"

    start_idx = content.find(old_robot_card_block_start)
    end_idx = content.find(old_robot_card_block_end)

    if start_idx != -1 and end_idx != -1:
        new_robot_card_block = """/* Robot Card (Left column inside welcome panel - Continuous 3D Living Motion) */
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
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  flex-shrink: 0;
  animation: robotCardAuraPulse 2.8s ease-in-out infinite;
  transform-style: preserve-3d;
  will-change: transform;
}

@keyframes robotCardAuraPulse {
  0%, 100% {
    border-color: rgba(0, 210, 180, 0.42);
    box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.5), 0 0 12px -2px rgba(0, 210, 180, 0.25);
  }
  50% {
    border-color: rgba(0, 210, 180, 0.7);
    box-shadow: 0 12px 26px -4px rgba(0, 0, 0, 0.6), 0 0 22px 2px rgba(0, 210, 180, 0.45);
  }
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
  width: 5.5px;
  height: 5.5px;
  border-radius: 50%;
  background: #00D2B4;
  box-shadow: 0 0 6px #00D2B4;
  animation: robotStatusRadarPing 2s infinite cubic-bezier(0, 0, 0.2, 1);
}

@keyframes robotStatusRadarPing {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 210, 180, 0.85), 0 0 6px #00D2B4;
  }
  70% {
    box-shadow: 0 0 0 7px rgba(0, 210, 180, 0), 0 0 10px #00D2B4;
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 210, 180, 0), 0 0 6px #00D2B4;
  }
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
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.3, 1);
}

.robot-ground-shadow {
  width: 74%;
  height: 4px;
  margin: 3px auto 1px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0, 210, 180, 0.55) 0%, rgba(10, 16, 32, 0.85) 50%, transparent 75%);
  transition: transform 0.3s ease, opacity 0.3s ease;
  will-change: transform, opacity;
}

/* Active Cybernetic Visor Scanning LEDs */
.robot-eye-glow {
  position: absolute;
  width: 9px;
  height: 5.5px;
  border-radius: 50%;
  background: #00D2B4;
  box-shadow: 
    0 0 8px 3px #00D2B4,
    0 0 16px 4px #38BDF8;
  pointer-events: none;
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
  z-index: 5;
  animation: robotEyePulseScan 2.8s ease-in-out infinite;
}

.robot-eye-glow.left-eye {
  left: 42.4%;
  top: 22.8%;
  animation-delay: 0s;
}

.robot-eye-glow.right-eye {
  left: 57.2%;
  top: 22.0%;
  animation-delay: 0.12s;
}

@keyframes robotEyePulseScan {
  0%, 100% {
    opacity: 0.85;
    transform: translate(-50%, -50%) scale(1);
  }
  38% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.25);
    filter: drop-shadow(0 0 6px #00D2B4);
  }
  48% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.3);
  }
  50% {
    /* Robotic sensor blink */
    opacity: 0.15;
    transform: translate(-50%, -50%) scale(0.25, 1.3);
  }
  53% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.3);
  }
  80% {
    opacity: 0.9;
    transform: translate(-50%, -50%) scale(1.08);
  }
}

/* Active Reactor Core Aura */
.robot-core-aura {
  position: absolute;
  top: 48%;
  left: 50%;
  width: 38px;
  height: 38px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 210, 180, 0.5) 0%, rgba(56, 189, 248, 0.25) 45%, transparent 70%);
  pointer-events: none;
  opacity: 0.6;
  mix-blend-mode: screen;
  z-index: 3;
  animation: robotCoreLivingPulse 2.8s ease-in-out infinite;
}

@keyframes robotCoreLivingPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.35);
    opacity: 0.95;
    filter: drop-shadow(0 0 12px rgba(0, 210, 180, 0.85));
  }
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
   ROBOT ANIMATION STATES (ALWAYS ACTIVE & LIVING)
   ========================================================= */

/* 1. Continuous Living Idle Motion (Floating, Breathing & Swaying) */
.chatbot-robot-card:not(.is-thinking):not(.is-responding):not(.is-acknowledging):not(.is-listening) .robot-figure-img {
  animation: robotFigureLivingFloat 2.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite !important;
  will-change: transform;
}

@keyframes robotFigureLivingFloat {
  0% {
    transform: translateY(0px) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-5px) rotate(-1.5deg) scale(1.02);
  }
  50% {
    transform: translateY(-9px) rotate(0.8deg) scale(1.03);
  }
  75% {
    transform: translateY(-4px) rotate(1.8deg) scale(1.01);
  }
  100% {
    transform: translateY(0px) rotate(0deg) scale(1);
  }
}

.chatbot-robot-card:not(.is-thinking):not(.is-responding):not(.is-acknowledging):not(.is-listening) .robot-ground-shadow {
  animation: robotGroundShadowLiving 2.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite !important;
  will-change: transform, opacity;
}

@keyframes robotGroundShadowLiving {
  0%, 100% {
    transform: scale(1);
    opacity: 0.85;
  }
  50% {
    transform: scale(0.68);
    opacity: 0.35;
  }
}

/* 2. Acknowledgement Nod (Immediate responsive greeting / nod on question submit) */
.chatbot-robot-card.is-acknowledging .robot-figure-img {
  animation: robotAcknowledgeNod 0.4s cubic-bezier(0.2, 0.8, 0.3, 1) !important;
}

@keyframes robotAcknowledgeNod {
  0% { transform: translateY(0) rotate(0deg) scale(1); }
  35% { transform: translateY(6px) rotate(2.5deg) scale(0.98); }
  70% { transform: translateY(-2px) rotate(-1deg) scale(1.02); }
  100% { transform: translateY(0) rotate(0deg) scale(1); }
}

.chatbot-robot-card.is-acknowledging .robot-eye-glow {
  animation: robotEyeAcknowledgeFlare 0.4s ease-out !important;
}

@keyframes robotEyeAcknowledgeFlare {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
  50% { transform: translate(-50%, -50%) scale(1.4); opacity: 1; filter: drop-shadow(0 0 12px #00D2B4); }
}

/* 3. Attentive Listening (Forward lean when customer types) */
.chatbot-robot-card.is-listening {
  border-color: rgba(0, 210, 180, 0.75);
  box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 210, 180, 0.45);
}

.chatbot-robot-card.is-listening .robot-figure-img {
  transform: translateY(-3px) rotate(2.2deg) scale(1.025) !important;
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.3, 1);
}

/* 4. Active Thinking (Dynamic Processing Motion & Core Energy Surge) */
.chatbot-robot-card.is-thinking {
  border-color: rgba(0, 210, 180, 0.9);
  box-shadow: 0 12px 28px -4px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 210, 180, 0.55);
}

.chatbot-robot-card.is-thinking .robot-figure-img {
  animation: robotThinkingTilt 1.4s ease-in-out infinite !important;
}

@keyframes robotThinkingTilt {
  0%, 100% { transform: translateY(-4px) rotate(-2.8deg) scale(1.02); }
  50% { transform: translateY(2px) rotate(2.2deg) scale(0.99); }
}

.chatbot-robot-card.is-thinking .robot-core-aura {
  opacity: 1 !important;
  animation: robotCoreEnergySurge 0.8s ease-in-out infinite alternate !important;
}

@keyframes robotCoreEnergySurge {
  0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.45); opacity: 1; filter: drop-shadow(0 0 14px #00D2B4); }
}

/* 5. Responding (Speaking Body Gestures & Voice Waves) */
.chatbot-robot-card.is-responding {
  border-color: #00D2B4;
  box-shadow: 0 12px 28px -4px rgba(0, 0, 0, 0.7), 0 0 26px rgba(0, 210, 180, 0.6);
}

.chatbot-robot-card.is-responding .robot-figure-img {
  animation: robotSpeakingMovement 1.6s ease-in-out infinite !important;
}

@keyframes robotSpeakingMovement {
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
  25% { transform: translateY(-3px) rotate(-2.2deg) scale(1.02); }
  50% { transform: translateY(2px) rotate(2deg) scale(0.99); }
  75% { transform: translateY(-1.5px) rotate(-1deg) scale(1.015); }
}

.chatbot-robot-card.is-responding .robot-speech-wave {
  display: flex;
}

.chatbot-robot-card.is-responding .robot-caption-sub {
  display: none;
}

"""
        content = content[:start_idx] + new_robot_card_block + content[end_idx:]
        print("Updated robot card block in styles.css")
    else:
        print(f"Warning: robot card block not found (start_idx={start_idx}, end_idx={end_idx})")

    with open("styles.css", "w", encoding="utf-8") as f:
        f.write(content)
    print("styles.css written successfully")

def update_app_js():
    with open("app.js", "r", encoding="utf-8") as f:
        content = f.read()

    # Replace bindMintXRobotMotion with continuous motion + 3D cursor tracking
    start_marker = "    // 7.6 Premium Animated Robot Companion inside MintX AI Chatbot"
    end_marker = "  initMintXMouseEffects();"

    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)

    if start_idx != -1 and end_idx != -1:
        new_robot_motion_js = """    // 7.6 Premium Animated Robot Companion inside MintX AI Chatbot (Continuous Live Motion & Interactive 3D Cursor Tracking)
    window.bindMintXRobotMotion = function() {
      const robotCard = document.getElementById('chatbotRobotCard');
      const chatWindow = document.getElementById('chatbotWindow');
      const welcomePanel = document.getElementById('chatbotWelcomePanel');
      const triggerBtn = document.getElementById('chatbotTriggerBtn');

      if (!robotCard) return;

      let targetRotX = 0;
      let targetRotY = 0;
      let currRotX = 0;
      let currRotY = 0;
      let isTracking = false;

      // Track cursor whenever mouse is inside chatbot window or welcome panel
      const trackingTarget = chatWindow || welcomePanel || robotCard;

      const handleMouseMove = (e) => {
        const rect = robotCard.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const normX = (e.clientX - centerX) / (window.innerWidth / 3);
        const normY = (e.clientY - centerY) / (window.innerHeight / 3);

        isTracking = true;
        // Natural 3D tilt tracking cursor (max ±6° rotY, ±4° rotX)
        targetRotY = Math.max(-6, Math.min(6, normX * 6));
        targetRotX = Math.max(-4, Math.min(4, -normY * 4));
      };

      const handleMouseLeave = () => {
        isTracking = false;
        targetRotX = 0;
        targetRotY = 0;
      };

      trackingTarget.removeEventListener('mousemove', handleMouseMove);
      trackingTarget.removeEventListener('mouseleave', handleMouseLeave);
      trackingTarget.addEventListener('mousemove', handleMouseMove, { passive: true });
      trackingTarget.addEventListener('mouseleave', handleMouseLeave);

      // Re-trigger animation frame loop for continuous smooth motion
      function renderRobotMotion() {
        currRotX += (targetRotX - currRotX) * 0.1;
        currRotY += (targetRotY - currRotY) * 0.1;

        if (isTracking || Math.abs(currRotX) > 0.02 || Math.abs(currRotY) > 0.02) {
          // Card tilts in 3D while the robot figure inside CONTINUES its floating animation
          robotCard.style.transform = `perspective(600px) rotateX(${currRotX.toFixed(2)}deg) rotateY(${currRotY.toFixed(2)}deg)`;
        } else {
          robotCard.style.transform = '';
        }

        requestAnimationFrame(renderRobotMotion);
      }
      requestAnimationFrame(renderRobotMotion);
    };

    window.bindMintXRobotMotion();
  }

"""
        content = content[:start_idx] + new_robot_motion_js + content[end_idx:]
        print("Updated bindMintXRobotMotion in app.js")
    else:
        print(f"Warning: bindMintXRobotMotion markers not found in app.js (start_idx={start_idx}, end_idx={end_idx})")

    # Also make sure when the chat window opens, bindMintXRobotMotion is invoked
    # Let's check openChatbot function in app.js
    if "window.bindMintXRobotMotion();" not in content[:start_idx]:
        # Add call inside toggleChatbot or openChatbot
        content = content.replace("chatWindow.classList.add('open');", "chatWindow.classList.add('open'); if (window.bindMintXRobotMotion) window.bindMintXRobotMotion();")
        print("Hooked bindMintXRobotMotion to chatWindow open")

    with open("app.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("app.js written successfully")

if __name__ == "__main__":
    update_styles()
    update_app_js()
