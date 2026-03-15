"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, FolderDot, LogOut, Loader2, MessageSquare } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const isAdmin = user.role === "admin";

  const navLinks = isAdmin
    ? [
        { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Clients", href: "/admin/users", icon: Users },
        { name: "Projects", href: "/admin/projects", icon: FolderDot },
        { name: "Leads", href: "/admin/leads", icon: MessageSquare },
      ]
    : [
        { name: "My Project", href: "/client/dashboard", icon: FolderDot },
      ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-accent/20 backdrop-blur-xl border-r border-border/40 flex flex-col pt-6">
        <div className="px-6 mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm">
              H
            </div>
            <span className="text-lg font-bold">HexStack</span>
          </Link>
          <div className="mt-2 text-xs text-muted-foreground capitalize">
            {user.role} Panel
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border/40">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Areas */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-border/40 flex items-center justify-between px-8 bg-background/80 backdrop-blur-sm z-10 sticky top-0">
          <div className="font-semibold text-lg">
            Dashboard
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium">{user.name}</div>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              {user.name[0].toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
