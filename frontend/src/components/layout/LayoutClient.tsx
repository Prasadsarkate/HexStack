"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  
  // Conditionally hide Nav and Footer for dashboards AND auth pages to keep it clean
  const hideLayout = pathname.startsWith("/admin") || pathname.startsWith("/client") || pathname.startsWith("/login") || pathname.startsWith("/signup");

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}
