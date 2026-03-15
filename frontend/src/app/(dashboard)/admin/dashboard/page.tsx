"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
import { Users, FolderDot, Activity, DollarSign, Loader2 } from "lucide-react";

interface Stats {
  totalClients: number;
  activeProjects: number;
  pendingLeads: number;
  totalRevenue: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiFetch("/admin/stats");
        if (res.success) {
          setStats(res.stats);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard metrics.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;

  const statCards = [
    { name: "Total Clients", value: stats?.totalClients || 0, icon: Users, color: "text-blue-500 bg-blue-500/10" },
    { name: "Active Projects", value: stats?.activeProjects || 0, icon: FolderDot, color: "text-purple-500 bg-purple-500/10" },
    { name: "Total Revenue", value: `$${(stats?.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: "text-green-500 bg-green-500/10" },
    { name: "Pending Leads", value: stats?.pendingLeads || 0, icon: Activity, color: "text-amber-500 bg-amber-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor your digital agency's key performance indicators.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/40 text-red-500 text-sm p-4 rounded-xl">
          {error}
        </div>
      )}

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-accent/30 backdrop-blur-md p-6 rounded-2xl border border-border/50  relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">{stat.name}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Admin actions row / Recent items list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-accent/30 p-6 rounded-2xl border border-border/50 backdrop-blur-sm h-64 flex items-center justify-center text-muted-foreground text-sm">
           Analytics Graph Placeholder
        </div>
        <div className="bg-accent/30 p-6 rounded-2xl border border-border/50 backdrop-blur-sm h-64 flex items-center justify-center text-muted-foreground text-sm">
           Recent Activities Feed Placeholder
        </div>
      </div>
    </div>
  );
}
