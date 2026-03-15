import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/forms/Button";

const policies = [
  { name: "Privacy Policy", href: "/legal/privacy" },
  { name: "Terms & Conditions", href: "/legal/terms" },
  { name: "Refund Policy", href: "/legal/refund" },
  { name: "Cookie Policy", href: "/legal/cookies" },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="pt-32 pb-16 border-b border-border/40 bg-accent/20">
        <div className="w-full max-w-[1400px] px-4 md:px-6">
           <Button variant="ghost" asChild className="mb-6 -ml-4">
               <Link href="/"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Home</Link>
           </Button>
           <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
             Legal <span className="text-primary">Information</span>
           </h1>
        </div>
      </section>

      <div className="w-full max-w-[1400px] px-4 md:px-6 py-16 flex flex-col md:flex-row gap-12 items-start">
         <aside className="w-full md:w-64 shrink-0 md:sticky md:top-32 border border-border/50 rounded-2xl p-6 bg-background/50 glass">
            <h3 className="font-bold mb-4 px-2">Policies</h3>
            <nav className="flex flex-col space-y-2">
               {policies.map(p => (
                 <Link key={p.href} href={p.href} className="px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent/40 rounded-lg transition-colors">
                   {p.name}
                 </Link>
               ))}
            </nav>
         </aside>

         <main className="flex-1 prose prose-invert prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80 max-w-none">
            {children}
         </main>
      </div>
    </div>
  );
}
