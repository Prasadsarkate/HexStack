"use client";

import { Button } from "@/components/ui/forms/Button";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-24 relative overflow-hidden text-center bg-accent/20">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">extraordinary.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10">
            Whether you have a fully formed RFP or just an idea napkin, our technical experts are ready to advise you.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-6xl mx-auto w-full px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div className="space-y-12">
               <div>
                 <h2 className="text-3xl font-bold tracking-tight mb-4">Get in Touch</h2>
                 <p className="text-muted-foreground text-lg">
                   Reach out to our sales team directly, and we aim to respond within 24 hours.
                 </p>
               </div>
               
               <div className="space-y-6">
                 <div className="flex items-center gap-6 p-6 rounded-2xl border border-border/50 bg-accent/10 glass">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email Us</h4>
                      <p className="text-muted-foreground">hexstack1@gmail.com</p>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-6 p-6 rounded-2xl border border-border/50 bg-accent/10 glass">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-secondary shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Call Us</h4>
                      <p className="text-muted-foreground">+91 9918309983</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-6 p-6 rounded-2xl border border-border/50 bg-accent/10 glass">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Headquarters</h4>
                      <p className="text-muted-foreground">C-116, Sector-2, Noida, Uttar Pradesh – 201301, India</p>
                    </div>
                 </div>
               </div>
            </div>

            {/* Form */}
            <div className="bg-background border border-border/50 p-8 rounded-3xl shadow-xl glass relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
               <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
               <form className="space-y-6 relative z-10" action="https://formsubmit.co/hexstack1@gmail.com" method="POST">
                  {/* Spam Protection & Redirect config for FormSubmit */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New Project Inquiry - HexStack" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-medium text-muted-foreground">First Name</label>
                       <input type="text" name="First Name" required className="w-full bg-accent/30 border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                       <input type="text" name="Last Name" required className="w-full bg-accent/30 border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-sm font-medium text-muted-foreground">Work Email</label>
                     <input type="email" name="Email" required className="w-full bg-accent/30 border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="john@company.com" />
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-sm font-medium text-muted-foreground">Project Details</label>
                     <textarea name="Project Details" required rows={4} className="w-full bg-accent/30 border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" placeholder="Tell us about your timeline, budget, and goals..." />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-gradient-brand border-0">Submit Inquiry</Button>
               </form>
            </div>
            
          </div>
      </section>
    </div>
  );
}
