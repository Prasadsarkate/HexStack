"use client";

import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { apiFetch } from "@/utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleSendOTP = async () => {
    if (!email) { setError("Email is required for OTP"); return; }
    setError("");
    setLoading(true);

    try {
      const res = await apiFetch("/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (res.success) {
        setOtpSent(true);
        alert("Verification code sent to your email!");
      }
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await apiFetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password, phone, otp }),
      });

      if (res.success) {
        login(res.token, {
          _id: res._id,
          name: res.name,
          email: res.email,
          role: res.role,
        });
        router.push("/client/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-accent/30 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign up to track your projects at HexStack
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

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
            <label className="block text-sm font-medium mb-1">Phone (Optional)</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="1234567890"
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
              minLength={6}
            />
          </div>

          {!otpSent ? (
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors text-sm disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Enter 6-Digit OTP</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm text-center font-bold tracking-[4px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="000000"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors text-sm disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Create Account"}
              </button>
            </>
          )}
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
