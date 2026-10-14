document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. Header Scroll Elevation
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2.2 MintX Logo Infinity Wave Animation Lifecycle
  // Triggers once per entry/return to Home page, stops near 'X', and disappears cleanly.
  const waveContainer = document.getElementById('logoWaveContainer');
  const waveLine = document.getElementById('waveLineAnimated');
  const waveSparkle = document.getElementById('waveLeadSparkle');

  if (waveContainer && waveLine) {
    // Synchronize the leading sparkle along the exact infinity path
    const pathTotalLen = waveLine.getTotalLength ? waveLine.getTotalLength() : 460;
    let animStart = null;
    const animDuration = 3200; // 3.2 seconds

    function stepWave(timestamp) {
      if (!animStart) animStart = timestamp;
      const progress = Math.min((timestamp - animStart) / animDuration, 1);

      if (waveSparkle && waveLine.getPointAtLength) {
        // Wave travels along the path: 0 -> full length, ending precisely back at X
        const currentDistance = progress * pathTotalLen;
        const pt = waveLine.getPointAtLength(currentDistance);
        waveSparkle.setAttribute('cx', pt.x);
        waveSparkle.setAttribute('cy', pt.y);
      }

      if (progress < 1) {
        requestAnimationFrame(stepWave);
      } else {
        // Animation finished at 'X' -> Fade out and remove wave element completely
        waveContainer.classList.add('wave-finished');
        setTimeout(() => {
          waveContainer.style.display = 'none';
        }, 850);
      }
    }

    requestAnimationFrame(stepWave);
  }

  // 2.5 Selected Works Moving Showcase (Right to Left Marquee)
  function initMarquee(trackId, wrapperId, pauseBtnId, toggleBtnId, pauseIconId, playIconId, pauseLabelId, viewLabelId) {
    const track = document.getElementById(trackId);
    const wrapper = document.getElementById(wrapperId);
    const pBtn = document.getElementById(pauseBtnId);
    const tBtn = document.getElementById(toggleBtnId);
    const pIcon = document.getElementById(pauseIconId);
    const plIcon = document.getElementById(playIconId);
    const pLabel = document.getElementById(pauseLabelId);
    const vLabel = document.getElementById(viewLabelId);

    if (track) {
      const firstGroup = track.querySelector('.works-marquee-group');
      if (firstGroup) {
        // Seamlessly clone the first group for infinite continuous right-to-left flow
        const clonedGroup = firstGroup.cloneNode(true);
        clonedGroup.setAttribute('aria-hidden', 'true');
        track.appendChild(clonedGroup);
      }

      if (pBtn) {
        pBtn.addEventListener('click', () => {
          const isPaused = track.classList.toggle('is-paused');
          if (pIcon && plIcon) {
            pIcon.style.display = isPaused ? 'none' : 'block';
            plIcon.style.display = isPaused ? 'block' : 'none';
          }
          if (pLabel) {
            pLabel.textContent = isPaused ? 'Play' : 'Pause';
          }
        });
      }

      if (tBtn && wrapper) {
        tBtn.addEventListener('click', () => {
          const isGrid = wrapper.classList.toggle('grid-view-active');
          if (vLabel) {
            vLabel.textContent = isGrid ? 'Showcase View' : 'Grid View';
          }
          if (pBtn) {
            pBtn.style.display = isGrid ? 'none' : 'inline-flex';
          }
        });
      }
    }
  }

  // Init on work.html
  initMarquee('worksMarqueeTrack', 'worksMarqueeWrapper', 'showcasePauseBtn', 'showcaseToggleViewBtn', 'pauseIcon', 'playIcon', 'pauseBtnLabel', 'viewBtnLabel');
  // Init on index.html
  initMarquee('homeWorksMarqueeTrack', 'homeWorksMarqueeWrapper', 'homeShowcasePauseBtn', 'homeShowcaseToggleViewBtn', 'homePauseIcon', 'homePlayIcon', 'homePauseBtnLabel', 'homeViewBtnLabel');

  // 3. Interactive Live Simulation (Menu Demo)
  const cartBadge = document.getElementById('demoCartBadge');
  const cartCount = document.getElementById('demoCartCount');
  const orderBtn = document.getElementById('demoOrderBtn');
  const clearBtn = document.getElementById('demoClearBtn');
  const statusBox = document.getElementById('demoStatus');
  const addBtns = document.querySelectorAll('.add-item-btn');

  let order = [];

  function updateCartUI() {
    if (cartCount) cartCount.textContent = order.length;
    if (orderBtn) {
      orderBtn.disabled = order.length === 0;
      orderBtn.textContent = `Place Simulated Order (${order.length})`;
    }
    if (cartBadge) {
      cartBadge.style.display = order.length > 0 ? 'inline-flex' : 'none';
    }
    if (clearBtn) {
      clearBtn.style.display = order.length > 0 ? 'inline-flex' : 'none';
    }
  }

  addBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const item = e.target.getAttribute('data-item');
      if (item) {
        order.push(item);
        if (statusBox) statusBox.style.display = 'none';
        updateCartUI();
      }
    });
  });

  if (orderBtn) {
    orderBtn.addEventListener('click', () => {
      if (order.length > 0 && statusBox) {
        statusBox.textContent = `✓ Demonstration completed successfully. ${order.length} item(s) logged: ${order.join(', ')}.`;
        statusBox.style.display = 'block';
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      order = [];
      if (statusBox) statusBox.style.display = 'none';
      updateCartUI();
    });
  }

  // 4. Interactive Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Inquiry Message →';

      if (submitBtn) {
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        contactForm.reset();
        if (formSuccess) formSuccess.style.display = 'block';
        if (submitBtn) {
          submitBtn.textContent = 'Message Submitted Successfully ✓';
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }, 3500);
        }
      }, 700);
    });
  }

  // 5. High-Performance Scroll-Triggered Animation Engine
  const setupAnimations = () => {
    // Remove no-js flag if present
    document.documentElement.classList.remove('no-js');

    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers: make everything immediately visible
      document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale-in').forEach(el => {
        el.classList.add('in-view');
      });
      return;
    }

    // Auto-annotate page elements for smooth scroll reveal if not already annotated
    const autoRevealTargets = [
      { selector: '.section-head', class: 'reveal-fade-up' },
      { selector: '.lead-service-card', class: 'reveal-scale-in' },
      { selector: '.hero-visual-card', class: 'reveal-fade-right' },
      { selector: '.product-grid', class: 'reveal-fade-up' },
      { selector: '.why-card', class: 'reveal-fade-up' },
      { selector: '.portfolio-card', class: 'reveal-fade-up' },
      { selector: '.process-step-card', class: 'reveal-fade-up' },
      { selector: '.contact-grid', class: 'reveal-fade-up' },
      { selector: '.footer-top', class: 'reveal-fade-up' }
    ];

    autoRevealTargets.forEach(target => {
      document.querySelectorAll(target.selector).forEach(el => {
        if (!el.classList.contains('reveal-fade-up') && 
            !el.classList.contains('reveal-fade-left') && 
            !el.classList.contains('reveal-fade-right') && 
            !el.classList.contains('reveal-scale-in')) {
          el.classList.add(target.class);
        }
      });
    });

    // Alternating Left-Right Scroll Animations for Service Boxes & Career Role Cards
    // Strictly per specification:
    // First box enters from the right.
    // Second box enters from the left.
    // Third box enters from the right.
    // Fourth box enters from the left.
    // Alternates consistently across all subsequent boxes.
    const allServiceCards = document.querySelectorAll(
      '#services .lead-service-card, #services .services-grid > *, .services-detailed-list > .lead-service-card, .container > .lead-service-card'
    );
    
    allServiceCards.forEach((card, index) => {
      // Clear generic fade classes
      card.classList.remove('reveal-fade-up', 'reveal-scale-in');
      
      // index 0 -> Right, index 1 -> Left, index 2 -> Right, index 3 -> Left
      if (index % 2 === 0) {
        card.classList.add('reveal-fade-right');
      } else {
        card.classList.add('reveal-fade-left');
      }
    });

    // Apply the exact same alternating animation to Careers open role cards
    const allCareerCards = document.querySelectorAll('#open-roles .role-card-premium, .role-card-premium');
    allCareerCards.forEach((card, index) => {
      card.classList.remove('reveal-fade-up', 'reveal-scale-in');
      if (index % 2 === 0) {
        card.classList.add('reveal-fade-right');
      } else {
        card.classList.add('reveal-fade-left');
      }
    });

    // Auto-stagger other children inside generic grid containers (excluding already alternated services)
    const gridContainers = document.querySelectorAll('.why-grid, .portfolio-grid, .projects-grid, .process-steps-grid, .process-grid, .client-logos-row, .careers-stats-grid, .perks-bento-grid');
    gridContainers.forEach(container => {
      const items = Array.from(container.children);
      items.forEach((child, index) => {
        if (!child.classList.contains('reveal-fade-up') && !child.classList.contains('reveal-fade-left') && !child.classList.contains('reveal-fade-right')) {
          child.classList.add('reveal-fade-up');
        }
        const staggerClass = `stagger-${Math.min((index % 4) + 1, 5)}`;
        child.classList.add(staggerClass);
      });
    });

    // IntersectionObserver with smooth early trigger margin
    const observerOptions = {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all annotated reveal targets
    const allAnimatedElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale-in');
    allAnimatedElements.forEach(el => {
      // If the element is already inside the viewport on initial load, reveal immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        el.classList.add('in-view');
      } else {
        revealObserver.observe(el);
      }
    });

    // 6. Interactive Count-Up Animation for Statistics
    const initStatCounters = () => {
      const statElements = document.querySelectorAll('.hero-stat-num');
      if (!statElements.length) return;

      const statObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const originalText = el.textContent.trim();
            
            // Handle percentage (99.8%), plus (20+), hours (24h)
            if (originalText.includes('%')) {
              const targetNum = parseFloat(originalText);
              let current = 0;
              const step = targetNum / 50;
              const timer = setInterval(() => {
                current += step;
                if (current >= targetNum) {
                  el.textContent = `${targetNum}%`;
                  clearInterval(timer);
                } else {
                  el.textContent = `${current.toFixed(1)}%`;
                }
              }, 25);
            } else if (originalText.includes('+')) {
              const targetNum = parseInt(originalText, 10);
              let current = 0;
              const step = Math.max(1, Math.floor(targetNum / 30));
              const timer = setInterval(() => {
                current += step;
                if (current >= targetNum) {
                  el.textContent = `${targetNum}+`;
                  clearInterval(timer);
                } else {
                  el.textContent = `${current}+`;
                }
              }, 35);
            } else if (originalText.includes('h')) {
              const targetNum = parseInt(originalText, 10);
              let current = 0;
              const timer = setInterval(() => {
                current += 1;
                if (current >= targetNum) {
                  el.textContent = `${targetNum}h`;
                  clearInterval(timer);
                } else {
                  el.textContent = `${current}h`;
                }
              }, 45);
            }
            obs.unobserve(el);
          }
        });
      }, { threshold: 0.2 });

      statElements.forEach(el => statObserver.observe(el));
    };

    initStatCounters();
  };

  setupAnimations();

  // =========================================================
  // 6. Premium MintX AI Chatbot Integration (Exact Visual Reference Match)
  // =========================================================
  const initMintXChatbot = () => {
    // If chatbot root already exists, return
    if (document.getElementById('mintxChatbotRoot')) return;

    // Helper: Formatted time string (e.g. "10:24 AM")
    const formatCurrentTime = () => {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

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
        <!-- 1. Header (Dark Navy) -->
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <div class="chatbot-avatar">
              <img src="public/visuals/robot_card.jpg" alt="MintX AI Robot Avatar" class="chatbot-avatar-img">
              <span class="chatbot-avatar-eye-glow" aria-hidden="true"></span>
            </div>
            <div class="chatbot-header-text">
              <div class="chatbot-title-row">
                <h3>MintX AI Assistant</h3>
                <span class="chatbot-pill-pro">PRO 2.0</span>
              </div>
              <div class="chatbot-header-status">
                <span class="chatbot-status-dot"></span>
                <span>Active · Instant Replies</span>
              </div>
            </div>
          </div>
          <div class="chatbot-header-actions">
            <button type="button" class="chatbot-action-btn" id="chatbotClearBtn" title="Clear conversation" aria-label="Clear chat">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
            </button>
            <button type="button" class="chatbot-action-btn" id="chatbotCloseBtn" title="Close chat" aria-label="Close chat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- 2. Quick Action Navigation Strip -->
        <div class="chatbot-quick-bar">
          <button type="button" class="chatbot-quick-tab" data-query="What services does MintX provide?">
            <span class="quick-tab-icon">🚀</span> Services
          </button>
          <button type="button" class="chatbot-quick-tab" data-query="How much does a website cost?">
            <span class="quick-tab-icon">💰</span> Pricing
          </button>
          <button type="button" class="chatbot-quick-tab" data-query="Can I see your previous client projects?">
            <span class="quick-tab-icon">📁</span> Work
          </button>
          <button type="button" class="chatbot-quick-tab" data-action="whatsapp">
            <span class="quick-tab-icon">💬</span> WhatsApp
          </button>
        </div>

        <!-- Scrollable Conversation Stream -->
        <div class="chatbot-body" id="chatbotBody">
          <!-- 3. Premium Robot Welcome Panel (Two Column: Robot Card Left | Welcome Text Right) -->
          <div class="chatbot-welcome-panel" id="chatbotWelcomePanel">
            <!-- Left Column: Robot Card -->
            <div class="chatbot-robot-card" id="chatbotRobotCard" tabindex="0" role="region" aria-label="MintX AI Digital Companion">
              <div class="robot-card-topbar">
                <span class="robot-status-pill">
                  <span class="robot-status-dot" id="robotStatusDot"></span>
                  <span class="robot-status-text" id="robotStatusText">AI CORE · ONLINE</span>
                </span>
                <span class="robot-badge-model">MINTX-BOT-BOT</span>
              </div>
              <div class="robot-figure-wrap" id="robotFigureWrap">
                <img src="public/visuals/robot_card.jpg" alt="MintX AI Autonomous Assistant" class="robot-figure-img" id="robotFigureImg" width="1900" height="2026">
                <span class="robot-eye-glow left-eye" aria-hidden="true"></span>
                <span class="robot-eye-glow right-eye" aria-hidden="true"></span>
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

            <!-- Subtle Teal Vertical Divider -->
            <div class="chatbot-welcome-divider" aria-hidden="true"></div>

            <!-- Right Column: Welcome Message -->
            <div class="chatbot-welcome-content">
              <h3 class="welcome-heading">Hi there! 👋</h3>
              <h4 class="welcome-subheading">Welcome to <span class="welcome-highlight">MintX Solutions.</span></h4>
              <p class="welcome-role">I'm your interactive AI advisor.</p>
              <p class="welcome-desc">Ask me anything about our website development, e-commerce, mobile apps, MintxQR, project timelines, or custom quotations!</p>
            </div>
          </div>

          <!-- 4. Messages History List -->
          <div class="chatbot-messages-list" id="chatbotMessagesList">
            <!-- Suggested chips -->
            <div class="chatbot-suggestions" id="chatbotSuggestions">
              <button type="button" class="chatbot-chip" data-query="What services does MintX provide?">⚡ Services Overview</button>
              <button type="button" class="chatbot-chip" data-query="How much does a website cost?">💡 Estimate Project Cost</button>
              <button type="button" class="chatbot-chip" data-query="Can I see your previous client projects?">🏆 Client Portfolio</button>
              <button type="button" class="chatbot-chip" data-query="What is MintxQR and how does it work?">📲 MintxQR Features</button>
              <button type="button" class="chatbot-chip" data-action="whatsapp">💬 WhatsApp Chat</button>
            </div>
          </div>
        </div>

        <!-- 5. Fixed Bottom Message Input -->
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
          statusDot.style.background = '#00D2B4';
          statusDot.style.boxShadow = '0 0 8px #00D2B4';
        }
        if (captionSub) captionSub.textContent = 'Acknowledging question...';

      } else if (state === 'listening') {
        robotCard.classList.add('is-listening');
        if (statusText) statusText.textContent = 'AI CORE · LISTENING';
        if (statusDot) {
          statusDot.style.background = '#00D2B4';
          statusDot.style.boxShadow = '0 0 8px #00D2B4';
        }
        if (captionSub) captionSub.textContent = 'Customer typing...';

      } else if (state === 'thinking') {
        robotCard.classList.add('is-thinking');
        if (statusText) statusText.textContent = 'AI CORE · THINKING...';
        if (statusDot) {
          statusDot.style.background = '#38BDF8';
          statusDot.style.boxShadow = '0 0 10px #38BDF8';
        }
        if (captionSub) captionSub.textContent = 'Preparing response...';

      } else if (state === 'responding') {
        robotCard.classList.add('is-responding');
        if (statusText) statusText.textContent = 'AI CORE · ANSWERING';
        if (statusDot) {
          statusDot.style.background = '#00D2B4';
          statusDot.style.boxShadow = '0 0 8px #00D2B4';
        }
        if (captionSub) captionSub.textContent = 'Explaining solution...';

        // Auto-return to idle when response completes
        stateResetTimer = setTimeout(() => {
          setRobotState('idle');
        }, 2800);

      } else {
        // Idle state: Serene floating and gentle breathing glow
        if (statusText) statusText.textContent = 'AI CORE · ONLINE';
        if (statusDot) {
          statusDot.style.background = '#00D2B4';
          statusDot.style.boxShadow = '0 0 6px #00D2B4';
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

    // Window Open/Close Trigger handlers
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
    };

    triggerBtn.addEventListener('click', () => {
      if (chatWindow.classList.contains('open')) {
        closeChat();
      } else {
        openChat();
      }
    });

    closeBtn.addEventListener('click', closeChat);

    // Clear conversation handler
    clearBtn.addEventListener('click', () => {
      conversationHistory = [];
      messagesList.innerHTML = `
        <div class="chatbot-suggestions" id="chatbotSuggestions">
          <button type="button" class="chatbot-chip" data-query="What services does MintX provide?">⚡ Services Overview</button>
          <button type="button" class="chatbot-chip" data-query="How much does a website cost?">💡 Estimate Project Cost</button>
          <button type="button" class="chatbot-chip" data-query="Can I see your previous client projects?">🏆 Client Portfolio</button>
          <button type="button" class="chatbot-chip" data-query="What is MintxQR and how does it work?">📲 MintxQR Features</button>
          <button type="button" class="chatbot-chip" data-action="whatsapp">💬 WhatsApp Chat</button>
        </div>
      `;
      setRobotState('idle');
      bindSuggestedChips();
      chatInput.focus();
    });

    // Helper: Format Markdown to HTML safely, converting checkmarks/bullets into styled teal icons
    const renderMarkdown = (text) => {
      let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>')
        .replace(/^[✓✔•]\s*(.*?)$/gm, '<div class="chatbot-list-item"><span class="chatbot-check-icon">✓</span><span>$1</span></div>')
        .replace(/\n\n/g, '<div class="chatbot-p-gap"></div>')
        .replace(/\n/g, '<br>');
      return html;
    };

    // Helper: Append Message Bubble with optional interactive card
    const appendMessage = (role, text, actionType) => {
      const row = document.createElement('div');
      row.className = `chatbot-msg-row ${role}`;
      const timeStr = formatCurrentTime();

      if (role === 'assistant') {
        const avatar = document.createElement('div');
        avatar.className = 'chatbot-msg-avatar';
        avatar.innerHTML = `<img src="public/visuals/robot_card.jpg" alt="MintX AI" class="chatbot-msg-avatar-img">`;
        row.appendChild(avatar);

        const bubbleWrap = document.createElement('div');
        bubbleWrap.className = 'chatbot-msg-bubble-wrap';

        const bubble = document.createElement('div');
        bubble.className = 'chatbot-msg-bubble';
        bubble.innerHTML = renderMarkdown(text);
        bubbleWrap.appendChild(bubble);

        const meta = document.createElement('div');
        meta.className = 'chatbot-msg-meta left';
        meta.innerHTML = `<span>${timeStr}</span>`;
        bubbleWrap.appendChild(meta);

        // Interactive Action Cards based on category
        if (actionType) {
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
          bubbleWrap.appendChild(cardBox);
        }

        row.appendChild(bubbleWrap);
      } else {
        const bubbleWrap = document.createElement('div');
        bubbleWrap.className = 'chatbot-msg-bubble-wrap right';

        const bubble = document.createElement('div');
        bubble.className = 'chatbot-msg-bubble';
        bubble.innerHTML = renderMarkdown(text);
        bubbleWrap.appendChild(bubble);

        const meta = document.createElement('div');
        meta.className = 'chatbot-msg-meta right';
        meta.innerHTML = `<span>${timeStr}</span> <svg class="meta-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#008F87" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        bubbleWrap.appendChild(meta);

        row.appendChild(bubbleWrap);
      }

      messagesList.appendChild(row);
      scrollToLatest(true);
    };

    // Elegant Typing Indicator Bubble with robot avatar and 3 teal dots
    const showTypingIndicator = () => {
      removeTypingIndicator();
      const typing = document.createElement('div');
      typing.className = 'chatbot-msg-row assistant typing';
      typing.id = 'chatbotTypingIndicator';
      typing.setAttribute('role', 'status');
      typing.setAttribute('aria-label', 'MintX AI is thinking');
      const timeStr = formatCurrentTime();

      typing.innerHTML = `
        <div class="chatbot-msg-avatar">
          <img src="public/visuals/robot_card.jpg" alt="MintX AI" class="chatbot-msg-avatar-img">
        </div>
        <div class="chatbot-msg-bubble-wrap">
          <div class="chatbot-typing-bubble">
            <div class="chatbot-typing-dots">
              <span class="chatbot-typing-dot"></span>
              <span class="chatbot-typing-dot"></span>
              <span class="chatbot-typing-dot"></span>
            </div>
            <span class="chatbot-typing-label">Thinking...</span>
          </div>
          <div class="chatbot-msg-meta left">
            <span>${timeStr}</span>
          </div>
        </div>
      `;
      messagesList.appendChild(typing);
      scrollToLatest(false);
    };

    const removeTypingIndicator = () => {
      const el = document.getElementById('chatbotTypingIndicator');
      if (el) el.remove();
    };

    // Advanced Local Intelligence & Intent Categorization (Exact Match to Prompt & Reference Image)
    const getLocalAdvancedReply = (query) => {
      const q = query.toLowerCase().trim();

      // 1. WhatsApp / Direct Lead Engineer Handoff
      if (q.includes("whatsapp") || q.includes("talk to engineer") || q.includes("human") || q.includes("call me") || q.includes("speak with") || q.includes("chat with team")) {
        return {
          text: "You can connect directly with our engineering and project leadership right now on WhatsApp or via a direct call:\n\n• **Direct Line & WhatsApp**: [+91 94870 58025](https://wa.me/919487058025)\n• **Email**: [mintxsolution@gmail.com](mailto:mintxsolution@gmail.com)\n\nWe respond to project inquiries typically within a few minutes!",
          action: "whatsapp"
        };
      }

      // 2. Pricing & Quotations (Checked before specific service keywords so 'how much does a website cost' hits pricing)
      if (q.includes("cost") || q.includes("price") || q.includes("quote") || q.includes("quotation") || q.includes("how much") || q.includes("budget") || q.includes("rate") || q.includes("charges") || q.includes("estimate") || q.includes("fee")) {
        return {
          text: "The cost depends on your requirements, features, and business goals. I can help you estimate the project cost. Are you looking for a business website, an e-commerce store, or a custom web application?\n\nWe provide **free consultations and written proposals within 2 hours**. Connect with our lead engineers on WhatsApp or submit a quick project brief!",
          action: "pricing"
        };
      }

      // 3. Project Timelines & Turnaround (Checked before service keywords so 'how long for a website' hits timelines)
      if (q.includes("timeline") || q.includes("duration") || q.includes("how long") || q.includes("turnaround") || q.includes("deadline") || q.includes("requirements") || q.includes("prerequisites") || q.includes("deliver")) {
        return {
          text: "Project delivery timelines at MintX Solutions are transparent and structured:\n\n✓ Standard Business Websites: Typically 1 to 2 weeks\n✓ E-Commerce & Custom Web Platforms: 2 to 4 weeks structured in weekly staging milestones\n✓ Mobile Applications: 3 to 6 weeks including App Store and Google Play reviews\n\n**What we need from you to begin:**\n1. Brief description of your business and goals\n2. Key features or reference websites you admire\n3. Brand assets (logo, colors, content if available)\n\nWe provide weekly staging links so you can interact with live progress before launch!",
          action: "pricing"
        };
      }

      // 4. MintxQR Flagship Platform
      if (q.includes("mintxqr") || q.includes("qr code") || q.includes("qr menu") || q.includes("digital menu") || q.includes("restaurant") || q.includes("cafe menu") || q.includes("hotel menu")) {
        return {
          text: "**MintxQR** is our flagship contactless digital menu and ordering platform engineered for modern hospitality venues:\n\n✓ Real-Time Menu Control: Update pricing, specials, and sold-out items instantly from any smartphone or dashboard\n✓ Table-Specific QR Codes: Diners scan without downloading any app to view dynamic, high-res visual menus\n✓ Order & Billing Efficiency: Reduces order turnaround time and eliminates costly reprinted paper menus\n\nExplore live features and pricing at [mintxqr.site](https://mintxqr.site) or request a 1-on-1 demo with our team!",
          action: "mintxqr"
        };
      }

      // 5. Portfolio & Verified Client Projects
      if (q.includes("project") || q.includes("portfolio") || q.includes("work") || q.includes("client") || q.includes("previous") || q.includes("sample") || q.includes("case study") || q.includes("latech") || q.includes("ezhil")) {
        return {
          text: "Here are some of our recently engineered, live client projects:\n\n✓ [LA TECH Rebar Solutions](https://latechrebarsolutions.com) — Structural engineering enterprise platform\n✓ [Prism Land Surveyors](https://www.prismlandsurveyors.in) — Precision surveying portal\n✓ [Sri Gokulam Global Exim](https://srigokulamglobalexim.vercel.app) — International export catalog\n✓ [Rate 2 Gold](https://r2goldfinancialservice.vercel.app) — Financial services platform\n✓ [Ezhil Construction](https://ezhilconstruction.vercel.app/) — Luxury building contractor portfolio\n✓ [Roadminded Safety Solutions](https://www.roadmindedsafetysolutions.com/) — Safety engineering site\n✓ [Ooty Travel Solutions](https://ootytravelsolutions.vercel.app/) — Tourism booking site\n\nExplore all 20+ case studies on our [Selected Work page](work.html)!",
          action: "portfolio"
        };
      }

      // 6. E-Commerce Development Specific
      if (q.includes("e-commerce") || q.includes("ecommerce") || q.includes("online store") || q.includes("shop") || q.includes("storefront") || q.includes("razorpay") || q.includes("stripe") || q.includes("payment gateway") || q.includes("cart") || q.includes("checkout")) {
        return {
          text: "We engineer bespoke, high-converting **E-Commerce Platforms** designed to scale your sales:\n\n✓ Custom Storefronts: Lightning-fast browsing with sub-second page loads to minimize checkout abandonment\n✓ Secure Payment Gateways: Seamless integration with Razorpay, Stripe, UPI, and international processors\n✓ Automated Inventory & Orders: Real-time stock sync, multi-tier pricing, customer accounts, and automated notifications\n✓ Zero Revenue Share: You own 100% of your code and platform with zero ongoing percentage commissions\n\nWould you like an architecture roadmap and milestone quote for your store?",
          action: "ecommerce"
        };
      }

      // 7. Mobile App Development Specific
      if (q.includes("mobile app") || q.includes("app development") || q.includes("ios") || q.includes("android") || q.includes("flutter") || q.includes("react native") || q.includes("build an app")) {
        return {
          text: "At MintX Solutions, we craft native-grade **Mobile Applications** for iOS and Android:\n\n✓ Cross-Platform Engineering: Built using Flutter and React Native for a single, unified codebase that saves 40% development time\n✓ Touch-Optimized UX: Fluid 60fps micro-animations and gesture navigation\n✓ Cloud Sync & Offline-First: Reliable offline storage with real-time background sync\n✓ End-to-End Store Publishing: Complete handling of Apple App Store and Google Play Store certification\n\nWhat kind of mobile app are you planning to build?",
          action: "mobile"
        };
      }

      // 8. Web Design & UI/UX Specific
      if (q.includes("ui/ux") || q.includes("ui") || q.includes("ux") || q.includes("web design") || q.includes("wireframe") || q.includes("prototype") || q.includes("design system")) {
        return {
          text: "At MintX Solutions, our **UI/UX and Web Design** team crafts bespoke digital experiences:\n\n✓ Custom UI Design Systems: Distinctive visual identities that elevate brand trust\n✓ Conversion Wireframing: User-journey mapping optimized to reduce friction and bounce rates\n✓ Micro-Animations: Fluid 60fps interactions that make interfaces feel responsive and premium\n✓ Responsive Prototyping: Pixel-perfect layout across desktop, tablet, and mobile devices\n\nWould you like to discuss a design direction or review our wireframing workflow?",
          action: "services"
        };
      }

      // 9. Website Development Specific
      if (q.includes("website") || q.includes("web development") || q.includes("landing page") || q.includes("build a website") || q.includes("corporate site")) {
        return {
          text: "Our **Website Development** services deliver custom digital experiences engineered for real business revenue:\n\n✓ Performance First: Sub-second load times scoring 95+ on Google Lighthouse\n✓ Conversion Architecture: Strategic UI/UX hierarchy that turns passive visitors into qualified leads\n✓ Clean, Modern Stack: Built with semantic HTML5, modern TypeScript, Next.js, and zero bloated templates\n✓ Enterprise SEO: Structured data, meta frameworks, and lightning-fast Core Web Vitals to dominate search\n\nWe can deliver bespoke business websites within 1–2 weeks!",
          action: "services"
        };
      }

      // 10. General Services Overview (EXACT MATCH TO REFERENCE SCREENSHOT)
      if (q.includes("service") || q.includes("offer") || q.includes("capabilities") || q.includes("what do you do") || q.includes("solutions") || q.includes("provide")) {
        return {
          text: "Hi! 👋 MintX Solutions provides a wide range of digital services to help your business grow online. Here are our main services:\n\n✓ Website Development\n✓ E-commerce Development\n✓ Mobile App Development\n✓ UI/UX Design\n✓ Digital Marketing\n✓ MintxQR (Smart QR Solutions)\n\nWe create modern, fast and result-driven solutions tailored to your business needs.",
          action: "services"
        };
      }

      // 11. Digital Marketing & SEO
      if (q.includes("marketing") || q.includes("seo") || q.includes("google ranking") || q.includes("google maps") || q.includes("lead generation") || q.includes("traffic") || q.includes("cro")) {
        return {
          text: "Our **Digital Marketing & SEO** solutions drive measurable revenue and visibility:\n\n✓ Technical & On-Page SEO: In-depth keyword mapping, schema markups, and search architecture\n✓ Local Search Dominance: Google Maps ranking for businesses across Salem, Coimbatore, and regional hubs\n✓ ROI-Driven Ad Campaigns: Targeted Google Ads and Meta performance marketing funnels\n✓ Conversion Rate Optimization (CRO): Continuous user-journey refinement to maximize conversions from existing traffic",
          action: "services"
        };
      }

      // 12. Technology Stacks
      if (q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("technology") || q.includes("react") || q.includes("next") || q.includes("node") || q.includes("python") || q.includes("database") || q.includes("framework")) {
        return {
          text: "Our core engineering stack is chosen for maximum runtime speed, security, and zero bloat:\n\n✓ Frontend: Modern TypeScript, React, Next.js, semantic HTML5, and Vanilla CSS / Tailwind\n✓ Mobile: Flutter and React Native for unified iOS & Android\n✓ Backend & APIs: Node.js, Python, PostgreSQL, Supabase, and Serverless Edge functions\n✓ Hosting & Cloud: Vercel, AWS, and Cloudflare CDN\n✓ Audit Benchmark: 95+ Google Lighthouse scores across all client deliveries",
          action: "services"
        };
      }

      // 13. How to Start a Project / Onboarding
      if (q.includes("how do i start") || q.includes("how to start") || q.includes("get started") || q.includes("start a project") || q.includes("hire you") || q.includes("onboard") || q.includes("begin")) {
        return {
          text: "Starting a project with MintX Solutions is straightforward and quick:\n\n1. **Share your vision**: Submit a brief via our [Start a Project form](contact.html) or ping our team on WhatsApp\n2. **Free Discovery Session**: We discuss your requirements, features, and target audience\n3. **Transparent Proposal**: You receive a fixed-scope milestone quotation and roadmap within 2 hours\n4. **Kickoff**: We begin wireframing and prototyping immediately!\n\nWould you like to speak with a lead engineer right now?",
          action: "contact"
        };
      }

      // 14. Contact Details & Studio Location
      if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("location") || q.includes("address") || q.includes("salem") || q.includes("where") || q.includes("reach") || q.includes("office")) {
        return {
          text: "You can reach **MintX Solutions** directly:\n\n• **Studio HQ**: Salem, Tamil Nadu, India (serving Salem, Coimbatore, Pollachi, India & international clients)\n• **WhatsApp Direct**: [+91 94870 58025](https://wa.me/919487058025)\n• **Email**: [mintxsolution@gmail.com](mailto:mintxsolution@gmail.com)\n• **Instagram**: [@mintxsolutions](https://www.instagram.com/mintxsolutions)\n\nOffice hours: Monday – Saturday, 9:00 AM – 7:00 PM IST.",
          action: "contact"
        };
      }

      // 15. Careers & Internships
      if (q.includes("career") || q.includes("job") || q.includes("intern") || q.includes("hiring") || q.includes("vacancy") || q.includes("work with you")) {
        return {
          text: "We are actively recruiting passionate tech talent in Salem, TN! Current openings include:\n\n• **Project Coordinator** (Full-Time, Salem)\n• **UI/UX Designer** (Hybrid)\n• **Frontend / Full-Stack Interns** (Paid, Hands-On)\n\nLearn more and apply directly on our [Careers page](careers.html)!",
          action: "careers"
        };
      }

      // 16. Polite Fallback for Unrelated / Off-topic Queries
      return {
        text: "I am the **MintX AI Assistant**, specialized in helping you with **MintX Solutions services**, website development, e-commerce, mobile apps, MintxQR, and project quotations.\n\nHow can our engineering team in Salem assist you with your digital project today?",
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

  initMintXChatbot();

  // =========================================================
  // 7. PREMIUM MOUSE EFFECTS ENGINE (MintX Solutions)
  // =========================================================
  function initMintXMouseEffects() {
    // Check device capabilities and user motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isTouchOnly = ('ontouchstart' in window) && !isFinePointer;

    if (prefersReducedMotion || !isFinePointer || isCoarse || isTouchOnly) {
      return; // Preserve native cursor on mobile, touch, or reduced motion
    }

    // 7.1 Create Custom Cursor Elements
    let cursorDot = document.getElementById('cursorDot');
    let cursorRing = document.getElementById('cursorRing');
    let trailContainer = document.getElementById('cursorTrailContainer');

    if (!cursorDot) {
      cursorDot = document.createElement('div');
      cursorDot.id = 'cursorDot';
      cursorDot.className = 'mintx-cursor-dot';
      cursorDot.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cursorDot);
    }

    if (!cursorRing) {
      cursorRing = document.createElement('div');
      cursorRing.id = 'cursorRing';
      cursorRing.className = 'mintx-cursor-ring';
      cursorRing.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cursorRing);
    }

    if (!trailContainer) {
      trailContainer = document.createElement('div');
      trailContainer.id = 'cursorTrailContainer';
      trailContainer.className = 'mintx-cursor-trail-container';
      trailContainer.setAttribute('aria-hidden', 'true');
      document.body.appendChild(trailContainer);
    }

    document.body.classList.add('mintx-custom-cursor-active');

    // Cursor tracking state
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;

    // 7.2 Smooth Fading Mouse Trail (3-5 small particles)
    const MAX_PARTICLES = 4;
    const activeParticles = [];
    let lastParticleTime = 0;
    let lastParticleX = 0;
    let lastParticleY = 0;

    function spawnTrailParticle(x, y) {
      const now = performance.now();
      const dist = Math.hypot(x - lastParticleX, y - lastParticleY);
      // Throttle creation to avoid clustering when slow
      if (now - lastParticleTime < 45 || dist < 14) return;

      lastParticleTime = now;
      lastParticleX = x;
      lastParticleY = y;

      // Keep only up to MAX_PARTICLES active
      while (activeParticles.length >= MAX_PARTICLES) {
        const oldest = activeParticles.shift();
        if (oldest && oldest.parentNode) {
          oldest.parentNode.removeChild(oldest);
        }
      }

      const particle = document.createElement('div');
      particle.className = 'mintx-cursor-particle';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      trailContainer.appendChild(particle);
      activeParticles.push(particle);

      setTimeout(() => {
        const index = activeParticles.indexOf(particle);
        if (index > -1) activeParticles.splice(index, 1);
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      }, 380);
    }

    // Mouse Movement Listener
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        cursorDot.classList.add('mintx-cursor-visible');
        cursorRing.classList.add('mintx-cursor-visible');
        ringX = mouseX;
        ringY = mouseY;
      }

      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      spawnTrailParticle(mouseX, mouseY);
    }, { passive: true });

    // Window Boundary Transitions
    document.addEventListener('mouseleave', () => {
      isVisible = false;
      cursorDot.classList.remove('mintx-cursor-visible');
      cursorRing.classList.remove('mintx-cursor-visible');
    });

    document.addEventListener('mouseenter', () => {
      isVisible = true;
      cursorDot.classList.add('mintx-cursor-visible');
      cursorRing.classList.add('mintx-cursor-visible');
    });

    // Mousedown / Mouseup spring feedback
    window.addEventListener('mousedown', () => {
      cursorRing.classList.add('is-clicking');
      cursorDot.classList.add('is-clicking');
    });

    window.addEventListener('mouseup', () => {
      cursorRing.classList.remove('is-clicking');
      cursorDot.classList.remove('is-clicking');
    });

    // Outer Ring Easing Loop with rAF
    function renderCursorRing() {
      if (isVisible) {
        // Natural slight trailing delay (lerp 0.16)
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        cursorRing.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0)`;
      }
      requestAnimationFrame(renderCursorRing);
    }
    requestAnimationFrame(renderCursorRing);

    // 7.3 Interactive Hover Detection
    const BUTTON_SELECTORS = 'button, .btn, .btn-primary, .btn-outline, .btn-hero-primary, .btn-hero-explore, .btn-pill-mint, .btn-pill-outline, .nav-pill-cta, .showcase-btn, .mobile-toggle, .chatbot-toggle-btn, .chatbot-send-btn, [role="button"]';
    const LINK_SELECTORS = 'a, .nav-link, .double-bezel-light, .project-card-inner, .chatbot-chip, .chatbot-quick-tab, .footer-link, .chatbot-robot-card, .chatbot-robot-showcase';

    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const btnMatch = target.closest(BUTTON_SELECTORS);
      if (btnMatch) {
        cursorRing.classList.add('is-hovering', 'is-hovering-button');
        cursorDot.classList.add('is-hovering-button');
        return;
      }

      const linkMatch = target.closest(LINK_SELECTORS);
      if (linkMatch) {
        cursorRing.classList.add('is-hovering');
        return;
      }

      const inputMatch = target.closest('input, textarea, select');
      if (inputMatch) {
        cursorRing.classList.add('is-text-input');
        cursorDot.classList.add('is-text-input');
        return;
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      cursorRing.classList.remove('is-hovering', 'is-hovering-button', 'is-text-input');
      cursorDot.classList.remove('is-hovering-button', 'is-text-input');
    });

    // 7.4 Hero Section: Ambient Faint Radial Mint-Green Glow
    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
      let heroGlow = document.getElementById('heroMouseGlow');
      if (!heroGlow) {
        heroGlow = document.createElement('div');
        heroGlow.id = 'heroMouseGlow';
        heroGlow.className = 'hero-mouse-glow';
        heroGlow.setAttribute('aria-hidden', 'true');
        heroSection.prepend(heroGlow);
      }

      let heroMouseX = 0;
      let heroMouseY = 0;
      let glowX = 0;
      let glowY = 0;
      let isHeroActive = false;

      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        heroMouseX = e.clientX - rect.left;
        heroMouseY = e.clientY - rect.top;

        if (!isHeroActive) {
          isHeroActive = true;
          heroGlow.style.opacity = '1';
          glowX = heroMouseX;
          glowY = heroMouseY;
        }
      }, { passive: true });

      heroSection.addEventListener('mouseleave', () => {
        isHeroActive = false;
        heroGlow.style.opacity = '0';
      });

      function renderHeroGlow() {
        if (isHeroActive || parseFloat(heroGlow.style.opacity || '0') > 0.02) {
          glowX += (heroMouseX - glowX) * 0.09;
          glowY += (heroMouseY - glowY) * 0.09;
          heroGlow.style.transform = `translate3d(${glowX.toFixed(1)}px, ${glowY.toFixed(1)}px, 0)`;
        }

        requestAnimationFrame(renderHeroGlow);
      }
      requestAnimationFrame(renderHeroGlow);
    }

    // 7.5 Subtle Magnetic Effect for "Start a Project" Button
    const magneticButtons = document.querySelectorAll('.nav-pill-cta, .btn-hero-primary');

    magneticButtons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        // Subtle pull toward cursor (clamped within ±8px X, ±6px Y)
        const moveX = Math.max(-8, Math.min(8, deltaX * 0.28));
        const moveY = Math.max(-6, Math.min(6, deltaY * 0.28));

        btn.style.transition = 'transform 0.12s ease-out, box-shadow 0.25s ease';
        btn.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0)`;
      });

      btn.addEventListener('mouseleave', () => {
        // Smooth return to initial rest position
        btn.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease';
        btn.style.transform = 'translate3d(0, 0, 0)';
      });
    });

    // 7.6 Premium Animated Robot Companion inside MintX AI Chatbot (Continuous Live Motion & Interactive 3D Cursor Tracking)
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

  initMintXMouseEffects();
});
