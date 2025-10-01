"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function doLogin() {
    setErr("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin })
    });
    if (res.ok) router.push("/admin/recruitment");
    else setErr("Wrong PIN.");
  }

  return (
    <div className="max-w-sm mx-auto p-6 space-y-4">
      <h1 className="text-lg font-semibold">Admin Login</h1>
      <input
        type="password"
        className="border p-2 w-full"
        placeholder="Admin PIN"
        value={pin}
        onChange={e => setPin(e.target.value)}
      />
      <button onClick={doLogin} className="border px-4 py-2 w-full">Sign in</button>
      {err && <p className="text-red-600 text-sm">{err}</p>}
    </div>
  );
}
