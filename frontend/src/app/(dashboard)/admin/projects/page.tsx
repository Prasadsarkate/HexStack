"use client";

import { useEffect, useState, useRef } from "react";
import { apiFetch } from "@/utils/api";
import { FolderDot, Edit2, PlusSquare, Loader2, X, Plus, FilePlus } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string;
  status: string;
  progress: number;
  total_budget: number;
  paid_amount: number;
  deadline: string;
  current_stage?: string;
  client_id?: { _id: string; name: string; email: string };
}

interface ClientUser {
  _id: string;
  name: string;
  email: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<ClientUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'working' | 'completed'>('working');

  // Form states (Update & Invoice)
  const [newProgress, setNewProgress] = useState(0);
  const [newStatus, setNewStatus] = useState("");
  const [newStage, setNewStage] = useState("");
  const [invoiceForm, setInvoiceForm] = useState({ invoice_id: '', amount: '', status: 'Pending' });
  const [fileForm, setFileForm] = useState({ name: '', url: '' });


  // Create Project states
  const [createForm, setCreateForm] = useState({
    client_id: '',
    title: '',
    description: '',
    total_budget: '',
    deadline: ''
  });

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchData = async () => {
      try {
        const [projectsRes, clientsRes] = await Promise.all([
          apiFetch("/admin/projects"),
          apiFetch("/admin/users")
        ]);

        if (projectsRes.success) setProjects(projectsRes.data);
        if (clientsRes.success) setClients(clientsRes.data);

      } catch (err: any) {
        setError(err.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateProject = async () => {
    const { client_id, title, description, total_budget } = createForm;
    if (!client_id || !title || !description || !total_budget) {
      alert("Please fill in all required fields (Client, Title, Desc, Budget).");
      return;
    }

    try {
      const res = await apiFetch("/admin/projects", {
        method: "POST",
        body: JSON.stringify(createForm),
      });

      if (res.success) {
        // Find client name locally for local state update push
        const clientObj = clients.find(c => c._id === client_id);
        const newProject: Project = {
          ...res.data,
          client_id: clientObj ? { _id: clientObj._id, name: clientObj.name, email: clientObj.email } : undefined,
          paid_amount: 0
        };
        
        setProjects([...projects, newProject]);
        setShowCreateModal(false);
        setCreateForm({ client_id: '', title: '', description: '', total_budget: '', deadline: '' });
        alert("Project created successfully!");
      }
    } catch (err: any) {
      alert(err.message || "Failed to create project.");
    }
  };

  const openProgressModal = (project: Project) => {
    setSelectedProject(project);
    setNewProgress(project.progress);
    setNewStatus(project.status);
    setNewStage(project.current_stage || "Discovery");
    setShowProgressModal(true);
  };

  const openInvoiceModal = (project: Project) => {
    setSelectedProject(project);
    setInvoiceForm({ invoice_id: `INV-${Date.now().toString().slice(-5)}`, amount: '', status: 'Pending' });
    setShowInvoiceModal(true);
  };

  const handleUpdateProgress = async () => {
    if (!selectedProject) return;

    try {
      const res = await apiFetch(`/admin/projects/${selectedProject._id}`, {
        method: "PUT",
        body: JSON.stringify({
          progress: newProgress,
          status: newStatus,
          current_stage: newStage,
        }),
      });

      if (res.success) {
        setProjects(projects.map(p => p._id === selectedProject._id ? { ...p, progress: newProgress, status: newStatus, current_stage: newStage } : p));
        setShowProgressModal(false);
      }
    } catch (err: any) {
      alert(err.message || "Failed to update project.");
    }
  };

  const handleAddInvoice = async () => {
    if (!selectedProject) return;

    try {
      const res = await apiFetch(`/admin/projects/${selectedProject._id}/invoice`, {
        method: "POST",
        body: JSON.stringify(invoiceForm),
      });

      if (res.success) {
        const paidAddition = invoiceForm.status === 'Paid' ? Number(invoiceForm.amount) : 0;
        setProjects(projects.map(p => p._id === selectedProject._id ? { ...p, paid_amount: p.paid_amount + paidAddition } : p));
        setShowInvoiceModal(false);
        alert("Invoice added successfully!");
      }
    } catch (err: any) {
      alert(err.message || "Failed to add invoice.");
    }
  };

  const openFileModal = (project: Project) => {
    setSelectedProject(project);
    setFileForm({ name: '', url: '' });
    setShowFileModal(true);
  };

  const handleAddFile = async () => {
    if (!selectedProject) return;

    try {
      const res = await apiFetch(`/admin/projects/${selectedProject._id}/files`, {
        method: "POST",
        body: JSON.stringify(fileForm),
      });

      if (res.success) {
        setShowFileModal(false);
        alert("File added successfully!");
      }
    } catch (err: any) {
      alert(err.message || "Failed to add file.");
    }
  };
  const displayedProjects = projects.filter(p => activeTab === 'working' ? p.status !== 'Completed' : p.status === 'Completed');

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor timelines, update status, and manage client balances directly.
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5 text-sm font-semibold shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" /> Add Project
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/40 text-red-500 text-sm p-4 rounded-xl">
          {error}
        </div>
      )}

      <div className="flex border-b border-border/20 gap-6">
        <button 
          onClick={() => setActiveTab('working')} 
          className={`pb-2 px-1 text-sm font-medium transition-all ${activeTab === 'working' ? 'border-b-2 border-primary text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Working ({projects.filter(p => p.status !== 'Completed').length})
        </button>
        <button 
          onClick={() => setActiveTab('completed')} 
          className={`pb-2 px-1 text-sm font-medium transition-all ${activeTab === 'completed' ? 'border-b-2 border-primary text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Completed ({projects.filter(p => p.status === 'Completed').length})
        </button>
      </div>


      <div className="grid grid-cols-1 gap-4">
        {displayedProjects.length > 0 ? displayedProjects.map((project) => (
          <div key={project._id} className="bg-accent/20 backdrop-blur-md rounded-2xl border border-border/40 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <FolderDot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-md">{project.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Client: {project.client_id?.name || "Unknown"}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-blue-500/10 text-blue-500 text-[10px] px-2 py-0.5 rounded-full font-semibold">{project.current_stage || 'Discovery'}</span>
                  <span className="bg-accent text-muted-foreground border border-border/60 text-[10px] px-2 py-0.5 rounded-full">{project.status}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-xs px-4">
              <div className="flex justify-between mb-1 text-xs">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-accent rounded-full h-1.5">
                <div id={`progress-${project._id}`} className="bg-primary h-1.5 rounded-full transition-all duration-300" />
                <style>{`#progress-${project._id} { width: ${project.progress}% }`}</style>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => openProgressModal(project)}
                className="p-2 hover:bg-accent/80 rounded-xl border border-border/40 text-muted-foreground hover:text-foreground transition-all flex items-center gap-1.5 text-xs font-medium"
              >
                <Edit2 className="w-3.5 h-3.5" /> Progress
              </button>
              <button 
                onClick={() => openInvoiceModal(project)}
                className="p-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all flex items-center gap-1.5 text-xs font-medium"
              >
                <PlusSquare className="w-3.5 h-3.5" /> Invoice
              </button>
              <button 
                onClick={() => openFileModal(project)}
                className="p-1.5 bg-accent/50 hover:bg-accent rounded-xl border border-border/40 text-muted-foreground hover:text-foreground transition-all flex items-center gap-1.5 text-xs font-medium"
                title="Add File"
              >
                <FilePlus className="w-4 h-4" />
              </button>
            </div>

          </div>
        )) : (
          <div className="text-center py-12 text-sm text-muted-foreground bg-accent/10 rounded-2xl border border-dashed border-border/40">
            No {activeTab} projects found.
          </div>
        )}
      </div>

      {/* 0. Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-border/20 pb-4">
              <h3 className="font-bold text-lg">Create Project</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-muted-foreground hover:text-foreground" title="Close"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-semibold">Assign Client *</label>
                <select 
                  value={createForm.client_id} 
                  onChange={(e) => setCreateForm({ ...createForm, client_id: e.target.value })}
                  className="w-full mt-1 bg-accent/50 border border-border/40 rounded-lg px-3 py-2 text-sm"
                  title="Client Select"
                >
                  <option value="">Select a Client</option>
                  {clients.map(c => <option key={c._id} value={c._id}>{c.name} ({c.email})</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold">Project Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Website Redesign"
                  value={createForm.title} 
                  onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                  className="w-full mt-1 bg-accent/50 border border-border/40 rounded-lg px-3 py-2 text-sm" 
                  title="Title Input"
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Description *</label>
                <textarea 
                  placeholder="Details about the scope..."
                  value={createForm.description} 
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  className="w-full mt-1 bg-accent/50 border border-border/40 rounded-lg px-3 py-2 text-sm h-24" 
                  title="Description Input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold">Total Budget ($) *</label>
                  <input 
                    type="number" 
                    placeholder="12000"
                    value={createForm.total_budget} 
                    onChange={(e) => setCreateForm({ ...createForm, total_budget: e.target.value })}
                    className="w-full mt-1 bg-accent/50 border border-border/40 rounded-lg px-3 py-2 text-sm" 
                    title="Budget Input"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold">Deadline</label>
                  <input 
                    type="date" 
                    value={createForm.deadline} 
                    onChange={(e) => setCreateForm({ ...createForm, deadline: e.target.value })}
                    className="w-full mt-1 bg-accent/50 border border-border/40 rounded-lg px-3 py-2 text-sm" 
                    title="Deadline Input"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 gap-2">
                <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 border border-border/40 rounded-xl text-sm font-medium">Cancel</button>
                <button onClick={handleCreateProject} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">Create Project</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. Progress Modal */}
      {showProgressModal && selectedProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-border/20 pb-4">
              <h3 className="font-bold text-lg">Update Progress</h3>
              <button onClick={() => setShowProgressModal(false)} className="text-muted-foreground hover:text-foreground" title="Close"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-semibold">Stage</label>
                <select 
                  value={newStage} 
                  onChange={(e) => setNewStage(e.target.value)}
                  className="w-full mt-1 bg-accent/50 border border-border/40 rounded-lg px-3 py-2 text-sm"
                  title="Stage Select"
                >
                  {['Discovery', 'Design', 'Development', 'Testing', 'Launch'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold">Status</label>
                <select 
                  value={newStatus} 
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full mt-1 bg-accent/50 border border-border/40 rounded-lg px-3 py-2 text-sm"
                  title="Status Select"
                >
                  {['Pending', 'Active', 'Completed'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold">Progress Percentage ({newProgress}%)</label>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={newProgress} 
                  onChange={(e) => setNewProgress(Number(e.target.value))}
                  className="w-full mt-1 h-1.5 bg-accent rounded-lg appearance-none cursor-pointer accent-primary" 
                  title="Progress Range"
                />
              </div>

              <div className="flex justify-end pt-4 gap-2">
                <button onClick={() => setShowProgressModal(false)} className="px-4 py-2 border border-border/40 rounded-xl text-sm font-medium">Cancel</button>
                <button onClick={handleUpdateProgress} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Invoice Modal */}
      {showInvoiceModal && selectedProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-border/20 pb-4">
              <h3 className="font-bold text-lg">Generate Invoice</h3>
              <button onClick={() => setShowInvoiceModal(false)} className="text-muted-foreground hover:text-foreground" title="Close"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-semibold">Invoice ID</label>
                <input 
                  type="text" 
                  value={invoiceForm.invoice_id} 
                  readOnly
                  className="w-full mt-1 bg-accent/30 border border-border/20 rounded-lg px-3 py-2 text-sm text-muted-foreground" 
                  title="Invoice ID"
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Amount ($)</label>
                <input 
                  type="number" 
                  placeholder="2500"
                  value={invoiceForm.amount} 
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, amount: e.target.value })}
                  className="w-full mt-1 bg-accent/50 border border-border/40 rounded-lg px-3 py-2 text-sm" 
                  title="Amount Input"
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Status</label>
                <select 
                  value={invoiceForm.status} 
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, status: e.target.value })}
                  className="w-full mt-1 bg-accent/50 border border-border/40 rounded-lg px-3 py-2 text-sm"
                  title="Invoice Status"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              <div className="flex justify-end pt-4 gap-2">
                <button onClick={() => setShowInvoiceModal(false)} className="px-4 py-2 border border-border/40 rounded-xl text-sm font-medium">Cancel</button>
                <button onClick={handleAddInvoice} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">Add Invoice</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 3. Add File Modal */}
      {showFileModal && selectedProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-border/20 pb-4">
              <h3 className="font-bold text-lg">Attach Project File</h3>
              <button onClick={() => setShowFileModal(false)} className="text-muted-foreground hover:text-foreground" title="Close"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-semibold">File Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Figma Design Link"
                  value={fileForm.name} 
                  onChange={(e) => setFileForm({ ...fileForm, name: e.target.value })}
                  className="w-full mt-1 bg-accent/50 border border-border/40 rounded-lg px-3 py-2 text-sm" 
                  title="File Name Input"
                />
              </div>

              <div>
                <label className="text-xs font-semibold">File URL *</label>
                <input 
                  type="url" 
                  placeholder="https://figma.com/..."
                  value={fileForm.url} 
                  onChange={(e) => setFileForm({ ...fileForm, url: e.target.value })}
                  className="w-full mt-1 bg-accent/50 border border-border/40 rounded-lg px-3 py-2 text-sm" 
                  title="File URL Input"
                />
              </div>

              <div className="flex justify-end pt-4 gap-2">
                <button onClick={() => setShowFileModal(false)} className="px-4 py-2 border border-border/40 rounded-xl text-sm font-medium">Cancel</button>
                <button onClick={handleAddFile} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">Add File</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
