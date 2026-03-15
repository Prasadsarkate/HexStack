"use client";

import { useEffect, useState, useRef } from "react";
import { apiFetch } from "@/utils/api";
import { MessageSquare, Check, RefreshCw, Loader2, Trash2 } from "lucide-react";

interface Lead {
  _id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchLeads = async () => {
      try {
        const res = await apiFetch("/admin/leads");
        if (res.success) {
          setLeads(res.data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load leads list.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await apiFetch(`/admin/leads/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.success) {
        setLeads(leads.map(l => l._id === id ? { ...l, status: newStatus } : l));
      }
    } catch (err: any) {
      alert(err.message || "Failed to update status.");
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      const res = await apiFetch(`/admin/leads/${id}`, { method: "DELETE" });
      if (res.success) {
        setLeads(leads.filter(l => l._id !== id));
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete lead.");
    }
  };


  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lead Tracker</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review inbound service queries and manage contact pipelines.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/40 text-red-500 text-sm p-4 rounded-xl">
          {error}
        </div>
      )}

      <div className="bg-accent/20 backdrop-blur-md rounded-2xl border border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-accent/30 text-xs text-muted-foreground border-b border-border/20">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              {leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-accent/10 transition-colors">
                  <td className="px-6 py-4 font-medium">
                    <div>{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-blue-500">{lead.service}</td>
                  <td className="px-6 py-4 text-muted-foreground text-xs max-w-xs truncate" title={lead.message}>
                    {lead.message}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${
                      lead.status === 'New' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {lead.status === 'New' ? (
                        <button 
                          onClick={() => handleStatusChange(lead._id, 'Contacted')} 
                          className="flex items-center gap-1 px-3 py-1 bg-green-500 text-black text-[10px] rounded-full font-bold hover:bg-green-400 transition-colors"
                        >
                          <Check className="w-3 h-3" /> Contacted
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleStatusChange(lead._id, 'New')} 
                          className="flex items-center gap-1 px-3 py-1 bg-accent border border-border/40 text-muted-foreground text-[10px] rounded-full font-bold hover:bg-accent/80 transition-colors"
                        >
                          <RefreshCw className="w-3 h-3" /> Revert
                        </button>
                      )}

                      <button 
                        onClick={() => handleDeleteLead(lead._id)}
                        className="p-1.5 hover:bg-red-500/10 rounded-lg text-muted-foreground hover:text-red-500 transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
