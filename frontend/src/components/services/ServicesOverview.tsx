"use client";

import { motion } from "framer-motion";
import { Code2, PenTool, Search, Megaphone, Bot, Cpu } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/layout/Card";
import Link from "next/link";

const services = [
  {
    title: "Web Development",
    description: "High-performance websites and web applications built with modern frameworks.",
    iconId: "Code2",
    color: "text-blue-500",
  },
  {
    title: "UI/UX Design",
    description: "Intuitive, user-centered designs that drive engagement and conversions.",
    iconId: "PenTool",
    color: "text-purple-500",
  },
  {
    title: "SEO Optimization",
    description: "Data-driven strategies to improve your visibility and organic rankings.",
    iconId: "Search",
    color: "text-green-500",
  },
  {
    title: "Digital Marketing",
    description: "Multi-channel campaigns designed to acquire and retain your ideal customers.",
    iconId: "Megaphone",
    color: "text-orange-500",
  },
  {
    title: "AI & Automation",
    description: "Streamlined business processes and intelligent integrations to save you time.",
    iconId: "Bot",
    color: "text-pink-500",
  },
  {
    title: "Custom Software",
    description: "Tailor-made software solutions designed specifically for your unique business needs.",
    iconId: "Cpu",
    color: "text-yellow-500",
  },
];

const iconMap: Record<string, any> = {
  Code2,
  PenTool,
  Search,
  Megaphone,
  Bot,
  Cpu,
};

export function ServicesOverview() {
  return (
    <section className="py-24 relative">
      <div className="w-full max-w-[1400px] px-4 md:px-6">
        <div className="w-full max-w-[1400px] mx-auto text-center mb-16 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            End-to-End <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Digital Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We provide a comprehensive suite of services to help your business thrive in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/services/${service.title.toLowerCase().replace(/ & |\/| /g, "-")}`}>
                <Card className="h-full flex flex-col group cursor-pointer glass hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-primary to-transparent pointer-events-none`} />
                  
                  <CardHeader className="relative z-10">
                    <div className={`w-12 h-12 rounded-lg bg-background/50 border border-border/50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform ${service.color}`}>
                      {(() => {
                        const Icon = iconMap[service.iconId];
                        return Icon ? <Icon className="w-6 h-6" /> : null;
                      })()}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 relative z-10">
                    <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
