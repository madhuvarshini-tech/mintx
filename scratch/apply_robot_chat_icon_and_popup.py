import re

def update_app_js():
    with open("app.js", "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update the HTML inside chatbotRoot.innerHTML
    old_trigger_html = """      <!-- Floating Trigger Button -->
      <button type="button" class="chatbot-trigger-btn" id="chatbotTriggerBtn" aria-label="Chat with MintX AI" aria-expanded="false">
        <span class="chatbot-tooltip">Chat with MintX AI</span>
        <svg class="chatbot-trigger-icon" id="chatbotIconOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>"""

    new_trigger_html = """      <!-- Floating Speech Bubble Popup ("How can I help you?") -->
      <div class="chatbot-speech-bubble" id="chatbotSpeechBubble" role="dialog" aria-label="Greeting popup">
        <span class="chatbot-bubble-text" id="chatbotBubbleText">How can I help you?</span>
        <button type="button" class="chatbot-bubble-close" id="chatbotBubbleClose" aria-label="Close greeting" title="Dismiss">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="chatbot-bubble-tail" aria-hidden="true"></div>
      </div>

      <!-- Floating 3D Robot Launcher Button -->
      <button type="button" class="chatbot-robot-trigger" id="chatbotTriggerBtn" aria-label="Open MintX AI Chatbot" aria-expanded="false">
        <div class="robot-trigger-halo" aria-hidden="true"></div>
        <img src="public/visuals/robot_launcher.png" alt="MintX AI 3D Robot Assistant" class="robot-trigger-avatar" id="robotTriggerAvatar" width="192" height="192">
      </button>"""

    if old_trigger_html in content:
        content = content.replace(old_trigger_html, new_trigger_html, 1)
        print("Updated HTML markup for robot launcher and speech bubble in app.js")
    else:
        print("Error: old_trigger_html not found in app.js")
        return False

    # 2. Add speech bubble event handlers and update openChat/closeChat
    old_handlers_target = """    // Window Open/Close Trigger handlers
    const openChat = () => {
      chatWindow.classList.add('open'); if (window.bindMintXRobotMotion) window.bindMintXRobotMotion();
      triggerBtn.classList.add('active');
      triggerBtn.setAttribute('aria-expanded', 'true');
      setRobotState('idle');
      setTimeout(() => chatInput.focus(), 300);
    };

    const closeChat = () => {
      chatWindow.classList.remove('open');
      triggerBtn.classList.remove('active');
      triggerBtn.setAttribute('aria-expanded', 'false');
      setRobotState('idle');
    };"""

    new_handlers_replacement = """    // Speech Bubble Popup Elements & Handlers
    const speechBubble = document.getElementById('chatbotSpeechBubble');
    const bubbleClose = document.getElementById('chatbotBubbleClose');
    const bubbleText = document.getElementById('chatbotBubbleText');
    let isBubbleDismissed = false;

    // Show popup automatically on page load after subtle 650ms delay
    setTimeout(() => {
      if (!isBubbleDismissed && speechBubble && !chatWindow.classList.contains('open')) {
        speechBubble.classList.add('is-visible');
      }
    }, 650);

    // Dismiss only the speech bubble when user clicks (×); robot remains visible
    if (bubbleClose) {
      bubbleClose.addEventListener('click', (e) => {
        e.stopPropagation();
        isBubbleDismissed = true;
        if (speechBubble) speechBubble.classList.remove('is-visible');
      });
    }

    // Clicking the speech bubble opens the chatbot
    if (speechBubble) {
      speechBubble.addEventListener('click', (e) => {
        if (e.target.closest('#chatbotBubbleClose')) return;
        openChat();
      });
    }

    // Window Open/Close Trigger handlers
    const openChat = () => {
      chatWindow.classList.add('open');
      if (window.bindMintXRobotMotion) window.bindMintXRobotMotion();
      triggerBtn.classList.add('active');
      triggerBtn.setAttribute('aria-expanded', 'true');
      if (speechBubble) speechBubble.classList.remove('is-visible');
      setRobotState('idle');
      setTimeout(() => chatInput.focus(), 300);
    };

    const closeChat = () => {
      chatWindow.classList.remove('open');
      triggerBtn.classList.remove('active');
      triggerBtn.setAttribute('aria-expanded', 'false');
      setRobotState('idle');
      // If user had not explicitly closed bubble, gently show it again after chat closes
      if (!isBubbleDismissed && speechBubble) {
        setTimeout(() => {
          if (!chatWindow.classList.contains('open') && !isBubbleDismissed) {
            speechBubble.classList.add('is-visible');
          }
        }, 600);
      }
    };"""

    if old_handlers_target in content:
        content = content.replace(old_handlers_target, new_handlers_replacement, 1)
        print("Updated openChat/closeChat and speech bubble handlers in app.js")
    else:
        print("Error: old_handlers_target not found in app.js")
        return False

    with open("app.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("app.js saved successfully")
    return True

def update_styles():
    with open("styles.css", "r", encoding="utf-8") as f:
        content = f.read()

    # Find the block starting at "/* 1. Floating Launch Button */" up to ".chatbot-window {"
    old_styles_start = "/* 1. Floating Launch Button */"
    old_styles_end = "/* 2. Chat Window UI & Exact Reference Layout */\n.chatbot-window {"

    start_idx = content.find(old_styles_start)
    end_idx = content.find(old_styles_end)

    if start_idx == -1 or end_idx == -1:
        print(f"Error: styles markers not found (start={start_idx}, end={end_idx})")
        return False

    new_launcher_styles = """/* 1. Floating Speech Bubble Popup ("How can I help you?") */
.chatbot-speech-bubble {
  position: relative;
  margin-bottom: 12px;
  margin-right: 4px;
  background: #ffffff;
  border: 1.5px solid #CFE2F7;
  border-radius: 16px;
  padding: 11px 18px 11px 20px;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  box-shadow: 
    0 10px 28px -4px rgba(56, 189, 248, 0.25),
    0 3px 10px -2px rgba(15, 23, 42, 0.05);
  opacity: 0;
  transform: translateY(12px) scale(0.92);
  visibility: hidden;
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              visibility 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
  cursor: pointer;
  user-select: none;
  animation: speechBubbleGentleHover 3.4s ease-in-out infinite alternate;
  z-index: 1001;
}

.chatbot-speech-bubble.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  visibility: visible;
  pointer-events: auto;
}

.chatbot-speech-bubble:hover {
  border-color: #B9D6F5;
  box-shadow: 
    0 14px 34px -4px rgba(56, 189, 248, 0.35),
    0 4px 12px -2px rgba(15, 23, 42, 0.08);
}

@keyframes speechBubbleGentleHover {
  0% { transform: translateY(0px); }
  100% { transform: translateY(-4px); }
}

.chatbot-bubble-text {
  font-size: 0.94rem;
  font-weight: 600;
  color: #0F1F38;
  letter-spacing: -0.015em;
  white-space: nowrap;
  line-height: 1.25;
}

.chatbot-bubble-close {
  background: transparent;
  border: none;
  color: #8CA0BA;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  margin-left: 2px;
  outline: none;
}

.chatbot-bubble-close:hover {
  color: #0F1F38;
  background: rgba(140, 160, 186, 0.16);
  transform: scale(1.1);
}

/* Speech Bubble Tail pointing down towards the robot */
.chatbot-bubble-tail {
  position: absolute;
  bottom: -9px;
  right: 36px;
  width: 16px;
  height: 9px;
  overflow: hidden;
  pointer-events: none;
}

.chatbot-bubble-tail::after {
  content: '';
  position: absolute;
  top: -7px;
  left: 2px;
  width: 12px;
  height: 12px;
  background: #ffffff;
  border-right: 1.5px solid #CFE2F7;
  border-bottom: 1.5px solid #CFE2F7;
  transform: rotate(45deg);
  box-shadow: 2px 2px 4px rgba(56, 189, 248, 0.12);
}

/* 2. Floating 3D Robot Launcher Button */
.chatbot-robot-trigger {
  width: 90px;
  height: 90px;
  position: relative;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  animation: robotTriggerEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  z-index: 1000;
}

@keyframes robotTriggerEntrance {
  0% { opacity: 0; transform: scale(0.6) translateY(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

/* Pale Blue & White Glowing Halo Ring */
.robot-trigger-halo {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 84px;
  height: 84px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(240, 248, 255, 0.95) 0%, rgba(215, 238, 255, 0.6) 65%, rgba(186, 225, 255, 0.2) 85%, transparent 100%);
  box-shadow: 
    0 10px 30px -4px rgba(56, 189, 248, 0.42),
    0 0 0 1.5px rgba(200, 230, 255, 0.8),
    inset 0 0 16px rgba(255, 255, 255, 0.9);
  pointer-events: none;
  animation: haloBreathPulse 3.4s ease-in-out infinite;
  transition: all 0.3s ease;
}

@keyframes haloBreathPulse {
  0%, 100% {
    box-shadow: 
      0 10px 30px -4px rgba(56, 189, 248, 0.42),
      0 0 0 1.5px rgba(200, 230, 255, 0.8),
      inset 0 0 16px rgba(255, 255, 255, 0.9);
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    box-shadow: 
      0 14px 38px -2px rgba(56, 189, 248, 0.62),
      0 0 0 2.5px rgba(56, 189, 248, 0.7),
      inset 0 0 20px rgba(255, 255, 255, 1);
    transform: translate(-50%, -50%) scale(1.05);
  }
}

/* 3D Robot Image Avatar with Continuous Smooth Living Motion */
.robot-trigger-avatar {
  width: 88px;
  height: 88px;
  object-fit: contain;
  display: block;
  position: relative;
  z-index: 2;
  pointer-events: none;
  filter: drop-shadow(0 6px 14px rgba(15, 23, 42, 0.12));
  animation: robotTriggerHoverFloat 3.4s ease-in-out infinite;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
}

@keyframes robotTriggerHoverFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-4px) rotate(-1.5deg);
  }
  50% {
    transform: translateY(-7px) rotate(1.2deg);
  }
  75% {
    transform: translateY(-3px) rotate(2deg);
  }
}

.chatbot-robot-trigger:hover .robot-trigger-avatar {
  transform: translateY(-7px) scale(1.06) rotate(-2deg);
  filter: drop-shadow(0 10px 22px rgba(56, 189, 248, 0.32));
}

.chatbot-robot-trigger:hover .robot-trigger-halo {
  box-shadow: 
    0 16px 44px -2px rgba(56, 189, 248, 0.65),
    0 0 0 2.5px rgba(56, 189, 248, 0.85);
  transform: translate(-50%, -50%) scale(1.08);
}

.chatbot-robot-trigger:active .robot-trigger-avatar {
  transform: scale(0.94);
}

.chatbot-robot-trigger.active .robot-trigger-halo {
  border-color: #00D2B4;
  box-shadow: 0 0 20px rgba(0, 210, 180, 0.6);
}

"""
    content = content[:start_idx] + new_launcher_styles + content[end_idx:]

    # Also update .chatbot-window bottom position to 105px so it opens cleanly above/beside the robot
    content = content.replace("  position: absolute;\n  bottom: 74px;\n  right: 0;", "  position: absolute;\n  bottom: 104px;\n  right: 0;")

    # Also update .mintx-chatbot-root to support flex column align items flex-end
    content = content.replace(".mintx-chatbot-root {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  z-index: 99999;", ".mintx-chatbot-root {\n  position: fixed;\n  bottom: 20px;\n  right: 22px;\n  z-index: 99999;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;")

    with open("styles.css", "w", encoding="utf-8") as f:
        f.write(content)
    print("styles.css saved successfully")
    return True

if __name__ == "__main__":
    app_ok = update_app_js()
    styles_ok = update_styles()
    if app_ok and styles_ok:
        print("ALL UPDATES APPLIED SUCCESSFULLY!")
    else:
        print("Updates failed!")
