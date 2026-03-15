"use client";

import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { apiFetch } from "@/utils/api";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot Password States
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: Send OTP, 2: Reset Password
  const [resetForm, setResetForm] = useState({ email: '', otp: '', newPassword: '' });
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  
  const { login } = useContext(AuthContext);

  const handleSendResetOTP = async () => {
    if (!resetForm.email) { setResetError("Email is required"); return; }
    setResetError("");
    setResetLoading(true);
    try {
      const res = await apiFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: resetForm.email }),
      });
      if (res.success) {
        setResetStep(2);
        alert("OTP sent to your email!");
      }
    } catch (err: any) {
      setResetError(err.message || "Failed to send OTP");
    } finally {
      setResetLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetForm.otp || !resetForm.newPassword) { setResetError("All fields required"); return; }
    setResetError("");
    setResetLoading(true);
    try {
      const res = await apiFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ 
          email: resetForm.email, 
          otp: resetForm.otp, 
          newPassword: resetForm.newPassword 
        }),
      });
      if (res.success) {
        alert("Password reset successfully! You can now log in.");
        setShowResetModal(false);
        setResetForm({ email: '', otp: '', newPassword: '' });
        setResetStep(1);
      }
    } catch (err: any) {
      setResetError(err.message || "Reset failed");
    } finally {
      setResetLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (res.success) {
        login(res.token, {
          _id: res._id,
          name: res.name,
          email: res.email,
          role: res.role,
        });
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-accent/30 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Log in to manage your HexStack account
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="••••••••"
            />
            <div className="flex justify-end mt-1">
              <button 
                type="button" 
                onClick={() => { setShowResetModal(true); setResetStep(1); setResetError(""); }} 
                className="text-xs text-primary hover:underline hover:text-primary/80 transition-colors"
                title="Forgot Password"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors text-sm disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showResetModal && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-sm bg-accent/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowResetModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xs"
              title="Close"
            >
              Back
            </button>
            <h2 className="text-xl font-bold mb-1">Reset Password</h2>
            <p className="text-xs text-muted-foreground mb-4">
              {resetStep === 1 ? "Enter your email to receive an OTP code." : "Enter the code and set your new password."}
            </p>

            {resetError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs p-2 rounded-lg mb-4">
                {resetError}
              </div>
            )}

            <div className="space-y-3">
              {resetStep === 1 ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={resetForm.email}
                      onChange={(e) => setResetForm({ ...resetForm, email: e.target.value })}
                      className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="name@company.com"
                    />
                  </div>
                  <button
                    onClick={handleSendResetOTP}
                    disabled={resetLoading}
                    className="w-full py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors text-sm disabled:opacity-50"
                  >
                    {resetLoading ? "Sending Code..." : "Send Verification Code"}
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Enter 6-Digit OTP</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={resetForm.otp}
                      onChange={(e) => setResetForm({ ...resetForm, otp: e.target.value })}
                      className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm text-center font-bold tracking-[4px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="000000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <input
                      type="password"
                      required
                      value={resetForm.newPassword}
                      onChange={(e) => setResetForm({ ...resetForm, newPassword: e.target.value })}
                      className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>
                  <button
                    onClick={handleResetPassword}
                    disabled={resetLoading}
                    className="w-full py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors text-sm disabled:opacity-50"
                  >
                    {resetLoading ? "Resetting..." : "Reset Password"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
