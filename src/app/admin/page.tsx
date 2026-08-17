"use client";

import React from "react";
import Link from "next/link";
import { 
  FolderKanban, 
  MessageSquare, 
  Eye, 
  Plus, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { projectsData } from "@/data/projects";
import { companyData } from "@/data/company";
import { Button } from "@/components/ui/Button";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-display font-bold uppercase tracking-widest text-brand-500 block">
            OVERVIEW
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-navy-900">
            Welcome, {companyData.contactPerson}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Manage your construction projects, client inquiries, and company website content.
          </p>
        </div>

        <Button href="/admin/projects" variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          Add New Project
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-display uppercase tracking-wider font-semibold">
              Live Projects
            </span>
            <FolderKanban className="w-5 h-5 text-brand-500" />
          </div>
          <div className="text-3xl font-display font-extrabold text-navy-900">
            {projectsData.length}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>4 Categories active</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-display uppercase tracking-wider font-semibold">
              Inquiries Inbox
            </span>
            <MessageSquare className="w-5 h-5 text-brand-500" />
          </div>
          <div className="text-3xl font-display font-extrabold text-navy-900">
            8
          </div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>2 Unread quote requests</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-display uppercase tracking-wider font-semibold">
              PEC Status
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-display font-extrabold text-navy-900">
            {companyData.pecCategory}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Registered: {companyData.yearEstablished}
          </div>
        </div>

        <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-display uppercase tracking-wider font-semibold">
              Monthly Visitors
            </span>
            <Eye className="w-5 h-5 text-brand-500" />
          </div>
          <div className="text-3xl font-display font-extrabold text-navy-900">
            2,450+
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18% from Karachi organic search</span>
          </div>
        </div>
      </div>

      {/* Recent Projects Table Preview */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold uppercase text-navy-900 text-lg">
              Published Construction Projects
            </h3>
            <p className="text-xs text-slate-500">
              Directly synced with homepage and portfolio gallery
            </p>
          </div>
          <Link
            href="/admin/projects"
            className="text-xs font-display font-bold uppercase tracking-wider text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>Manage All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-100 text-slate-500 font-display uppercase tracking-wider">
              <tr>
                <th className="p-4">Project Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projectsData.slice(0, 4).map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-navy-900">{p.title}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-brand-50 text-brand-600 font-medium">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{p.location}</td>
                  <td className="p-4 text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Published</span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href="/admin/projects"
                      className="text-brand-600 hover:underline font-semibold"
                    >
                      Edit
                    </Link>
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
