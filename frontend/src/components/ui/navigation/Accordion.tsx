"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

export const AccordionItem = ({ title, content, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border border-border/50 rounded-lg overflow-hidden mb-4 bg-background">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-accent/20 transition-colors"
      >
        <span className="font-semibold text-foreground md:text-lg">{title}</span>
        <ChevronDown 
          className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 md:p-6 pt-0 text-muted-foreground leading-relaxed">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Accordion = ({ items }: { items: { title: string; content: string }[] }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="flex flex-col w-full">
      {items.map((item, i) => (
        <AccordionItem 
          key={i} 
          title={item.title} 
          content={item.content} 
          isOpen={openIdx === i} 
          onClick={() => toggle(i)} 
        />
      ))}
    </div>
  );
};
