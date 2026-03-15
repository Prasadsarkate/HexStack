"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  PenTool, 
  Search, 
  Megaphone, 
  Bot, 
  Cpu, 
  Globe, 
  Zap, 
  Shield, 
  Rocket as RocketIcon 
} from "lucide-react";
import { Button } from "@/components/ui/forms/Button";
import Link from "next/link";
import { ServiceDetail } from "@/data/servicesData";

const iconMap: Record<string, any> = {
  Code2,
  PenTool,
  Search,
  Megaphone,
  Bot,
  Cpu,
  Globe,
  Zap,
  Shield,
  Rocket: RocketIcon,
};

function IconResolver({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] || HelpCircle;
  return <Icon className={className} />;
}

import { HelpCircle } from "lucide-react";

export function ServiceDetailView({ service }: { service: ServiceDetail }) {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 glow-primary`}>
              <IconResolver name={service.icon} className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {service.fullDesc}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-brand border-0 glow-primary" asChild>
                <Link href="/quote">Get Started <RocketIcon className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/portfolio">View Recent Work</Link>
              </Button>
            </div>
          </motion.div>
          {/* ... Rest of component ... */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden glass border border-white/10 p-8 flex flex-col justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
            <h3 className="text-2xl font-bold mb-8 relative z-10">Tech Stack & Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
              {service.techStack.map((tech) => (
                <div key={tech} className="p-4 rounded-xl bg-background/50 border border-white/5 text-center font-medium hover:border-primary/50 transition-colors">
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold mb-12 text-center">Core Pillars of Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl glass border border-white/5 hover:border-primary/30 transition-all group"
              >
                <IconResolver name={feature.icon} className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="p-12 md:p-20 rounded-[3rem] bg-accent/20 border border-white/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
           <h2 className="text-3xl font-bold mb-16 relative z-10">The HexStack Delivery Method</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {service.process.map((step, i) => (
                <div key={i} className="relative">
                  <span className="text-6xl font-black text-white/5 block mb-4">{step.step}</span>
                  <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                  <p className="text-muted-foreground">{step.desc}</p>
                  {i < 3 && <div className="hidden lg:block absolute top-10 -right-6 w-12 h-[2px] bg-gradient-to-r from-primary/30 to-transparent" />}
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

