"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Send, Sparkles, Code2, PenTool, Bot, Search, Megaphone, Cpu } from "lucide-react";
import { Button } from "@/components/ui/forms/Button";
import Link from "next/link";

const steps = [
  {
    id: 1,
    title: "Project Category",
    subtitle: "What kind of masterpiece are we building?",
    options: [
      { id: "web", label: "Web development", icon: Code2 },
      { id: "design", label: "UI/UX Design", icon: PenTool },
      { id: "ai", label: "AI & Automation", icon: Bot },
      { id: "seo", label: "SEO Optimization", icon: Search },
      { id: "marketing", label: "Digital Marketing", icon: Megaphone },
      { id: "custom", label: "Custom Software", icon: Cpu },
    ]
  },
  {
    id: 2,
    title: "Budget Range",
    subtitle: "Help us align with your investment goals.",
    options: [
      { id: "low", label: "$2,000 - $5,000" },
      { id: "mid", label: "$5,000 - $15,000" },
      { id: "high", label: "$15,000 - $50,000" },
      { id: "custom", label: "$50,000+" },
    ]
  },
  {
    id: 3,
    title: "Target Timeline",
    subtitle: "When do you want to see results?",
    options: [
      { id: "fast", label: "1 - 2 Months" },
      { id: "normal", label: "3 - 4 Months" },
      { id: "long", label: "6+ Months" },
      { id: "tbd", label: "TBD / Ongoing" },
    ]
  }
];

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    category: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
    if (currentStep < 3) setCurrentStep(currentStep + 1);
    else setCurrentStep(4);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const progress = (currentStep / 4) * 100;

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-12 glass rounded-[3rem] border border-white/10 max-w-xl mx-auto shadow-2xl"
        >
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Check className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Request Received!</h1>
          <p className="text-muted-foreground mb-10 leading-relaxed text-lg">
            Thanks for reaching out, {formData.name.split(' ')[0]}. Our strategy team will review your {formData.category.toLowerCase()} requirements and get back to you within 24 hours.
          </p>
          <Button size="lg" className="bg-gradient-brand border-0 glow-primary rounded-full px-12" asChild>
            <Link href="/">Back to Dashboard</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center">
      <div className="w-full max-w-4xl px-4 md:px-6">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4 text-sm font-medium text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-accent/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-brand"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep <= 3 ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  {steps[currentStep - 1].title}
                </h2>
                <p className="text-xl text-muted-foreground">
                  {steps[currentStep - 1].subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {steps[currentStep - 1].options.map((option: any) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(
                      currentStep === 1 ? "category" : currentStep === 2 ? "budget" : "timeline",
                      option.label
                    )}
                    className="p-8 rounded-[2rem] glass border border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all text-left group flex flex-col h-full shadow-lg"
                  >
                    {option.icon && <option.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />}
                    <span className="text-lg font-bold group-hover:text-primary transition-colors">{option.label}</span>
                    <div className="mt-auto pt-6 flex justify-end">
                       <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="w-4 h-4" />
                       </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {currentStep > 1 && (
                <button 
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mx-auto pt-8"
                >
                  <ArrowLeft className="w-4 h-4" /> Go Back
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="final-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto glass p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl"
            >
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-gradient-brand rounded-2xl flex items-center justify-center text-white mx-auto mb-6 glow-primary">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Final Details</h2>
                <p className="text-muted-foreground">Almost there! Tell us how to contact you.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-2">Your Name</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full bg-background/50 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-2">Email Address</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full bg-background/50 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-2">Project Brief (Optional)</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us a bit more about your goals..."
                    className="w-full bg-background/50 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
                  />
                </div>
                <div className="pt-6 flex flex-col gap-4">
                  <Button type="submit" size="lg" className="w-full bg-gradient-brand border-0 py-8 text-xl rounded-2xl glow-primary">
                    Request Strategy Call <Send className="ml-2 w-5 h-5" />
                  </Button>
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                   I need to change my project details
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
