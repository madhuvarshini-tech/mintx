import { NextResponse } from "next/server";

// Comprehensive verified MintX Solutions knowledge base
const MINTX_KNOWLEDGE = `
You are the MintX AI Assistant, a friendly, intelligent, and professional representative of MintX Solutions.
MintX Solutions is an independent digital atelier based in Salem, Tamil Nadu, India.
We engineer high-performance websites, custom web applications, mobile apps, and data-driven digital marketing.

Core Company Information:
- Location / Headquarters: Salem, Tamil Nadu, India.
- Email: mintxsolution@gmail.com
- Telephone / WhatsApp: +91 94870 58025
- Instagram: @mintxsolutions (https://www.instagram.com/mintxsolutions)
- Target Areas: Salem, Coimbatore, Pollachi, Dharapuram, and clients across India & globally.

Services:
1. Website Development:
   - Custom, responsive, lightning-fast web platforms engineered for business conversion.
   - Built with modern zero-bloat tech, strict on-page SEO, semantic HTML, mobile-first design, and sub-second load times.
2. E-commerce Development:
   - High-converting online stores with streamlined catalogs, secure payment gateway integrations (Razorpay, Stripe, etc.), automated checkout, and inventory tracking.
3. Mobile App Development:
   - Native & cross-platform mobile apps for iOS and Android (Flutter, React Native).
   - Low-latency cloud backends, offline sync capabilities, and touch-optimized UI.
4. Digital Marketing & SEO:
   - Technical SEO, local search dominance, high-ROI paid media campaigns, content strategy, and conversion rate optimization (CRO).
5. MintXQR (Flagship Product):
   - Digital menu and QR code contact-free ordering ecosystem for restaurants, cafes, and hotels.
   - Live menu updates, table-specific QR generation, direct smartphone ordering, and multi-tier subscription plans. URL: https://mintxqr.site

Process (5 Steps):
1. Discover: Deep-dive into business goals and commercial landscape.
2. Define: Technical specs, architecture, and user milestones.
3. Design: Bespoke UI with typographic hierarchy and micro-motion.
4. Develop: Scalable, clean code and modern APIs.
5. Deliver: Rigorous testing, SEO indexing, and cloud deployment.

Verified Portfolio Projects:
- Roadminded Safety Solutions (https://www.roadmindedsafetysolutions.com/)
- Suriyan Global (https://www.suriyanglobal.com/)
- Feathers Consultancy (https://www.feathersconsultancy.in/)
- Sky Harbor Export (https://skyharborexport.vercel.app/)
- Terragrox Global (https://www.terragroxglobal.com/)
- Anjar Foods (https://www.anjarfoods.com/)
- Scallops Fincorp (https://www.scallopsfincorp.com/)
- Anaimalai Nature Safari (https://www.anaimalainaturesafari.in/)
- Alpha Tax Consultant (http://alphatax.in/)
- Freelancemaker (https://www.freelancemaker.in/)
- Ezhil Construction (https://ezhilconstruction.vercel.app/)
- Black Sea Education (https://blackseaeducation.com/)
- Ooty Travel Solutions (https://ootytravelsolutions.vercel.app/)
- Kenxe Car Wash (https://kenxe.vercel.app/)
- Vihar Organics (https://viharorganics.vercel.app/)
- Anicham Events (https://www.anichamevents.com/)
- LA TECH Rebar Solutions (https://latechrebarsolutions.com)
- Prism Land Surveyors (https://www.prismlandsurveyors.in)
- Sri Gokulam Global Exim (https://srigokulamglobalexim.vercel.app)
- Rate 2 Gold Financial Service (https://r2goldfinancialservice.vercel.app)
- Sree Sai Construction (https://sreesaiconstructions.vercel.app)

Pricing & Quotations:
- Websites and apps vary based on specific scope, features, and timeline (typically starting from basic business sites to advanced custom web platforms).
- When asked for pricing, politely explain that costs depend on exact business requirements, suggest discussing specific needs, and provide a direct link to Start a Project (contact.html) or WhatsApp (+91 94870 58025) for a tailored quotation.

Behavior Rules:
- Answer warmly, clearly, and concisely in professional English.
- Use bullet points when presenting services or project lists.
- Make portfolio project URLs clickable markdown links.
- Ask friendly follow-up questions when a customer expresses interest in a project or quote.
- Direct users to the contact form (/contact.html) or direct WhatsApp chat (https://wa.me/919487058025).
- NEVER invent prices, client names, guarantees, or company policies not stated here.
- If information is not known, politely say so and provide the direct contact details.
- If asked unrelated topics, politely redirect back to MintX Solutions services.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY;

    // 1. If OpenAI key is present
    if (process.env.OPENAI_API_KEY) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          messages: [
            { role: "system", content: MINTX_KNOWLEDGE },
            ...messages.slice(-8), // Keep conversation history
          ],
          temperature: 0.6,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("OpenAI error:", errorData);
        throw new Error("OpenAI API call failed");
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Thank you for reaching out! How else can I assist you today?";
      return NextResponse.json({ reply, mode: "live_ai" });
    }

    // 2. If Groq key is present
    if (process.env.GROQ_API_KEY) {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: MINTX_KNOWLEDGE },
            ...messages.slice(-8),
          ],
          temperature: 0.6,
          max_tokens: 500,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "How else can MintX Solutions assist you?";
        return NextResponse.json({ reply, mode: "live_ai" });
      }
    }

    // 3. Fallback: Smart Knowledge-Engine when API key is not configured in .env
    const latestUserMsg = messages[messages.length - 1]?.content || "";
    const reply = generateKnowledgeFallback(latestUserMsg);

    return NextResponse.json({
      reply,
      mode: "verified_knowledge",
      setupNote: "To enable live LLM generation, add OPENAI_API_KEY or GROQ_API_KEY to .env.local",
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply: "I encountered a momentary connection issue. You can reach our team directly at [mintxsolution@gmail.com](mailto:mintxsolution@gmail.com) or WhatsApp at [+91 94870 58025](https://wa.me/919487058025).",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Intelligent company QA fallback engine based on exact verified MintX knowledge
function generateKnowledgeFallback(query: string): string {
  const q = query.toLowerCase();

  // 1. WhatsApp / Direct Call
  if (q.includes("whatsapp") || q.includes("talk to engineer") || q.includes("human") || q.includes("speak with") || q.includes("call me")) {
    return `You can connect directly with our engineering and project leadership right now on WhatsApp or via a direct call:\n\n• **Direct Line & WhatsApp**: [+91 94870 58025](https://wa.me/919487058025)\n• **Email**: [mintxsolution@gmail.com](mailto:mintxsolution@gmail.com)\n\nWe respond to project inquiries typically within a few minutes!`;
  }

  // 2. Pricing & Cost Quotations
  if (q.includes("cost") || q.includes("price") || q.includes("quote") || q.includes("how much") || q.includes("budget") || q.includes("rate") || q.includes("charges") || q.includes("estimate") || q.includes("fee")) {
    return `The cost depends on your requirements, features, and business goals. I can help you estimate the project cost. Are you looking for a business website, an e-commerce store, or a custom web application?\n\nWe provide **free consultations and written proposals within 2 hours**. Connect with our lead engineers on WhatsApp or submit a quick project brief via our [Contact page](contact.html)!`;
  }

  // 3. Project Timelines & Turnaround
  if (q.includes("timeline") || q.includes("duration") || q.includes("how long") || q.includes("turnaround") || q.includes("requirements") || q.includes("deadline")) {
    return `Project delivery timelines at MintX Solutions are transparent and structured:\n\n• **Standard Business Websites**: Typically 1 to 2 weeks\n• **E-Commerce & Custom Web Platforms**: 2 to 4 weeks structured in weekly staging milestones\n• **Mobile Applications**: 3 to 6 weeks including App Store and Google Play reviews\n\n**What we need from you to begin:**\n1. Brief description of your business and goals\n2. Key features or reference websites you admire\n3. Brand assets (logo, colors, content if available)\n\nWe provide weekly staging links so you can interact with live progress before launch!`;
  }

  // 4. E-Commerce Development Specific
  if (q.includes("ecommerce") || q.includes("e-commerce") || q.includes("store") || q.includes("shop") || q.includes("payment gateway") || q.includes("razorpay") || q.includes("stripe")) {
    return `We engineer custom, high-converting **E-Commerce Storefronts**:\n\n• **Sub-Second Speed**: Optimized catalog browsing with fast checkout\n• **Payment Gateways**: Integrated with Razorpay, Stripe, and UPI\n• **Automated Inventory**: Real-time stock sync and order tracking\n• **100% Code Ownership**: Zero recurring percentage commissions\n\nConnect with our team on WhatsApp at [+91 94870 58025](https://wa.me/919487058025) or submit your scope on our [Contact page](contact.html)!`;
  }

  // 5. Mobile App Development Specific
  if (q.includes("mobile app") || q.includes("app development") || q.includes("flutter") || q.includes("react native") || q.includes("ios") || q.includes("android")) {
    return `At MintX Solutions, we craft native-grade **Mobile Applications** for iOS and Android:\n\n• **Unified Codebase**: Built using Flutter and React Native for unified iOS & Android delivery\n• **Touch-Optimized UX**: Fluid 60fps micro-animations and offline data sync\n• **Full Store Launch**: Complete handling of Apple App Store and Google Play publication\n\nTell us about your app vision or request an architecture plan via our [Contact page](contact.html)!`;
  }

  // 6. Portfolio & Featured Case Studies
  if (q.includes("project") || q.includes("portfolio") || q.includes("work") || q.includes("previous") || q.includes("client")) {
    return `We have engineered web platforms for commercial clients across India! Here are a few featured projects:\n\n• [LA TECH Rebar Solutions](https://latechrebarsolutions.com)\n• [Prism Land Surveyors](https://www.prismlandsurveyors.in)\n• [Sri Gokulam Global Exim](https://srigokulamglobalexim.vercel.app)\n• [Rate 2 Gold Financial Service](https://r2goldfinancialservice.vercel.app)\n• [Ezhil Construction](https://ezhilconstruction.vercel.app/)\n• [Ooty Travel Solutions](https://ootytravelsolutions.vercel.app/)\n\nExplore our full portfolio on our [Selected Work page](work.html).`;
  }

  // 7. UI/UX & Web Design Specific
  if (q.includes("ui/ux") || q.includes("ui") || q.includes("ux") || q.includes("web design") || q.includes("wireframe") || q.includes("prototype") || q.includes("design system")) {
    return `At MintX Solutions, our **UI/UX and Web Design** team crafts bespoke digital experiences:\n\n• **Custom UI Design Systems**: Distinctive visual identities that elevate brand trust\n• **Conversion Wireframing**: User-journey mapping optimized to reduce friction and bounce rates\n• **Micro-Animations**: Fluid 60fps interactions that make interfaces feel responsive and premium\n• **Responsive Prototyping**: Pixel-perfect layout across desktop, tablet, and mobile devices\n\nWould you like to discuss a design direction or review our wireframing workflow?`;
  }

  // 8. General Services Overview & Website Development
  if (q.includes("service") || q.includes("offer") || q.includes("what do you do") || q.includes("capabilities") || q.includes("web development") || q.includes("website")) {
    return `Hi! Welcome to MintX Solutions. We help businesses grow with professional digital solutions.\n\nOur services include:\n• Website Design & Development\n• E-commerce Development\n• Mobile App Development\n• UI/UX Design\n• Digital Marketing\n• MintxQR Solutions\n\nWhat type of project are you planning?`;
  }

  // 8. Technology Stack
  if (q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("framework")) {
    return `Our core engineering stack is chosen for maximum runtime speed, security, and zero bloat:\n\n• **Frontend**: Modern TypeScript, React, Next.js, semantic HTML5, and Vanilla CSS / Tailwind.\n• **Mobile**: Flutter and React Native for unified iOS & Android.\n• **Backend & APIs**: Node.js, Python, PostgreSQL, Supabase, and Serverless Edge functions.\n• **Hosting & Cloud**: Vercel, AWS, and Cloudflare CDN.\n• **Audit Benchmark**: 95+ Google Lighthouse scores across all client deliveries.`;
  }

  // 9. Contact Details
  if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("location") || q.includes("where") || q.includes("address") || q.includes("salem") || q.includes("reach")) {
    return `You can connect with the **MintX Solutions** team directly through:\n\n• **Location**: Salem, Tamil Nadu, India\n• **WhatsApp Direct**: [+91 94870 58025](https://wa.me/919487058025)\n• **Email**: [mintxsolution@gmail.com](mailto:mintxsolution@gmail.com)\n• **Instagram**: [@mintxsolutions](https://www.instagram.com/mintxsolutions)\n\nOr submit a project brief anytime via our [Contact Page](contact.html).`;
  }

  // 10. MintxQR Platform
  if (q.includes("qr") || q.includes("menu") || q.includes("restaurant") || q.includes("hotel") || q.includes("mintxqr")) {
    return `**MintXQR** is our flagship contactless digital menu and ordering platform for restaurants, cafes, and hotels.\n\n• **Real-time Menu Management**: Update prices and items instantly from your phone or dashboard.\n• **Table QR Codes**: Unique codes for each table so customers can view the menu on their smartphones.\n• **Ordering Efficiency**: Speeds up service and eliminates outdated paper menus.\n\nVisit [mintxqr.site](https://mintxqr.site) to learn more or request a live demo!`;
  }

  // 11. Engineering Process
  if (q.includes("process") || q.includes("how it works") || q.includes("step") || q.includes("workflow")) {
    return `Our 5-step engineering process ensures exceptional quality:\n\n1. **Discover**: Analyze your business goals and market.\n2. **Define**: Establish architecture, specs, and milestones.\n3. **Design**: Create bespoke UI prototypes and design systems.\n4. **Develop**: High-speed, secure, zero-bloat coding.\n5. **Deliver**: Sub-second performance audits, SEO setup, and cloud launch.\n\nRead more details on our [Process page](process.html).`;
  }

  // 12. Careers
  if (q.includes("career") || q.includes("hiring") || q.includes("job") || q.includes("intern")) {
    return `We offer high-growth internships and roles in Salem, TN including Project Coordinator, AI Developer, App Developer, and UI/UX roles. Check out our open positions on our [Careers page](careers.html)!`;
  }

  return `I am the **MintX AI Assistant**, specialized in assisting you with **MintX Solutions services**, website & mobile app development, e-commerce, MintxQR, and digital projects.\n\nHow can our engineering team in Salem assist you with your digital project today? Feel free to ask about our services, projects, or [Contact our Salem team directly](contact.html)!`;
}
