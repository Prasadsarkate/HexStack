"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Rocket } from "lucide-react";
import { Button } from "@/components/ui/forms/Button";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Process", href: "/process" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Case Studies", href: "/casestudies" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const { user } = useContext(AuthContext);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 gpu-accelerate will-change-[transform,backdrop-filter] ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border/40 shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo (Left) */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all shrink-0">
              H
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              HexStack
            </span>
          </Link>

          {/* Navigation & CTA (Right) */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                
                return (
                  <div
                    key={link.name}
                    className="relative group h-full"
                    onMouseEnter={() => link.hasDropdown && setDropdownOpen(true)}
                    onMouseLeave={() => link.hasDropdown && setDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1.5 py-2 text-sm font-medium transition-colors relative ${
                        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.name}
                      {link.hasDropdown && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isActive ? "text-primary" : ""
                          } ${dropdownOpen ? "rotate-180" : ""}`}
                        />
                      )}
                      
                      {/* Active Indicator Underline */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute left-0 bottom-0 h-[2px] w-full bg-primary"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    {link.hasDropdown && (
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full right-0 lg:left-1/2 lg:-translate-x-1/2 mt-2 w-[280px] p-2 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl z-50 overflow-hidden"
                          >
                            <div className="grid grid-cols-1 gap-1">
                              {[
                                { name: "Web Development", desc: "High-performance apps" },
                                { name: "UI/UX Design", desc: "User-centered interfaces" },
                                { name: "SEO Optimization", desc: "Data-driven rankings" },
                                { name: "Digital Marketing", desc: "Growth & acquisition" },
                                { name: "AI & Automation", desc: "Intelligent workflows" },
                                { name: "Custom Software", desc: "Enterprise solutions" },
                              ].map((service) => (
                                <Link
                                  key={service.name}
                                  href={`/services/${service.name.toLowerCase().replace(/ & |\/| /g, "-")}`}
                                  className="p-3 rounded-xl hover:bg-accent/50 transition-colors group/item block"
                                >
                                  <div className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors">
                                    {service.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-0.5">
                                    {service.desc}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              {!user ? (
                <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Log In
                </Link>
              ) : (
                <Link href={user.role === "admin" ? "/admin/dashboard" : "/client/dashboard"} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  Dashboard
                </Link>
              )}
              {/* CTA Button */}
            <Button
              className="rounded-full px-6 bg-gradient-brand text-white border-0 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] hover:scale-105 transition-all duration-300 flex items-center gap-2 font-medium"
              asChild
            >
              <Link href="/quote">
                Start Project <Rocket className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-foreground p-2 -mr-2 rounded-full hover:bg-accent/50 transition-colors z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay & Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            />
            
            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] max-w-full bg-background border-l border-border/40 shadow-2xl z-50 lg:hidden flex flex-col"
            >
              <div className="p-6 pt-20 flex-1 overflow-y-auto">
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <div key={link.name} className="flex flex-col">
                      <Link
                        href={link.href}
                        className="text-lg font-medium text-foreground py-3 border-b border-border/30 hover:text-primary transition-colors flex justify-between items-center group"
                        onClick={(e) => {
                          if (link.hasDropdown) {
                            e.preventDefault();
                            setDropdownOpen(!dropdownOpen);
                          } else {
                            setMobileMenuOpen(false);
                          }
                        }}
                      >
                        {link.name}
                        {link.hasDropdown ? (
                          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
                        ) : (
                          <span className="text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">→</span>
                        )}
                      </Link>
                      
                      {/* Mobile Dropdown Options */}
                      {link.hasDropdown && (
                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col pl-4 py-2 border-b border-border/30 gap-2">
                                {[
                                  { name: "Web Development" },
                                  { name: "UI/UX Design" },
                                  { name: "SEO Optimization" },
                                  { name: "Digital Marketing" },
                                  { name: "AI & Automation" },
                                  { name: "Custom Software" },
                                ].map((service) => (
                                  <Link
                                    key={service.name}
                                    href={`/services/${service.name.toLowerCase().replace(/ & |\/| /g, "-")}`}
                                    className="py-2 text-muted-foreground hover:text-primary transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {service.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
              
              <div className="p-6 border-t border-border/40 bg-accent/10">
                <Button className="w-full rounded-xl bg-gradient-brand text-white border-0 py-6 text-lg hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(59,130,246,0.4)]" asChild>
                  <Link href="/quote" onClick={() => setMobileMenuOpen(false)}>
                     Start Project <Rocket className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
