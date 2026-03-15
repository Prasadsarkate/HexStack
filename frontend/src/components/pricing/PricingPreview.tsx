"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/forms/Button";

const plans = [
  {
    name: "Startup MVP",
    price: "$10k",
    description: "Launch your product in 4-6 weeks with a robust foundation.",
    features: [
      "Custom UI/UX Design",
      "Next.js / React Frontend",
      "Scalable Backend API",
      "User Authentication",
      "Cloud Deployment",
    ],
    highlight: false,
  },
  {
    name: "Growth Partner",
    price: "Custom",
    description: "Dedicated team for scaling startups and enterprise digital transformation.",
    features: [
      "Dedicated Full-Stack Team",
      "Advanced Architecture Design",
      "SLA Guarantee & 24/7 Support",
      "Continuous Integration/Delivery",
      "AI & Automation Integrations",
    ],
    highlight: true,
  },
];

export function PricingPreview() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="py-24 bg-accent/20 border-y border-border/40 relative overflow-hidden">
      <div className="w-full max-w-[1400px] px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            No hidden fees or surprises. We offer flexible engagement models tailored to your project's scope and scale.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
            <div 
              className="relative w-16 h-8 bg-accent/50 rounded-full p-1 cursor-pointer border border-border/50"
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            >
              <motion.div
                layout
                className="w-6 h-6 bg-primary rounded-full shadow-lg"
                animate={{ x: billingCycle === 'monthly' ? 0 : 32 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Yearly <span className="text-green-500 font-bold ml-1 text-xs">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div
                className={`h-full rounded-3xl border ${
                  plan.highlight
                    ? "border-primary/50 bg-background/80 shadow-[0_0_40px_rgba(59,130,246,0.1)]"
                    : "border-border/50 bg-background/40"
                } p-10 flex flex-col relative overflow-hidden group hover:border-primary/40 transition-colors duration-500`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 py-1.5 px-5 bg-primary text-primary-foreground text-xs font-bold rounded-bl-2xl tracking-widest uppercase">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-3xl font-bold mb-3 tracking-tight">{plan.name}</h3>
                <p className="text-muted-foreground mb-8 text-base leading-relaxed">{plan.description}</p>
                
                <div className="mb-10 flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tighter">
                    {plan.price === "Custom" ? "Custom" : (billingCycle === "yearly" ? `$${parseInt(plan.price.replace('$','').replace('k','')) * 10}k` : plan.price)}
                  </span>
                  <span className="text-muted-foreground font-medium">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                </div>
                
                <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 space-y-4 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className={`w-5 h-5 ${plan.highlight ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                   className={`w-full ${plan.highlight ? "bg-gradient-brand text-white border-0" : ""}`} 
                   variant={plan.highlight ? "primary" : "outline"}
                   size="lg"
                   asChild
                >
                  <Link href="/pricing">
                    View Full Details
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
