"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/forms/Button";

const projects = [
  {
    title: "Aionix Data",
    category: "Corporate Website",
    description: "A modern, high-performance web presence for an innovative data infrastructure company.",
    image: "https://dc619.4shared.com/img/136Q4xAujq/s24/19ce8683770/Screenshot_2026-03-13_234233?async&rand=0.9888910650547473",
    link: "https://aionixdata.com/"
  },
  {
    title: "3rd AI",
    category: "AI Platform",
    description: "Cutting-edge artificial intelligence and machine learning solutions platform.",
    image: "https://dc619.4shared.com/img/z0s74DE0fa/s24/19ce8682fa0/Screenshot_2026-03-13_234152?async&rand=0.8033441588668275",
    link: "https://3rdai.co/"
  },
  {
    title: "Hexacore Classes",
    category: "EdTech Platform",
    description: "An elegant educational platform designed for modern student engagement.",
    image: "https://dc619.4shared.com/img/EoTGEW3Dge/s24/19ce8682000/Screenshot_2026-03-13_234055?async&rand=0.9919156636133657",
    link: "https://hexacoreclasses.in/"
  },
  {
    title: "Shivkrupa Earthmovers",
    category: "Industrial Portal",
    description: "A robust digital storefront for heavy machinery and earthmoving equipment.",
    image: "https://dc619.4shared.com/img/DbcdRzaXfa/s24/19ce8683f40/Screenshot_2026-03-13_234249?async&rand=0.7773285000526663",
    link: "https://shivkrupaearthmovers.vercel.app/"
  }
];

export function PortfolioPreview() {
  return (
    <section className="py-24 bg-accent/20 border-y border-border/40">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Work</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore some of our recent projects where we turned complex problems into elegant, scalable solutions.
            </p>
          </div>
          <Button variant="outline" className="shrink-0" asChild>
            <Link href="/portfolio">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative rounded-2xl overflow-hidden border border-border/50 bg-background block"
            >
              {/* Image Preview */}
              <div className="w-full h-[240px] relative overflow-hidden bg-accent/20">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">{project.category}</p>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-300">
                     <ExternalLink className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">{project.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
