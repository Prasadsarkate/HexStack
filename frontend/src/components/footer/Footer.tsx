"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Github, Twitter, Linkedin, Dribbble } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background pt-12 pb-8">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-12">
          
          {/* Brand & Contact */}
          <div className="flex-1 max-w-sm flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center text-white font-bold text-xl">
                H
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                HexStack
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We build premium digital experiences for tech-forward startups and modern enterprises globally. We act as your technical co-founder.
            </p>
            
            <div className="flex flex-col space-y-2 pt-2 text-sm text-muted-foreground">
              <a href="mailto:hexstack1@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors w-fit">
                <Mail className="w-4 h-4" /> hexstack1@gmail.com
              </a>
              <a href="tel:+919918309983" className="flex items-center gap-2 hover:text-primary transition-colors w-fit">
                <Phone className="w-4 h-4" /> +91 9918309983
              </a>
            </div>

            <div className="flex gap-4 pt-2">
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="GitHub" className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-primary transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Dribbble" className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-primary transition-colors">
                <Dribbble className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Column 1: Company */}
            <div className="flex flex-col space-y-3">
              <h4 className="font-semibold text-foreground mb-1">Company</h4>
              {[
                { name: "About", href: "/about" },
                { name: "Our Process", href: "/process" },
                { name: "Testimonials", href: "/testimonials" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Column 2: Services */}
            <div className="flex flex-col space-y-3">
              <h4 className="font-semibold text-foreground mb-1">Services</h4>
              {[
                "Web Development",
                "UI/UX Design",
                "AI & Automation",
                "SEO Optimization",
                "Custom Software"
              ].map((item) => (
                <Link
                  key={item}
                  href={`/services/${item.toLowerCase().replace(/ & |\/| /g, "-")}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Column 3: Resources */}
            <div className="flex flex-col space-y-3">
              <h4 className="font-semibold text-foreground mb-1">Resources</h4>
              {[
                { name: "Case Studies", href: "/casestudies" },
                { name: "Guides", href: "/blog" },
                { name: "FAQ", href: "/faq" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} HexStack Digital Agency. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/legal/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-foreground transition-colors">Terms and Conditions</Link>
            <Link href="/legal/refund" className="hover:text-foreground transition-colors">Refund Policy</Link>
            <Link href="/legal/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
