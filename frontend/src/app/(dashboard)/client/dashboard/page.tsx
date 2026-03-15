"use client";

import { useEffect, useState, useRef } from "react";
import { apiFetch } from "@/utils/api";
import { FolderDot, DollarSign, Calendar, FileText, CheckCircle2, MessageSquare, Loader2 } from "lucide-react";

interface Payment {
  invoice_id: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Paid';
}

interface Project {
  title: string;
  description: string;
  status: string;
  progress: number;
  total_budget: number;
  paid_amount: number;
  deadline: string;
  files_url: { name: string; url: string }[];
  team_lead?: string;
  current_stage?: 'Discovery' | 'Design' | 'Development' | 'Testing' | 'Launch';
  payments?: Payment[];
}

export default function ClientDashboardPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchedRef = useRef(false);

  const stages = ['Discovery', 'Design', 'Development', 'Testing', 'Launch'];

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchProject = async () => {
      try {
        const res = await apiFetch("/client/project");
        if (res.success) {
          setProject(res.data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load project parameters.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, []);

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;

  if (error || !project) {
    return (
      <div className="bg-red-500/10 border border-red-500/40 text-red-500 text-sm p-4 rounded-xl">
        {error || "No active project found for your account. Please contact an Administrator."}
      </div>
    );
  }

  const financials = [
    { name: "Total Budget", value: `$${project.total_budget.toLocaleString()}`, color: "text-foreground" },
    { name: "Paid Amount", value: `$${project.paid_amount.toLocaleString()}`, color: "text-green-500" },
    { name: "Remaining Balance", value: `$${(project.total_budget - project.paid_amount).toLocaleString()}`, color: "text-amber-500" },
  ];

  const currentStageIndex = stages.indexOf(project.current_stage || 'Discovery');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Project Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Tracking **{project.title}** deliverables and payment logs.
        </p>
      </div>

      {/* 1. Stage Tracker / Timeline */}
      <div className="bg-accent/20 backdrop-blur-md rounded-2xl border border-border/40 p-6">
        <h3 className="font-bold text-md mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary" /> Project Journey Phase
        </h3>
        <div className="flex items-center justify-between relative">
          {stages.map((stage, index) => {
            const isCompleted = index < currentStageIndex;
            const isCurrent = index === currentStageIndex;

            return (
              <div key={stage} className="flex flex-col items-center relative z-10 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted ? 'bg-green-500 text-black' : isCurrent ? 'bg-primary text-white ring-4 ring-primary/20' : 'bg-accent border border-border/60 text-muted-foreground'
                }`}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <div className={`text-xs mt-2 font-medium ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>
                  {stage}
                </div>
              </div>
            );
          })}
          {/* Progress Line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-accent/60 -z-10">
            <div id="journey-line" className="bg-green-500 h-0.5 transition-all duration-500" />
            <style>{`#journey-line { width: ${(currentStageIndex / (stages.length - 1)) * 100}% }`}</style>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Project Card & Info */}
        <div className="lg:col-span-2 bg-accent/20 backdrop-blur-md rounded-2xl border border-border/40 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <FolderDot className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{project.title}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Team Lead: {project.team_lead || "Assigning..."}</p>
              </div>
            </div>
            <span className="bg-blue-500/15 text-blue-500 text-xs px-2.5 py-1 rounded-full font-medium">
              {project.status}
            </span>
          </div>

          <p className="text-sm text-balance text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span className="font-medium text-xs">Direct Completion</span>
              <span className="text-muted-foreground text-xs">{project.progress}%</span>
            </div>
            <div className="w-full bg-accent rounded-full h-2">
              <div id="project-progress-bar" className="bg-primary h-2 rounded-full transition-all duration-500" />
              <style>{`#project-progress-bar { width: ${project.progress}% }`}</style>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* 3. Financial Overview */}
        <div className="bg-accent/20 backdrop-blur-md rounded-2xl border border-border/40 p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-md flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" /> Balance Tracking
            </h3>
            <div className="space-y-3 pt-4">
              {financials.map((item) => (
                <div key={item.name} className="flex justify-between items-center py-2 border-b border-border/20 last:border-0">
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className={`font-bold text-sm ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <button className="w-full py-2.5 bg-accent/80 hover:bg-accent border border-border/60 hover:border-border text-foreground text-sm rounded-xl font-medium transition-all flex items-center justify-center gap-2 mt-4">
             Request Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 4. Invoices Table */}
        <div className="bg-accent/20 backdrop-blur-md rounded-2xl border border-border/40 p-6">
          <h3 className="font-bold text-md mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" /> Invoices & Payments
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-muted-foreground border-b border-border/20">
                <tr>
                  <th className="pb-2">Invoice ID</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {project.payments && project.payments.length > 0 ? (
                  project.payments.map((p, i) => (
                    <tr key={i} className="border-b border-border/10 last:border-0 hover:bg-accent/10 transition-colors">
                      <td className="py-3 font-medium text-xs">{p.invoice_id}</td>
                      <td className="py-3 text-xs">${p.amount.toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${p.status === 'Paid' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={3} className="text-center py-4 text-xs text-muted-foreground">No invoices generated yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Assets Manager */}
        <div className="bg-accent/20 backdrop-blur-md rounded-2xl border border-border/40 p-6 flex flex-col">
          <h3 className="font-bold text-md mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" /> Shared Project Files
          </h3>
          <div className="space-y-2 flex-1 overflow-y-auto max-h-48">
            {project.files_url && project.files_url.length > 0 ? (
              project.files_url.map((file, i) => (
                <a 
                  key={i} 
                  href={file.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between p-3 bg-accent/10 hover:bg-accent/30 border border-border/20 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium group-hover:underline">{file.name}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">Open Link</span>
                </a>
              ))
            ) : (
              <div className="text-center py-4 text-xs text-muted-foreground h-full flex items-center justify-center">No assets uploaded yet.</div>
            )}
          </div>
          
          <div className="pt-4 border-t border-border/20 mt-4 bg-accent/10 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold">Need to share a file?</p>
              <p className="text-[10px] text-muted-foreground">Contact support to upload large assets.</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs rounded-lg font-semibold hover:bg-primary/90 transition-all">
              <MessageSquare className="w-3.5 h-3.5" /> Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

