// components/AdminCommsPanel.tsx
import React, { useState } from "react";

export default function AdminCommsPanel() {
  const [adminKey, setAdminKey] = useState("");
  const [smsTo, setSmsTo] = useState("");
  const [smsBody, setSmsBody] = useState("New BSS transaction received.");
  const [emailTo, setEmailTo] = useState("");
  const [subject, setSubject] = useState("BSS Notification");
  const [message, setMessage] = useState("New BSS transaction received.");
  const [busy, setBusy] = useState(false);

  async function callApi(path: string, payload: any) {
    setBusy(true);
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey.trim(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");
      alert("✅ Sent!");
    } catch (e:any) {
      alert("❌ " + e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-6 text-orange-400">
      {/* Panel frame */}
      <div className="bg-black border border-orange-500/60 rounded-2xl p-5 shadow-[0_0_0_1px_rgba(255,140,0,.25)]">
        <h2 className="text-xl font-semibold mb-4">Send Admin Email</h2>

        <label className="block text-sm mb-1">To (optional)</label>
        <input
          className="w-full mb-3 bg-transparent border border-orange-500/50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="leave blank to use default admin email"
          value={emailTo}
          onChange={(e) => setEmailTo(e.target.value)}
        />

        <label className="block text-sm mb-1">Subject</label>
        <input
          className="w-full mb-3 bg-transparent border border-orange-500/50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <label className="block text-sm mb-1">Message</label>
        <textarea
          className="w-full h-28 mb-4 bg-transparent border border-orange-500/50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <label className="block text-xs mb-1">Admin API Key</label>
        <input
          type="password"
          className="w-full mb-4 bg-transparent border border-orange-500/50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          placeholder="required to send"
        />

        <button
          disabled={busy}
          onClick={() =>
            callApi("/api/send-email", {
              to: emailTo || undefined,
              subject,
              text: message,
            })
          }
          className="w-full bg-orange-600 hover:bg-orange-500 text-black font-semibold rounded-xl py-2 transition disabled:opacity-50"
        >
          {busy ? "Sending..." : "Send Email"}
        </button>
      </div>

      <div className="bg-black border border-orange-500/60 rounded-2xl p-5 shadow-[0_0_0_1px_rgba(255,140,0,.25)]">
        <h2 className="text-xl font-semibold mb-4">Send Admin SMS</h2>

        <label className="block text-sm mb-1">To (E.164, e.g. +13051234567)</label>
        <input
          className="w-full mb-3 bg-transparent border border-orange-500/50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={smsTo}
          onChange={(e) => setSmsTo(e.target.value)}
        />

        <label className="block text-sm mb-1">Text</label>
        <textarea
          className="w-full h-28 mb-4 bg-transparent border border-orange-500/50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={smsBody}
          onChange={(e) => setSmsBody(e.target.value)}
        />

        <label className="block text-xs mb-1">Admin API Key</label>
        <input
          type="password"
          className="w-full mb-4 bg-transparent border border-orange-500/50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          placeholder="required to send"
        />

        <button
          disabled={busy}
          onClick={() => callApi("/api/send-sms", { to: smsTo, body: smsBody })}
          className="w-full bg-orange-600 hover:bg-orange-500 text-black font-semibold rounded-xl py-2 transition disabled:opacity-50"
        >
          {busy ? "Sending..." : "Send SMS"}
        </button>
      </div>
    </div>
  );
}
