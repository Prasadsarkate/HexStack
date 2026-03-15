"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket, ArrowRight, ShieldCheck, Zap, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/forms/Button";
import Link from "next/link";

const steps = [
  {
    id: "01",
    title: "Discovery & Analysis",
    desc: "We dive deep into your business DNA. We identify bottlenecks, audit existing systems, and define clear, measurable objectives for your digital transformation.",
    icon: Search,
    color: "from-blue-500 to-cyan-400",
    details: ["Stakeholder Interviews", "Competitor Analysis", "Technical Audit", "ROI Forecasting"]
  },
  {
    id: "02",
    title: "Strategic Blueprinting",
    desc: "Architecture before construction. We map out the user journey, define the technical stack, and create a comprehensive roadmap that ensures zero-waste development.",
    icon: PenTool,
    color: "from-purple-500 to-pink-400",
    details: ["User Flow Mapping", "Technical Architecture", "Wireframing", "Timeline Definition"]
  },
  {
    id: "03",
    title: "Agile Execution",
    desc: "High-octane development meeting pixel-perfect design. We work in two-week sprints, giving you full visibility into the build through regular demos and feedback loops.",
    icon: Code2,
    color: "from-indigo-500 to-blue-600",
    details: ["Sprint Planning", "Iterative Development", "Quality Assurance", "Weekly Demos"]
  },
  {
    id: "04",
    title: "Precision Launch",
    desc: "Deployment is just the beginning. We perform rigorous load testing and security audits before switching to production, ensuring a flawless first impression.",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
    details: ["Beta Testing", "Performance Tuning", "Security Hardening", "Go-Live Monitoring"]
  },
  {
    id: "05",
    title: "Optimization & Growth",
    desc: "We don't 'launch and leave'. We monitor real-user data to refine features, optimize conversion rates, and plan the next phase of your digital evolution.",
    icon: Zap,
    color: "from-green-500 to-emerald-400",
    details: ["Data Analysis", "CRO Iterations", "Feature Expansion", "Infrastructure Scaling"]
  }
];

export default function ProcessPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Hero */}
      <section className="relative mb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-primary/20 blur-[120px] rounded-full -z-10" />
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            The HexStack <span className="text-transparent bg-clip-text bg-gradient-brand-vibrant animate-gradient-slow drop-shadow-sm">Process</span>
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A battle-tested methodology designed to eliminate risk and deliver predictable, high-impact digital results for every project.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative w-full max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Vertical Line for Desktop */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent -translate-x-1/2" />

        <div className="space-y-32 relative">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${isEven ? "" : "lg:flex-row-reverse"}`}
              >
                {/* Content */}
                <div className="flex-1 w-full text-center lg:text-left">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-6 glow-primary mx-auto lg:mx-0`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center lg:justify-start gap-4">
                    <span className="text-foreground/20 font-black">{step.id}</span>
                    {step.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {step.desc}
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    {step.details.map((detail) => (
                      <span key={detail} className="px-4 py-2 rounded-full glass border border-white/5 text-sm font-medium">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Point on Line */}
                <div className="hidden lg:flex items-center justify-center relative z-10 w-12 h-12 rounded-full bg-background border-4 border-primary shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                   <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                </div>

                {/* Visual Placeholder */}
                <div className="flex-1 w-full">
                   <div className="aspect-video rounded-[2.5rem] glass border border-white/10 p-8 flex items-center justify-center relative overflow-hidden group">
                      <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${step.color}`} />
                      <step.icon className="w-32 h-32 text-foreground/5 group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute bottom-8 right-8 text-primary opacity-50 font-mono text-sm uppercase tracking-widest">HexStack Methodology</div>
                   </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Professional Trust Section */}
      <section className="mt-48 w-full max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="p-12 md:p-24 rounded-[4rem] glass border border-white/5 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-bold mb-8 relative z-10">Reliability is our <span className="text-primary italic">Priority.</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 relative z-10">
            We don't just deliver code; we deliver peace of mind through a transparent, high-standard engineering process.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
             <div className="space-y-4">
                <ShieldCheck className="w-12 h-12 text-primary mx-auto" />
                <h4 className="text-xl font-bold italic">Zero-Leak Security</h4>
                <p className="text-muted-foreground">Every line of code undergoes automated security checks.</p>
             </div>
             <div className="space-y-4">
                <HeartHandshake className="w-12 h-12 text-secondary mx-auto" />
                <h4 className="text-xl font-bold italic">True Partnership</h4>
                <p className="text-muted-foreground">We act as an extension of your own internal core team.</p>
             </div>
             <div className="space-y-4">
                <Zap className="w-12 h-12 text-blue-400 mx-auto" />
                <h4 className="text-xl font-bold italic">Blazing Performance</h4>
                <p className="text-muted-foreground">Speed is a feature. We optimize for sub-second load times.</p>
             </div>
          </div>
          <div className="mt-16 pt-16 border-t border-white/5 relative z-10">
             <Button size="lg" className="rounded-full px-12 bg-gradient-brand border-0 glow-primary group" asChild>
                <Link href="/quote">
                   Design Your Roadmap <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
             </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
