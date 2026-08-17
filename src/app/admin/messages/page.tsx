"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, Calendar, Trash2, CheckCircle2, MessageSquare, Loader2, PhoneCall } from "lucide-react";
import { MessageItem } from "@/lib/db";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (e) {
      console.error("Failed to load messages", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this customer enquiry?")) return;

    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id));
      }
    } catch (e) {
      console.error("Error deleting message", e);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "read" }),
      });
      if (res.ok) {
        setMessages(
          messages.map((m) => (m.id === id ? { ...m, status: "read" } : m))
        );
      }
    } catch (e) {
      console.error("Error updating message", e);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
        <span className="text-xs font-display font-bold uppercase tracking-widest text-brand-500 block">
          INBOX & QUOTE REQUESTS
        </span>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-navy-900">
          Client Inquiries ({messages.length})
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Review incoming requests submitted through the website enquiry forms.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-500" />
          <span>Loading client inquiries...</span>
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-sm border border-slate-200 text-slate-400">
          <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-40 text-brand-500" />
          <p className="text-sm font-semibold">No inquiries in your inbox yet.</p>
        </div>
      ) : (
        /* Messages List */
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white p-6 rounded-sm border transition-all ${
                msg.status === "unread"
                  ? "border-l-4 border-l-brand-500 border-slate-200 shadow-md"
                  : "border-slate-200 shadow-sm opacity-90"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-display font-bold uppercase text-navy-900 text-base">
                    {msg.firstName} {msg.lastName}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded bg-brand-50 text-brand-600 text-xs font-semibold">
                    {msg.service}
                  </span>
                  {msg.status === "unread" && (
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold uppercase">
                      New
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(msg.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Contact details */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mb-4 pb-3 border-b border-slate-100">
                <a
                  href={`tel:${msg.phone}`}
                  className="flex items-center gap-1.5 hover:text-brand-600 font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-500" />
                  <span>{msg.phone}</span>
                </a>
                <a
                  href={`mailto:${msg.email}`}
                  className="flex items-center gap-1.5 hover:text-brand-600 font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-500" />
                  <span>{msg.email}</span>
                </a>
              </div>

              {/* Message Body */}
              <p className="text-slate-700 text-sm leading-relaxed mb-4">
                {msg.message}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                {msg.status === "unread" && (
                  <button
                    type="button"
                    onClick={() => handleMarkRead(msg.id)}
                    className="text-xs font-display font-bold uppercase tracking-wider text-brand-600 hover:text-brand-700"
                  >
                    Mark as Read
                  </button>
                )}
                <a
                  href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                    msg.firstName
                  )},%20this%20is%20Rashid%20Ali%20from%20AK%20Associates%20regarding%20your%20construction%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-display font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-sm"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Reply on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleDelete(msg.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
