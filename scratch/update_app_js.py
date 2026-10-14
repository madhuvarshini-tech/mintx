import os

app_js_path = "app.js"
with open(app_js_path, "r", encoding="utf-8") as f:
    content = f.read()

start_marker = "  // 6. Premium MintX AI Chatbot Integration\n  // =========================================================\n  const initMintXChatbot = () => {"
if start_marker not in content:
    start_marker = "  // 6. Premium MintX AI Chatbot Integration\r\n  // =========================================================\r\n  const initMintXChatbot = () => {"
    if start_marker not in content:
        print("Error: start_marker not found in app.js")
        exit(1)

end_marker = "  initMintXChatbot();\n\n  // =========================================================\n  // 7. PREMIUM MOUSE EFFECTS ENGINE (MintX Solutions)"
if end_marker not in content:
    end_marker = "  initMintXChatbot();\r\n\r\n  // =========================================================\r\n  // 7. PREMIUM MOUSE EFFECTS ENGINE (MintX Solutions)"
    if end_marker not in content:
        print("Error: end_marker not found in app.js")
        exit(1)

start_idx = content.index(start_marker)
end_idx = content.index(end_marker) + len("  initMintXChatbot();")

new_chatbot_code = """  // 6. Premium MintX AI Chatbot Integration
  // =========================================================
  const initMintXChatbot = () => {
    // If chatbot root already exists, return
    if (document.getElementById('mintxChatbotRoot')) return;

    // Template for Dedicated Interactive Robot Companion Stage
    const ROBOT_SHOWCASE_HTML = `
      <div class="chatbot-robot-card" id="chatbotRobotCard" tabindex="0" role="region" aria-label="MintX AI Digital Companion">
        <div class="robot-card-topbar">
          <span class="robot-status-pill">
            <span class="robot-status-dot" id="robotStatusDot"></span>
            <span class="robot-status-text" id="robotStatusText">AI CORE · ONLINE</span>
          </span>
          <span class="robot-badge-model">MINTX-BOT</span>
        </div>
        <div class="robot-figure-wrap" id="robotFigureWrap">
          <img src="public/visuals/robot_card.jpg" alt="MintX AI Autonomous Assistant" class="robot-figure-img" id="robotFigureImg" width="1900" height="2026">
          <!-- Precision Glowing Cyan/Teal Eyes anchored to robot visor -->
          <span class="robot-eye-glow left-eye" aria-hidden="true"></span>
          <span class="robot-eye-glow right-eye" aria-hidden="true"></span>
          <!-- Thinking Core Aura Glow -->
          <div class="robot-core-aura" id="robotCoreAura" aria-hidden="true"></div>
        </div>
        <div class="robot-ground-shadow" aria-hidden="true"></div>
        <div class="robot-card-footer">
          <span class="robot-caption-title">Autonomous Digital Atelier</span>
          <span class="robot-caption-sub" id="robotCaptionSub">Ready to assist</span>
          <div class="robot-speech-wave" id="robotSpeechWave" aria-hidden="true">
            <span class="speech-bar"></span>
            <span class="speech-bar"></span>
            <span class="speech-bar"></span>
            <span class="speech-bar"></span>
            <span class="speech-label">Speaking...</span>
          </div>
        </div>
      </div>
    `;

    // Create chatbot root container
    const chatbotRoot = document.createElement('div');
    chatbotRoot.className = 'mintx-chatbot-root';
    chatbotRoot.id = 'mintxChatbotRoot';

    chatbotRoot.innerHTML = `
      <!-- Floating Trigger Button -->
      <button type="button" class="chatbot-trigger-btn" id="chatbotTriggerBtn" aria-label="Chat with MintX AI" aria-expanded="false">
        <span class="chatbot-tooltip">Chat with MintX AI</span>
        <svg class="chatbot-trigger-icon" id="chatbotIconOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      <!-- Chat Window -->
      <div class="chatbot-window" id="chatbotWindow" role="dialog" aria-modal="true" aria-label="MintX AI Assistant">
        <!-- Header -->
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <div class="chatbot-avatar">
              <img src="public/visuals/robot_card.jpg" alt="MintX AI Robot Avatar" class="chatbot-avatar-img">
              <span class="chatbot-avatar-eye-glow" aria-hidden="true"></span>
            </div>
            <div class="chatbot-header-text">
              <div style="display: flex; align-items: center; gap: 6px;">
                <h3>MintX AI Assistant</h3>
                <span class="chatbot-pill-pro">Pro 2.0</span>
              </div>
              <div class="chatbot-header-status">
                <span class="chatbot-status-dot"></span>
                <span>Active · Instant Replies</span>
              </div>
            </div>
          </div>
          <div class="chatbot-header-actions">
            <button type="button" class="chatbot-action-btn" id="chatbotClearBtn" title="Clear conversation" aria-label="Clear chat">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
            </button>
            <button type="button" class="chatbot-action-btn" id="chatbotCloseBtn" title="Close chat" aria-label="Close chat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        <!-- Quick Action Nav Bar -->
        <div class="chatbot-quick-bar">
          <button type="button" class="chatbot-quick-tab" data-query="What services does MintX Solutions provide?">🚀 Services</button>
          <button type="button" class="chatbot-quick-tab" data-query="How does pricing and quotation work at MintX Solutions?">💰 Pricing</button>
          <button type="button" class="chatbot-quick-tab" data-query="Can I see your previous projects and portfolio?">📂 Work</button>
          <button type="button" class="chatbot-quick-tab" data-action="whatsapp">💬 WhatsApp</button>
        </div>

        <!-- Dedicated Pinned Interactive Robot Stage (Always visible, never overlaps chat) -->
        <div class="chatbot-robot-stage" id="chatbotRobotStage">
          ${ROBOT_SHOWCASE_HTML}
        </div>

        <!-- Scrollable Conversation Stream -->
        <div class="chatbot-body" id="chatbotBody">
          <div class="chatbot-messages-list" id="chatbotMessagesList">
            <!-- Initial Welcome message -->
            <div class="chatbot-msg-row assistant">
              <div class="chatbot-msg-bubble">
                Hi there! 👋 Welcome to <strong>MintX Solutions</strong>. I'm your interactive AI advisor.<br><br>
                Ask me anything about our website development, e-commerce, mobile apps, MintxQR, project timelines, or custom quotations!
              </div>
            </div>

            <!-- Suggested Chips -->
            <div class="chatbot-suggestions" id="chatbotSuggestions">
              <button type="button" class="chatbot-chip" data-query="What services does MintX Solutions provide?">⚡ Web & Mobile Services</button>
              <button type="button" class="chatbot-chip" data-query="How can I build an e-commerce website?">🛍️ Build E-Commerce Store</button>
              <button type="button" class="chatbot-chip" data-query="How much does a website cost?">💡 Estimate Project Cost</button>
              <button type="button" class="chatbot-chip" data-query="Can I see your previous projects?">🏆 Verified Client Portfolio</button>
              <button type="button" class="chatbot-chip" data-query="What is MintxQR and how does it work?">📲 MintxQR Features</button>
              <button type="button" class="chatbot-chip" data-query="How do I start a project with MintX?">🚀 How to Start a Project</button>
              <button type="button" class="chatbot-chip" data-action="whatsapp">💬 Instant WhatsApp Chat</button>
            </div>
          </div>
        </div>

        <!-- Footer / Input -->
        <form class="chatbot-footer" id="chatbotForm">
          <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Ask about services, pricing, tech stack..." autocomplete="off" aria-label="Type your message">
          <button type="submit" class="chatbot-send-btn" id="chatbotSendBtn" aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(chatbotRoot);

    // Elements & State
    const triggerBtn = document.getElementById('chatbotTriggerBtn');
    const chatWindow = document.getElementById('chatbotWindow');
    const closeBtn = document.getElementById('chatbotCloseBtn');
    const clearBtn = document.getElementById('chatbotClearBtn');
    const chatBody = document.getElementById('chatbotBody');
    const messagesList = document.getElementById('chatbotMessagesList');
    const chatForm = document.getElementById('chatbotForm');
    const chatInput = document.getElementById('chatbotInput');
    const sendBtn = document.getElementById('chatbotSendBtn');
    const robotCard = document.getElementById('chatbotRobotCard');
    const statusText = document.getElementById('robotStatusText');
    const statusDot = document.getElementById('robotStatusDot');
    const captionSub = document.getElementById('robotCaptionSub');

    let conversationHistory = [];
    let isProcessing = false;
    let stateResetTimer = null;

    // Natural Robot State Controller
    // States: idle, acknowledging, listening, thinking, responding
    const setRobotState = (state) => {
      if (!robotCard) return;
      clearTimeout(stateResetTimer);

      robotCard.classList.remove('is-thinking', 'is-listening', 'is-responding', 'is-acknowledging');

      if (state === 'acknowledging') {
        robotCard.classList.add('is-acknowledging');
        if (statusText) statusText.textContent = 'AI CORE · ACKNOWLEDGED';
        if (statusDot) {
          statusDot.style.background = '#65E6C5';
          statusDot.style.boxShadow = '0 0 8px #65E6C5';
        }
        if (captionSub) captionSub.textContent = 'Acknowledged question...';

      } else if (state === 'listening') {
        robotCard.classList.add('is-listening');
        if (statusText) statusText.textContent = 'AI CORE · LISTENING';
        if (statusDot) {
          statusDot.style.background = '#65E6C5';
          statusDot.style.boxShadow = '0 0 8px #65E6C5';
        }
        if (captionSub) captionSub.textContent = 'Customer typing...';

      } else if (state === 'thinking') {
        robotCard.classList.add('is-thinking');
        if (statusText) statusText.textContent = 'AI CORE · THINKING...';
        if (statusDot) {
          statusDot.style.background = '#38bdf8';
          statusDot.style.boxShadow = '0 0 10px #38bdf8';
        }
        if (captionSub) captionSub.textContent = 'Processing request...';

      } else if (state === 'responding') {
        robotCard.classList.add('is-responding');
        if (statusText) statusText.textContent = 'AI CORE · ANSWERING';
        if (statusDot) {
          statusDot.style.background = '#10B981';
          statusDot.style.boxShadow = '0 0 8px #10B981';
        }
        if (captionSub) captionSub.textContent = 'Explaining solution...';

        // Auto-return to idle when response completes
        stateResetTimer = setTimeout(() => {
          setRobotState('idle');
        }, 2600);

      } else {
        // Idle state: Serene floating and gentle breathing glow
        if (statusText) statusText.textContent = 'AI CORE · ONLINE';
        if (statusDot) {
          statusDot.style.background = '#10B981';
          statusDot.style.boxShadow = '0 0 6px #10B981';
        }
        if (captionSub) captionSub.textContent = 'Ready to assist';
      }
    };

    // Smooth Scrolling: Keeps the conversation readable and newest responses visible
    const scrollToLatest = (force = false) => {
      requestAnimationFrame(() => {
        chatBody.scrollTo({
          top: chatBody.scrollHeight,
          behavior: 'smooth'
        });
      });
    };

    // Toggle Chat Window
    const toggleChat = (forceOpen) => {
      const isOpen = chatWindow.classList.contains('open');
      const nextState = forceOpen !== undefined ? forceOpen : !isOpen;

      if (nextState) {
        chatWindow.classList.add('open');
        triggerBtn.classList.add('active');
        triggerBtn.setAttribute('aria-expanded', 'true');
        setRobotState('acknowledging');
        setTimeout(() => {
          setRobotState('idle');
          chatInput?.focus();
        }, 500);
      } else {
        chatWindow.classList.remove('open');
        triggerBtn.classList.remove('active');
        triggerBtn.setAttribute('aria-expanded', 'false');
        setRobotState('idle');
      }
    };

    triggerBtn.addEventListener('click', () => toggleChat());
    closeBtn.addEventListener('click', () => toggleChat(false));

    // Reset / Clear Conversation
    clearBtn.addEventListener('click', () => {
      conversationHistory = [];
      messagesList.innerHTML = `
        <div class="chatbot-msg-row assistant">
          <div class="chatbot-msg-bubble">
            Chat cleared! How can I assist you with your project today?
          </div>
        </div>
        <div class="chatbot-suggestions" id="chatbotSuggestions">
          <button type="button" class="chatbot-chip" data-query="What services does MintX Solutions provide?">⚡ Web & Mobile Services</button>
          <button type="button" class="chatbot-chip" data-query="How can I build an e-commerce website?">🛍️ Build E-Commerce Store</button>
          <button type="button" class="chatbot-chip" data-query="How much does a website cost?">💡 Estimate Project Cost</button>
          <button type="button" class="chatbot-chip" data-query="Can I see your previous projects?">🏆 Verified Client Portfolio</button>
          <button type="button" class="chatbot-chip" data-query="What is MintxQR and how does it work?">📲 MintxQR Features</button>
          <button type="button" class="chatbot-chip" data-action="whatsapp">💬 Instant WhatsApp Chat</button>
        </div>
      `;
      setRobotState('idle');
      bindSuggestedChips();
      chatInput.focus();
    });

    // Helper: Format Markdown to HTML safely
    const renderMarkdown = (text) => {
      let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
        .replace(/\\*(.*?)\\*/g, '<em>$1</em>')
        .replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>')
        .replace(/\\n\\n/g, '<br><br>')
        .replace(/\\n/g, '<br>');
      return html;
    };

    // Helper: Append Message Bubble with optional interactive card
    const appendMessage = (role, text, actionType) => {
      const row = document.createElement('div');
      row.className = `chatbot-msg-row ${role}`;
      const bubble = document.createElement('div');
      bubble.className = 'chatbot-msg-bubble';
      bubble.innerHTML = renderMarkdown(text);

      // Interactive Action Cards based on category
      if (role === 'assistant' && actionType) {
        const cardBox = document.createElement('div');
        cardBox.className = 'chatbot-action-card';

        if (actionType === 'services') {
          cardBox.innerHTML = `
            <div class="chatbot-card-title">Explore Capabilities</div>
            <div class="chatbot-card-actions">
              <a href="services.html" class="chatbot-card-btn primary">View Full Services →</a>
              <a href="contact.html?service=website" class="chatbot-card-btn secondary">Request Quote</a>
            </div>
          `;
        } else if (actionType === 'ecommerce') {
          cardBox.innerHTML = `
            <div class="chatbot-card-title">E-Commerce Development</div>
            <div class="chatbot-card-actions">
              <a href="contact.html?service=ecommerce" class="chatbot-card-btn primary">Start Storefront Scope →</a>
              <a href="https://wa.me/919487058025?text=Hello%20MintX%2C%20I%20want%20to%20build%20an%20ecommerce%20store." target="_blank" rel="noreferrer" class="chatbot-card-btn whatsapp">💬 WhatsApp Store Lead</a>
            </div>
          `;
        } else if (actionType === 'mobile') {
          cardBox.innerHTML = `
            <div class="chatbot-card-title">Mobile App Engineering</div>
            <div class="chatbot-card-actions">
              <a href="contact.html?service=mobile" class="chatbot-card-btn primary">Request App Architecture →</a>
              <a href="services.html" class="chatbot-card-btn secondary">View Tech Stack</a>
            </div>
          `;
        } else if (actionType === 'mintxqr') {
          cardBox.innerHTML = `
            <div class="chatbot-card-title">MintXQR Digital Ecosystem</div>
            <div class="chatbot-card-actions">
              <a href="https://mintxqr.site" target="_blank" rel="noreferrer" class="chatbot-card-btn primary">Visit MintXQR.site ↗</a>
              <a href="https://wa.me/919487058025?text=Hello%20MintX%2C%20I%20would%20like%20a%20MintXQR%20demo." target="_blank" rel="noreferrer" class="chatbot-card-btn whatsapp">💬 Request Live Demo</a>
            </div>
          `;
        } else if (actionType === 'pricing' || actionType === 'quote') {
          cardBox.innerHTML = `
            <div class="chatbot-card-title">Get a Tailored Free Estimate</div>
            <div class="chatbot-card-actions">
              <a href="https://wa.me/919487058025?text=Hello%20MintX%2C%20I%20would%20like%20a%20project%20estimate." target="_blank" rel="noreferrer" class="chatbot-card-btn whatsapp">
                <span>💬 WhatsApp Lead Engineer</span>
              </a>
              <a href="contact.html" class="chatbot-card-btn primary">Submit Project Scope →</a>
            </div>
          `;
        } else if (actionType === 'portfolio') {
          cardBox.innerHTML = `
            <div class="chatbot-card-title">Live Commercial Case Studies</div>
            <div class="chatbot-card-actions">
              <a href="work.html" class="chatbot-card-btn primary">View Full Portfolio →</a>
              <a href="https://latechrebarsolutions.com" target="_blank" rel="noreferrer" class="chatbot-card-btn secondary">LA TECH Live ↗</a>
            </div>
          `;
        } else if (actionType === 'contact' || actionType === 'whatsapp') {
          cardBox.innerHTML = `
            <div class="chatbot-card-title">Direct Connection</div>
            <div class="chatbot-card-actions">
              <a href="https://wa.me/919487058025" target="_blank" rel="noreferrer" class="chatbot-card-btn whatsapp">
                <span>💬 WhatsApp (+91 94870 58025)</span>
              </a>
              <a href="tel:+919487058025" class="chatbot-card-btn secondary">📞 Call Studio</a>
            </div>
          `;
        } else if (actionType === 'careers') {
          cardBox.innerHTML = `
            <div class="chatbot-card-title">Join Our Engineering Team</div>
            <div class="chatbot-card-actions">
              <a href="careers.html" class="chatbot-card-btn primary">View Open Positions →</a>
            </div>
          `;
        }
        bubble.appendChild(cardBox);
      }

      row.appendChild(bubble);
      messagesList.appendChild(row);
      scrollToLatest(true);
    };

    // Elegant Typing Indicator Bubble
    const showTypingIndicator = () => {
      removeTypingIndicator();
      const typing = document.createElement('div');
      typing.className = 'chatbot-typing-row';
      typing.id = 'chatbotTypingIndicator';
      typing.setAttribute('role', 'status');
      typing.setAttribute('aria-label', 'MintX AI is thinking');
      typing.innerHTML = `
        <div class="chatbot-typing-dots">
          <span class="chatbot-typing-dot"></span>
          <span class="chatbot-typing-dot"></span>
          <span class="chatbot-typing-dot"></span>
        </div>
        <span class="chatbot-typing-label">MintX AI is thinking...</span>
      `;
      messagesList.appendChild(typing);
      scrollToLatest(false);
    };

    const removeTypingIndicator = () => {
      const el = document.getElementById('chatbotTypingIndicator');
      if (el) el.remove();
    };

    // Advanced Local Intelligence & Intent Categorization (Verified MintX Knowledge Engine)
    const getLocalAdvancedReply = (query) => {
      const q = query.toLowerCase().trim();

      // 1. WhatsApp / Direct Lead Engineer Handoff
      if (q.includes("whatsapp") || q.includes("talk to engineer") || q.includes("human") || q.includes("call me") || q.includes("speak with") || q.includes("chat with team")) {
        return {
          text: "You can connect directly with our engineering and project leadership right now on WhatsApp or via a direct call:\\n\\n• **Direct Line & WhatsApp**: [+91 94870 58025](https://wa.me/919487058025)\\n• **Email**: [mintxsolution@gmail.com](mailto:mintxsolution@gmail.com)\\n\\nWe respond to project inquiries typically within a few minutes!",
          action: "whatsapp"
        };
      }

      // 2. MintxQR Flagship Platform
      if (q.includes("mintxqr") || q.includes("qr code") || q.includes("qr menu") || q.includes("digital menu") || q.includes("restaurant") || q.includes("cafe menu") || q.includes("hotel menu")) {
        return {
          text: "**MintxQR** is our flagship contactless digital menu and ordering platform engineered for modern hospitality venues:\\n\\n• **Real-Time Menu Control**: Update pricing, specials, and sold-out items instantly from any smartphone or dashboard.\\n• **Table-Specific QR Codes**: Diners scan without downloading any app to view dynamic, high-res visual menus.\\n• **Order & Billing Efficiency**: Reduces order turnaround time and eliminates costly reprinted paper menus.\\n\\nExplore live features and pricing at [mintxqr.site](https://mintxqr.site) or request a 1-on-1 demo with our team!",
          action: "mintxqr"
        };
      }

      // 3. E-Commerce Development Specific
      if (q.includes("e-commerce") || q.includes("ecommerce") || q.includes("online store") || q.includes("shop") || q.includes("storefront") || q.includes("razorpay") || q.includes("stripe") || q.includes("payment gateway") || q.includes("cart") || q.includes("checkout")) {
        return {
          text: "We engineer bespoke, high-converting **E-Commerce Platforms** designed to scale your sales:\\n\\n• **Custom Storefronts**: Lightning-fast browsing with sub-second page loads to minimize checkout abandonment.\\n• **Secure Payment Gateways**: Seamless integration with Razorpay, Stripe, UPI, and international processors.\\n• **Automated Inventory & Orders**: Real-time stock sync, multi-tier pricing, customer accounts, and automated notifications.\\n• **Zero Revenue Share**: You own 100% of your code and platform with zero ongoing percentage commissions.\\n\\nWould you like an architecture roadmap and milestone quote for your store?",
          action: "ecommerce"
        };
      }

      // 4. Mobile App Development Specific
      if (q.includes("mobile app") || q.includes("app development") || q.includes("ios") || q.includes("android") || q.includes("flutter") || q.includes("react native") || q.includes("build an app")) {
        return {
          text: "At MintX Solutions, we craft native-grade **Mobile Applications** for iOS and Android:\\n\\n• **Cross-Platform Engineering**: Built using Flutter and React Native for a single, unified codebase that saves 40% development time.\\n• **Touch-Optimized UX**: Fluid 60fps micro-animations and gesture navigation.\\n• **Cloud Sync & Offline-First**: Reliable offline storage with real-time background sync.\\n• **End-to-End Store Publishing**: Complete handling of Apple App Store and Google Play Store certification.\\n\\nWhat kind of mobile app are you planning to build?",
          action: "mobile"
        };
      }

      // 5. Website Development Specific
      if (q.includes("website") || q.includes("web design") || q.includes("web development") || q.includes("landing page") || q.includes("build a website") || q.includes("corporate site")) {
        return {
          text: "Our **Website Development** services deliver custom digital experiences engineered for real business revenue:\\n\\n• **Performance First**: Sub-second load times scoring 95+ on Google Lighthouse.\\n• **Conversion Architecture**: Strategic UI/UX hierarchy that turns passive visitors into qualified leads.\\n• **Clean, Modern Stack**: Built with semantic HTML5, modern TypeScript, Next.js, and zero bloated templates.\\n• **Enterprise SEO**: Structured data, meta frameworks, and lightning-fast Core Web Vitals to dominate local and national search.\\n\\nWe can deliver bespoke business websites within 1–2 weeks!",
          action: "services"
        };
      }

      // 6. Pricing & Quotations (Transparent, no arbitrary numbers)
      if (q.includes("cost") || q.includes("price") || q.includes("quote") || q.includes("quotation") || q.includes("how much") || q.includes("budget") || q.includes("rate") || q.includes("charges") || q.includes("estimate") || q.includes("fee")) {
        return {
          text: "At MintX Solutions, we do not believe in arbitrary or hidden pricing. Because every project is custom-engineered, **exact costs depend on your feature scope, design requirements, and timeline**.\\n\\n• **Standard Business Websites**: Fast turnaround (typically 1–2 weeks) with fixed milestone pricing.\\n• **Custom Web Apps & E-Commerce**: Phased sprint quotes with staging previews.\\n• **Mobile Apps**: Complete architecture, UI, and App Store deployment.\\n\\nWe provide **free consultations and written proposals within 2 hours**. Connect with our lead engineers on WhatsApp or submit a quick project brief!",
          action: "pricing"
        };
      }

      // 7. General Services Overview
      if (q.includes("service") || q.includes("offer") || q.includes("capabilities") || q.includes("what do you do") || q.includes("solutions") || q.includes("provide")) {
        return {
          text: "**MintX Solutions** is an independent digital atelier in Salem, TN delivering end-to-end engineering:\\n\\n1. **Website Development** — Bespoke business platforms engineered for sub-second speeds and SEO conversion.\\n2. **E-Commerce Development** — Secure, automated storefronts with Razorpay/Stripe payment gateways.\\n3. **Mobile App Development** — Unified iOS & Android applications built on Flutter & React Native.\\n4. **Digital Marketing & SEO** — Local Google Maps dominance and high-ROI ad campaigns.\\n5. **MintXQR** — Contactless digital ordering and QR menus for restaurants and hospitality.\\n\\nWhich service can we tailor for your business?",
          action: "services"
        };
      }

      // 8. Digital Marketing & SEO
      if (q.includes("marketing") || q.includes("seo") || q.includes("google ranking") || q.includes("google maps") || q.includes("lead generation") || q.includes("traffic") || q.includes("cro")) {
        return {
          text: "Our **Digital Marketing & SEO** solutions drive measurable revenue and visibility:\\n\\n• **Technical & On-Page SEO**: In-depth keyword mapping, schema markups, and search architecture.\\n• **Local Search Dominance**: Google Maps ranking for businesses across Salem, Coimbatore, and regional hubs.\\n• **ROI-Driven Ad Campaigns**: Targeted Google Ads and Meta performance marketing funnels.\\n• **Conversion Rate Optimization (CRO)**: Continuous user-journey refinement to maximize conversions from existing traffic.",
          action: "services"
        };
      }

      // 9. Project Timelines & Requirements
      if (q.includes("timeline") || q.includes("duration") || q.includes("how long") || q.includes("turnaround") || q.includes("deadline") || q.includes("requirements") || q.includes("prerequisites") || q.includes("deliver")) {
        return {
          text: "Project delivery timelines at MintX Solutions are transparent and structured:\\n\\n• **Standard Business Websites**: Typically 1 to 2 weeks.\\n• **E-Commerce & Custom Web Platforms**: 2 to 4 weeks structured in weekly staging milestones.\\n• **Mobile Applications**: 3 to 6 weeks including App Store and Google Play reviews.\\n\\n**What we need from you to begin:**\\n1. Brief description of your business and goals.\\n2. Key features or reference websites you admire.\\n3. Brand assets (logo, colors, content if available).\\n\\nWe provide weekly staging links so you can interact with live progress before launch!",
          action: "pricing"
        };
      }

      // 10. Technology Stacks
      if (q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("technology") || q.includes("react") || q.includes("next") || q.includes("node") || q.includes("python") || q.includes("database") || q.includes("framework")) {
        return {
          text: "Our core engineering stack is chosen for maximum runtime speed, security, and zero bloat:\\n\\n• **Frontend**: Modern TypeScript, React, Next.js, semantic HTML5, and Vanilla CSS / Tailwind.\\n• **Mobile**: Flutter and React Native for unified iOS & Android.\\n• **Backend & APIs**: Node.js, Python, PostgreSQL, Supabase, and Serverless Edge functions.\\n• **Hosting & Cloud**: Vercel, AWS, and Cloudflare CDN.\\n• **Audit Benchmark**: 95+ Google Lighthouse scores across all client deliveries.",
          action: "services"
        };
      }

      // 11. Portfolio & Verified Client Projects
      if (q.includes("project") || q.includes("portfolio") || q.includes("work") || q.includes("client") || q.includes("previous") || q.includes("sample") || q.includes("case study") || q.includes("latech") || q.includes("ezhil")) {
        return {
          text: "Here are some of our recently engineered, live client projects:\\n\\n• **[LA TECH Rebar Solutions](https://latechrebarsolutions.com)** — Structural engineering enterprise platform.\\n• **[Prism Land Surveyors](https://www.prismlandsurveyors.in)** — Precision surveying portal.\\n• **[Sri Gokulam Global Exim](https://srigokulamglobalexim.vercel.app)** — International export catalog.\\n• **[Rate 2 Gold](https://r2goldfinancialservice.vercel.app)** — Financial services platform.\\n• **[Ezhil Construction](https://ezhilconstruction.vercel.app/)** — Luxury building contractor portfolio.\\n• **[Roadminded Safety Solutions](https://www.roadmindedsafetysolutions.com/)** — Safety engineering site.\\n• **[Ooty Travel Solutions](https://ootytravelsolutions.vercel.app/)** — Tourism booking site.\\n\\nExplore all 20+ case studies on our [Selected Work page](work.html)!",
          action: "portfolio"
        };
      }

      // 12. How to Start a Project / Onboarding
      if (q.includes("how do i start") || q.includes("how to start") || q.includes("get started") || q.includes("start a project") || q.includes("hire you") || q.includes("onboard") || q.includes("begin")) {
        return {
          text: "Starting a project with MintX Solutions is straightforward and quick:\\n\\n1. **Share your vision**: Submit a brief via our [Start a Project form](contact.html) or ping our team on WhatsApp.\\n2. **Free Discovery Session**: We discuss your requirements, features, and target audience.\\n3. **Transparent Proposal**: You receive a fixed-scope milestone quotation and roadmap within 2 hours.\\n4. **Kickoff**: We begin wireframing and prototyping immediately!\\n\\nWould you like to speak with a lead engineer right now?",
          action: "contact"
        };
      }

      // 13. Contact Details & Studio Location
      if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("location") || q.includes("address") || q.includes("salem") || q.includes("where") || q.includes("reach") || q.includes("office")) {
        return {
          text: "You can reach **MintX Solutions** directly:\\n\\n• **Studio HQ**: Salem, Tamil Nadu, India (serving Salem, Coimbatore, Pollachi, India & international clients)\\n• **WhatsApp Direct**: [+91 94870 58025](https://wa.me/919487058025)\\n• **Email**: [mintxsolution@gmail.com](mailto:mintxsolution@gmail.com)\\n• **Instagram**: [@mintxsolutions](https://www.instagram.com/mintxsolutions)\\n\\nOffice hours: Monday – Saturday, 9:00 AM – 7:00 PM IST.",
          action: "contact"
        };
      }

      // 14. Careers & Internships
      if (q.includes("career") || q.includes("job") || q.includes("intern") || q.includes("hiring") || q.includes("vacancy") || q.includes("work with you")) {
        return {
          text: "We are actively recruiting passionate tech talent in Salem, TN! Current openings include:\\n\\n• **Project Coordinator** (Full-Time, Salem)\\n• **UI/UX Designer** (Hybrid)\\n• **Frontend / Full-Stack Interns** (Paid, Hands-On)\\n\\nLearn more and apply directly on our [Careers page](careers.html)!",
          action: "careers"
        };
      }

      // 15. Polite Fallback for Unrelated / Off-topic Queries
      return {
        text: "I am the **MintX AI Assistant**, specialized in helping you with **MintX Solutions services**, website development, e-commerce, mobile apps, MintxQR, and project quotations.\\n\\nHow can our engineering team in Salem assist you with your digital project today?",
        action: "services"
      };
    };

    // Send Message Workflow
    const handleSendMessage = async (text) => {
      if (isProcessing) return;
      const query = (text || chatInput.value).trim();
      if (!query) return;

      isProcessing = true;
      sendBtn.disabled = true;
      chatInput.disabled = true;

      // 1. Immediately append user message to conversation list
      appendMessage('user', query);
      chatInput.value = '';
      conversationHistory.push({ role: 'user', content: query });

      // 2. Step 1 of Robot response: Immediate Acknowledgement Nod (350ms)
      setRobotState('acknowledging');

      // 3. Step 2 of Robot response: Transition to Thinking state with Typing Indicator
      setTimeout(() => {
        if (isProcessing) {
          setRobotState('thinking');
          showTypingIndicator();
        }
      }, 350);

      // Natural processing duration for realistic cadence
      const naturalThinkingDelay = new Promise((resolve) => setTimeout(resolve, 1100));

      try {
        let replyText = '';
        let replyAction = '';

        // Attempt Server-Side API call
        const apiPromise = fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: conversationHistory }),
        }).catch(() => null);

        const [apiRes] = await Promise.all([apiPromise, naturalThinkingDelay]);

        if (apiRes && apiRes.ok) {
          const data = await apiRes.json();
          replyText = data.reply || "Thank you for reaching out! How else can MintX Solutions assist you?";
          const localCheck = getLocalAdvancedReply(query);
          replyAction = localCheck.action;
        } else {
          const fallback = getLocalAdvancedReply(query);
          replyText = fallback.text;
          replyAction = fallback.action;
        }

        // 4. Response Ready: Robot transitions to speaking state, answer appears
        removeTypingIndicator();
        setRobotState('responding');
        appendMessage('assistant', replyText, replyAction);
        conversationHistory.push({ role: 'assistant', content: replyText });

      } catch (err) {
        console.error('Chatbot interaction error:', err);
        removeTypingIndicator();
        const fallback = getLocalAdvancedReply(query);
        setRobotState('responding');
        appendMessage('assistant', fallback.text, fallback.action);
        conversationHistory.push({ role: 'assistant', content: fallback.text });
      } finally {
        isProcessing = false;
        sendBtn.disabled = false;
        chatInput.disabled = false;
        chatInput.focus();
      }
    };

    // User typing listener: Robot enters attentive listening state
    let typingDebounce = null;
    chatInput.addEventListener('input', () => {
      if (isProcessing) return;
      if (chatInput.value.trim().length > 0) {
        setRobotState('listening');
        clearTimeout(typingDebounce);
        typingDebounce = setTimeout(() => {
          if (!isProcessing) {
            setRobotState('idle');
          }
        }, 1500);
      } else {
        clearTimeout(typingDebounce);
        setRobotState('idle');
      }
    });

    // Keyboard handling: Enter to send, Shift+Enter for new line
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
      }
    });

    // Form submit
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSendMessage();
    });

    // Tab visibility handling: pause animations when browser tab is inactive
    document.addEventListener('visibilitychange', () => {
      if (robotCard) {
        if (document.hidden) {
          robotCard.classList.add('is-paused');
        } else {
          robotCard.classList.remove('is-paused');
        }
      }
    });

    // Suggested Chips & Quick Bar Binding
    const bindSuggestedChips = () => {
      const buttons = document.querySelectorAll('.chatbot-chip, .chatbot-quick-tab');
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const action = btn.getAttribute('data-action');
          if (action === 'whatsapp') {
            window.open('https://wa.me/919487058025?text=Hello%20MintX%20Solutions%2C%20I%20would%20like%20to%20discuss%20a%20project.', '_blank', 'noopener,noreferrer');
            handleSendMessage("I'd like to connect directly with your engineering team on WhatsApp.");
            return;
          }
          const query = btn.getAttribute('data-query');
          if (query) handleSendMessage(query);
        });
      });
    };

    bindSuggestedChips();
  };

  initMintXChatbot();"""

new_content = content[:start_idx] + new_chatbot_code + content[end_idx:]

with open(app_js_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"Successfully updated {app_js_path} with new chatbot implementation!")
