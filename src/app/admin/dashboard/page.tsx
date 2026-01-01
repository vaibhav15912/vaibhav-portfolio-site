"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectManager from '@/components/admin/ProjectManager';
import TestimonialManager from '@/components/admin/TestimonialManager';
import SkillManager from '@/components/admin/SkillManager';
import DesignLayout from '@/components/admin/DesignLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, Settings as SettingsIcon, Briefcase, MessageSquare, Code } from 'lucide-react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'projects';

  switch (tab) {
    case 'overview':
      return (
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold tracking-tight">Welcome back, Admin</h2>
            <p className="text-muted-foreground">Here's what's happening with your portfolio today.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+1 new this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Skills Listed</CardTitle>
                <Code className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Across 5 categories</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Status</CardTitle>
                <LayoutDashboard className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Online</div>
                <p className="text-xs text-muted-foreground">Portfolio is live</p>
              </CardContent>
            </Card>
          </div>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest updates to the portfolio content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Updated project "Modern Portfolio"</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );

    case 'projects':
      return (
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold tracking-tight">Manage Projects</h2>
            <p className="text-muted-foreground">Add, edit or remove projects from your work portfolio.</p>
          </div>
          <ProjectManager />
        </div>
      );

    case 'testimonials':
      return (
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold tracking-tight">Manage Testimonials</h2>
            <p className="text-muted-foreground">Control what clients and colleagues say about your work.</p>
          </div>
          <TestimonialManager />
        </div>
      );

    case 'skills':
      return (
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold tracking-tight">Skills Toolkit</h2>
            <p className="text-muted-foreground">Update your technical expertise and specialized tools.</p>
          </div>
          <SkillManager />
        </div>
      );

    case 'design':
      return <DesignLayout />;

    case 'settings':
      return (
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
            <p className="text-muted-foreground">Manage your administrative profile and preferences.</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and login credentials.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Display Name</label>
                <div className="p-2 border rounded-md bg-gray-50 text-gray-500">Admin User</div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="p-2 border rounded-md bg-gray-50 text-gray-500">admin@example.com</div>
              </div>
              <div className="pt-4">
                <button className="px-4 py-2 bg-primary text-white rounded-md opacity-50 cursor-not-allowed">Save Changes</button>
              </div>
            </CardContent>
          </Card>
        </div>
      );

    default:
      return <div>Select a tab from the sidebar</div>;
  }
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div>Loading content...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
