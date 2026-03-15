"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/forms/Button";
import Link from "next/link";
import { BlogPost } from "@/data/blogData";

export function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <article className="min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="w-full max-w-[900px] mx-auto px-4 md:px-6">
        {/* Back Link */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="mb-12"
        >
          <Link href="/blog" className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>
        </motion.div>

        {/* Header */}
        <header className="mb-16">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex items-center gap-4 mb-6"
          >
             <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest">{post.category}</span>
             <span className="text-muted-foreground text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {post.readTime}
             </span>
          </motion.div>
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-[1.1]"
          >
            {post.title}
          </motion.h1>
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-border/40"
          >
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center border border-white/5">
                   <User className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                   <p className="text-sm font-bold">{post.author}</p>
                   <p className="text-xs text-muted-foreground">Expert Contributor</p>
                </div>
             </div>
             <div className="flex items-center gap-6 text-muted-foreground text-sm">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
                <div className="flex items-center gap-3">
                   <button aria-label="Share article" className="hover:text-primary transition-colors"><Share2 className="w-4 h-4" /></button>
                   <button aria-label="Bookmark article" className="hover:text-primary transition-colors"><Bookmark className="w-4 h-4" /></button>
                </div>
             </div>
          </motion.div>
        </header>

        {/* Hero Image */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.3 }}
           className="aspect-video w-full rounded-[2.5rem] bg-accent/5 border border-white/5 mb-16 relative overflow-hidden group"
        >
           {post.image ? (
             <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
           ) : (
             <>
               <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
               <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                  <span className="text-7xl font-black text-white/5 uppercase tracking-[0.2em]">{post.category}</span>
               </div>
             </>
           )}
        </motion.div>

        {/* Content Area */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4 }}
           className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tighter prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-li:text-muted-foreground"
        >
           {/* In a real app we'd use a markdown parser here, for now we render as-is with basic styling */}
           <div className="space-y-8 text-xl leading-relaxed">
             {post.content.split('\n').map((line, i) => {
               if (line.trim().startsWith('###')) {
                 return <h2 key={i} className="text-3xl font-bold text-foreground mt-12 mb-6">{line.replace('###', '').trim()}</h2>;
               }
               const trimmed = line.trim();
               if (trimmed.startsWith('1.') || trimmed.startsWith('2.') || trimmed.startsWith('3.')) {
                  return (
                    <ol key={i} className="list-decimal list-inside space-y-2">
                       <li className="text-muted-foreground">{trimmed.substring(trimmed.indexOf(' ') + 1)}</li>
                    </ol>
                  );
               }
               if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
                 return (
                   <ul key={i} className="list-disc list-inside space-y-2">
                      <li className="text-muted-foreground">{trimmed.substring(1).trim()}</li>
                   </ul>
                 );
               }
               if (trimmed.length > 0) {
                 return <p key={i} className="text-muted-foreground/90">{trimmed}</p>;
               }
               return null;
             })}
           </div>
        </motion.div>

        {/* Bottom Bar */}
        <footer className="mt-24 pt-12 border-t border-border/40">
           <div className="p-12 rounded-[2.5rem] bg-accent/20 border border-white/5 text-center">
              <h3 className="text-2xl font-bold mb-4">Want more insights like this?</h3>
              <p className="text-muted-foreground mb-8">Join 5,000+ tech leaders receiving our weekly engineering digest.</p>
              <div className="flex max-w-md mx-auto gap-4">
                 <input className="flex-1 bg-background border border-border/50 rounded-xl px-4 focus:ring-2 focus:ring-primary/50 outline-none" placeholder="Enter your email" />
                 <Button className="bg-gradient-brand border-0">Subscribe</Button>
              </div>
           </div>
        </footer>
      </div>
    </article>
  );
}
