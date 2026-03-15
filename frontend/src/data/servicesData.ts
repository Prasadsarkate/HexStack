import { Code2, PenTool, Search, Megaphone, Bot, Cpu, Globe, Rocket, Shield, Zap } from "lucide-react";

export interface ServiceDetail {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  color: string;
  features: { title: string; desc: string; icon: string }[];
  techStack: string[];
  process: { step: string; title: string; desc: string }[];
}

export const servicesData: Record<string, ServiceDetail> = {
  "web-development": {
    slug: "web-development",
    title: "High-Performance Web Development",
    shortDesc: "Scalable, secure, and blazing fast web applications built with modern frameworks.",
    fullDesc: "We don't just build websites; we build engineered digital products. Our web development team focuses on creating high-performance, scalable, and secure applications that provide a seamless user experience across all devices. We specialize in modern stacks like React, Next.js, and Node.js to ensure your business stays ahead of the curve.",
    icon: "Code2",
    color: "from-blue-500 to-cyan-500",
    features: [
      { title: "Custom Architecture", desc: "Tailored infrastructure built for your specific business scalability needs.", icon: "Globe" },
      { title: "Performance First", desc: "Optimized for core web vitals and instantaneous load times.", icon: "Zap" },
      { title: "SEO-Ready", desc: "Semantic HTML and server-side rendering for maximum search visibility.", icon: "Search" },
      { title: "Secure Deployment", desc: "Enterprise-grade security protocols and secure cloud hosting.", icon: "Shield" },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "AWS"],
    process: [
      { step: "01", title: "Discovery", desc: "Aligning project goals with technical requirements." },
      { step: "02", title: "Architecture", desc: "Designing robust and scalable system blueprints." },
      { step: "03", title: "Development", desc: "Agile sprints with regular feedback loops." },
      { step: "04", title: "Deployment", desc: "Cloud optimization and launch monitoring." },
    ]
  },
  "ui-ux-design": {
    slug: "ui-ux-design",
    title: "Human-Centered UI/UX Design",
    shortDesc: "Intuitive and beautiful interfaces designed to delight users and drive conversions.",
    fullDesc: "Design is more than just aesthetics; it's about solving problems. Our UI/UX team combines user research with cutting-edge visual design to create interfaces that are not only stunning but also highly functional. We focus on the user journey, ensuring every click leads to a meaningful interaction.",
    icon: "PenTool",
    color: "from-purple-500 to-pink-500",
    features: [
      { title: "User Research", desc: "Data-driven insights into your users' behaviors and needs.", icon: "Search" },
      { title: "Prototyping", desc: "Interactive wireframes and high-fidelity prototypes.", icon: "Zap" },
      { title: "Visual Design", desc: "Modern, brand-aligned aesthetics for a premium look.", icon: "PenTool" },
      { title: "Usability Testing", desc: "Iterative testing to ensure perfect user interaction.", icon: "Rocket" },
    ],
    techStack: ["Figma", "Adobe CC", "Framer", "Protopie"],
    process: [
      { step: "01", title: "Empathize", desc: "Understanding the user and business challenges." },
      { step: "02", title: "Define", desc: "Mapping user journeys and information architecture." },
      { step: "03", title: "Ideate", desc: "Visual storytelling and prototyping solutions." },
      { step: "04", title: "Validate", desc: "User feedback and design refinement." },
    ]
  },
  "ai-automation": {
    slug: "ai-automation",
    title: "Intelligent AI & Automation",
    shortDesc: "Streamline workflows and unlock efficiency with custom AI integrations.",
    fullDesc: "In the age of AI, staying competitive means working smarter. We build custom AI solutions and automation workflows that eliminate repetitive tasks and provide intelligent insights. From LLM integrations to automated customer support, we help you leverage technology to scale horizontally.",
    icon: "Bot",
    color: "from-indigo-500 to-blue-600",
    features: [
      { title: "LLM Integration", desc: "Custom GPTs and AI agents tailored for your specific data.", icon: "Bot" },
      { title: "Workflow Automation", desc: "Seamless connections between your favorite business tools.", icon: "Zap" },
      { title: "Data Processing", desc: "Automated analysis and reporting for smarter decisions.", icon: "Search" },
      { title: "AI Chatbots", desc: "24/7 intelligent support to handle client inquiries.", icon: "Rocket" },
    ],
    techStack: ["OpenAI API", "Python", "LangChain", "Zapier", "n8n"],
    process: [
      { step: "01", title: "Audit", desc: "Identifying bottlenecks in your current workflows." },
      { step: "02", title: "Strategy", desc: "Mapping AI capabilities to your business goals." },
      { step: "03", title: "Implementation", desc: "Building and training your custom AI tools." },
      { step: "04", title: "Optimization", desc: "Monitoring performance and refining models." },
    ]
  },
  "seo-optimization": {
    slug: "seo-optimization",
    title: "Technical SEO & Growth",
    shortDesc: "Data-driven strategies to improve your visibility and organic rankings.",
    fullDesc: "Getting found is the first step to growth. We combine technical SEO auditing with content strategy and programmatic optimization to ensure your brand dominates the search results. We focus on core web vitals and semantic structure to appease both users and search engines.",
    icon: "Search",
    color: "from-green-500 to-emerald-600",
    features: [
      { title: "Technical Audits", desc: "Identifying and fixing crawl challenges and technical debt.", icon: "Search" },
      { title: "Local SEO", desc: "Dominating local search results for service-based businesses.", icon: "Globe" },
      { title: "Programmatic SEO", desc: "Automated high-scale page generation for broad reach.", icon: "Zap" },
      { title: "Content Strategy", desc: "Authority-building content that ranks and converts.", icon: "PenTool" },
    ],
    techStack: ["Ahrefs", "SEMRush", "Google Search Console", "Screaming Frog"],
    process: [
      { step: "01", title: "Audit", desc: "Deep dive into your current ranking performance." },
      { step: "02", title: "Strategy", desc: "Mapping out high-impact keywords and content silos." },
      { step: "03", title: "Execution", desc: "Technical fixes and programmatic content rollout." },
      { step: "04", title: "Monitoring", desc: "Real-time rank tracking and iterative optimization." },
    ]
  },
  "digital-marketing": {
    slug: "digital-marketing",
    title: "Performance Digital Marketing",
    shortDesc: "Multi-channel campaigns designed to acquire and retain your ideal customers.",
    fullDesc: "Marketing isn't an expense; it's an investment. We build predictable acquisition engines using paid search, social media, and email automation. Our approach is ROI-obsessed, ensuring every dollar spent contributes to your bottom line and scalable growth.",
    icon: "Megaphone",
    color: "from-orange-500 to-red-600",
    features: [
      { title: "Paid Acquisition", desc: "High-ROAS campaigns on Google, Meta, and LinkedIn.", icon: "Megaphone" },
      { title: "Email Funnels", desc: "Automated nurturing sequences to convert leads into fans.", icon: "Zap" },
      { title: "Social Strategy", desc: "Building brand omnipresence on relevant social platforms.", icon: "Globe" },
      { title: "Conversion Tracking", desc: "Deep analytics to understand your true ROI.", icon: "Search" },
    ],
    techStack: ["Meta Ads", "Google Ads", "Klaviyo", "Google Analytics 4"],
    process: [
      { step: "01", title: "Funnel Design", desc: "Mapping the customer journey from awareness to purchase." },
      { step: "02", title: "Ad Setups", desc: "Creating high-converting creatives and laser-targeting." },
      { step: "03", title: "Scaling", desc: "Increasing budget on winning campaigns while cutting waste." },
      { step: "04", title: "Attribution", desc: "Analyzing path-to-purchase for long-term growth." },
    ]
  },
  "custom-software": {
    slug: "custom-software",
    title: "Bespoke Software Engineering",
    shortDesc: "Tailor-made software solutions designed specifically for your unique business needs.",
    fullDesc: "When off-the-shelf software falls short, proprietary engineering is the answer. We act as your fractional CTO and engineering team, building secure, scalable, and entirely custom software suites—from internal admin tools to complex mobile applications.",
    icon: "Cpu",
    color: "from-yellow-400 to-orange-500",
    features: [
      { title: "Admin Portals", desc: "Custom dashboards to manage your entire business operation.", icon: "Cpu" },
      { title: "Mobile Apps", desc: "Cross-platform iOS and Android apps built with React Native.", icon: "Rocket" },
      { title: "Data Pipelines", desc: "Complex integrations between disparate software systems.", icon: "Zap" },
      { title: "Cloud Native", desc: "Serverless infrastructures for infinite scalability.", icon: "Shield" },
    ],
    techStack: ["React Native", "PostgreSQL", "Supabase", "Docker", "Terraform"],
    process: [
      { step: "01", title: "System Audit", desc: "Deep dive into your operational requirements." },
      { step: "02", title: "MVP Build", desc: "Rapid development of core functionality for validation." },
      { step: "03", title: "Full Build", desc: "Iterative sprints to build out the complete software suite." },
      { step: "04", title: "Maintenance", desc: "Proactive monitoring and security updates." },
    ]
  }
};


