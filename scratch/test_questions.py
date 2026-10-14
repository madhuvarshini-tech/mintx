def getLocalAdvancedReply(query):
    q = query.lower().strip()

    # 1. WhatsApp / Direct Lead Engineer Handoff
    if any(k in q for k in ["whatsapp", "talk to engineer", "human", "call me", "speak with", "chat with team"]):
        return {
            "text": "WhatsApp / Direct Call",
            "action": "whatsapp"
        }

    # 2. Pricing & Quotations (checked before specific service keywords so "how much does a website cost" hits pricing!)
    if any(k in q for k in ["cost", "price", "quote", "quotation", "how much", "budget", "rate", "charges", "estimate", "fee"]):
        return {
            "text": "Pricing & Quotations",
            "action": "pricing"
        }

    # 3. Project Timelines & Turnaround (checked before service keywords so "how long for a website" hits timeline!)
    if any(k in q for k in ["timeline", "duration", "how long", "turnaround", "deadline", "requirements", "prerequisites"]):
        return {
            "text": "Project Timelines",
            "action": "pricing"
        }

    # 4. MintxQR Flagship Platform
    if any(k in q for k in ["mintxqr", "qr code", "qr menu", "digital menu", "restaurant", "cafe menu", "hotel menu"]):
        return {
            "text": "MintxQR Flagship Platform",
            "action": "mintxqr"
        }

    # 5. Portfolio & Verified Client Projects
    if any(k in q for k in ["project", "portfolio", "work", "client", "previous", "sample", "case study", "latech", "ezhil"]):
        return {
            "text": "Portfolio Projects",
            "action": "portfolio"
        }

    # 6. E-Commerce Development Specific
    if any(k in q for k in ["e-commerce", "ecommerce", "online store", "shop", "storefront", "razorpay", "stripe", "payment gateway", "cart", "checkout"]):
        return {
            "text": "E-Commerce Development",
            "action": "ecommerce"
        }

    # 7. Mobile App Development Specific
    if any(k in q for k in ["mobile app", "app development", "ios", "android", "flutter", "react native", "build an app"]):
        return {
            "text": "Mobile App Development",
            "action": "mobile"
        }

    # 8. UI/UX & Web Design Specific
    if any(k in q for k in ["ui/ux", "ui", "ux", "web design", "wireframe", "prototype", "design system"]):
        return {
            "text": "UI/UX & Web Design",
            "action": "services"
        }

    # 9. Website Development Specific
    if any(k in q for k in ["website", "web development", "landing page", "build a website", "corporate site"]):
        return {
            "text": "Website Development",
            "action": "services"
        }

    # 10. General Services Overview
    if any(k in q for k in ["service", "offer", "capabilities", "what do you do", "solutions", "provide"]):
        return {
            "text": "Services Overview",
            "action": "services"
        }

    # 11. Digital Marketing & SEO
    if any(k in q for k in ["marketing", "seo", "google ranking", "google maps", "lead generation", "traffic", "cro"]):
        return {
            "text": "Digital Marketing & SEO",
            "action": "services"
        }

    # 12. Technology Stacks
    if any(k in q for k in ["tech", "stack", "language", "technology", "react", "next", "node", "python", "database", "framework"]):
        return {
            "text": "Technology Stack",
            "action": "services"
        }

    # 13. How to Start a Project / Onboarding
    if any(k in q for k in ["how do i start", "how to start", "get started", "start a project", "hire you", "onboard", "begin"]):
        return {
            "text": "How to Start",
            "action": "contact"
        }

    # 14. Contact Details & Studio Location
    if any(k in q for k in ["contact", "phone", "email", "location", "address", "salem", "where", "reach", "office"]):
        return {
            "text": "Contact Details",
            "action": "contact"
        }

    # 15. Careers & Internships
    if any(k in q for k in ["career", "job", "intern", "hiring", "vacancy", "work with you"]):
        return {
            "text": "Careers",
            "action": "careers"
        }

    # 16. Fallback
    return {
        "text": "Fallback: MintX AI Assistant Introduction",
        "action": "services"
    }

test_queries = [
    ("What services does MintX provide?", "Services Overview"),
    ("How much does a website cost?", "Pricing & Quotations"),
    ("What is the capital of France?", "Fallback: MintX AI Assistant Introduction"),
    ("Tell me about your e-commerce solutions", "E-Commerce Development"),
    ("Do you make mobile apps with Flutter?", "Mobile App Development"),
    ("What is MintxQR and how does it work?", "MintxQR Flagship Platform"),
    ("Can I see your previous client projects?", "Portfolio Projects"),
    ("How long does it take to deliver a website?", "Project Timelines"),
    ("Can you design modern UI/UX prototypes?", "UI/UX & Web Design"),
    ("Where are you located and how do I contact you?", "Contact Details"),
    ("Can I connect on WhatsApp?", "WhatsApp / Direct Call"),
]

print("Running Query Matching Test:")
all_passed = True
for query, expected_category in test_queries:
    res = getLocalAdvancedReply(query)
    matched = res["text"] == expected_category
    status = "PASS" if matched else "FAIL"
    if not matched:
        all_passed = False
    print(f"[{status}] Query: '{query}' -> Category: '{res['text']}' (Action: '{res['action']}')")

if all_passed:
    print("\nALL 10 TEST CASES PASSED PERFECTLY!")
else:
    print("\nSOME TEST CASES FAILED!")
