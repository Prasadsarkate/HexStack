"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
import { Users, Trash2, ShieldAlert, Loader2 } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiFetch("/admin/users");
        if (res.success) {
          setUsers(res.data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load users list.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user and all their associated data?")) return;

    try {
      const res = await apiFetch(`/admin/users/${id}`, { method: "DELETE" });
      if (res.success) {
        setUsers(users.filter(u => u._id !== id));
      }
    } catch (err: any) {
      alert(err.message || "Delete failed.");
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review credentials, update roles, or manage portal security access lists.
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
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-accent/10 transition-colors">
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${
                      user.role === 'admin' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {user.role !== 'admin' ? (
                        <button 
                          onClick={() => handleDelete(user._id)} 
                          className="p-1.5 hover:bg-red-500/10 rounded-lg text-muted-foreground hover:text-red-500 transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <ShieldAlert className="w-4 h-4 text-muted-foreground/40" title="Admin Protected" />
                      )}
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
