import { FinalCTA } from "@/components/cta/FinalCTA";
import Link from "next/link";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogData";

export default function BlogPage() {
  const posts = Object.values(blogPosts);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-40 pb-20 text-center bg-accent/10 border-b border-border/40 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-primary/10 blur-[100px] rounded-full -z-10" />
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-brand-vibrant animate-gradient-slow drop-shadow-sm">Thoughts</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Exploring the intersection of software engineering, strategic design, and digital growth to build the future of tech.
          </p>
        </div>
      </section>
      
      <section className="py-24">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 max-w-[1200px]">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <div key={post.slug} className="group flex flex-col h-full bg-background border border-border/50 rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                  <div className="h-56 w-full relative overflow-hidden flex items-center justify-center group">
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-accent/10 flex items-center justify-center p-8">
                        <span className="text-6xl font-black text-white/5 uppercase tracking-widest group-hover:scale-110 transition-transform duration-700">{post.category}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                     <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 font-medium">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 border border-white/5">{post.category}</span>
                        <div className="flex items-center gap-4">
                           <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date.split(',')[0]}</span>
                           <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                        </div>
                     </div>
                     <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight line-clamp-2">{post.title}</h2>
                     <p className="text-muted-foreground text-base mb-8 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                     
                     <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-accent/50 flex items-center justify-center border border-white/5">
                              <User className="w-4 h-4 text-muted-foreground" />
                           </div>
                           <span className="text-sm font-medium">{post.author.split(' ')[0]}</span>
                        </div>
                        <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:gap-2 transition-all">
                           Read More <ArrowRight className="w-4 h-4" />
                        </Link>
                     </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}

