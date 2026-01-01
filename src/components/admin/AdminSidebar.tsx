"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ChevronDown, 
  ChevronRight,
  Database,
  User,
  ExternalLink,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  isOpen?: boolean;
  hasSubmenu?: boolean;
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  href, 
  active, 
  onClick, 
  children, 
  isOpen, 
  hasSubmenu 
}: SidebarItemProps) => {
  const content = (
    <div
      className={cn(
        "flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer group",
        active 
          ? "bg-primary text-white shadow-md shadow-primary/20" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} className={cn(active ? "text-white" : "text-gray-400 group-hover:text-gray-600")} />
        <span className="font-medium">{label}</span>
      </div>
      {hasSubmenu && (
        <div className={cn("transition-transform duration-200", isOpen ? "rotate-180" : "")}>
          <ChevronDown size={16} />
        </div>
      )}
    </div>
  );

  if (href && !hasSubmenu) {
    return (
      <Link href={href} className="block w-full mb-1">
        {content}
      </Link>
    );
  }

  return (
    <div className="w-full mb-1">
      {content}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-12 pr-4 py-2 space-y-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get('tab') || 'projects';
  
  const [contentOpen, setContentOpen] = useState(true);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const setTab = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <aside className="w-72 bg-white border-r h-screen sticky top-0 flex flex-col z-40 overflow-y-auto">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Settings size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Admin</h1>
            <p className="text-xs text-gray-500 font-medium">Dashboard v2.0</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 mb-2">
          Main Menu
        </div>
        
        <SidebarItem 
          icon={LayoutDashboard} 
          label="Overview" 
          active={currentTab === 'overview'} 
          onClick={() => setTab('overview')}
        />

          <SidebarItem 
            icon={Database} 
            label="Content" 
            hasSubmenu 
            isOpen={contentOpen}
            onClick={() => setContentOpen(!contentOpen)}
          >
            <button 
              onClick={() => setTab('projects')}
              className={cn(
                "block w-full text-left text-sm py-2 px-3 rounded-md transition-colors",
                currentTab === 'projects' ? "text-primary font-semibold bg-primary/5" : "text-gray-500 hover:text-gray-900"
              )}
            >
              Projects
            </button>
            <button 
              onClick={() => setTab('testimonials')}
              className={cn(
                "block w-full text-left text-sm py-2 px-3 rounded-md transition-colors",
                currentTab === 'testimonials' ? "text-primary font-semibold bg-primary/5" : "text-gray-500 hover:text-gray-900"
              )}
            >
              Testimonials
            </button>
            <button 
              onClick={() => setTab('skills')}
              className={cn(
                "block w-full text-left text-sm py-2 px-3 rounded-md transition-colors",
                currentTab === 'skills' ? "text-primary font-semibold bg-primary/5" : "text-gray-500 hover:text-gray-900"
              )}
            >
              Skills Toolkit
            </button>
          </SidebarItem>

          <SidebarItem 
            icon={Code} 
            label="Design & Layout" 
            active={currentTab === 'design'} 
            onClick={() => setTab('design')}
          />

        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 mt-8 mb-2">
          System
        </div>
        
        <SidebarItem 
          icon={Settings} 
          label="Settings" 
          active={currentTab === 'settings'} 
          onClick={() => setTab('settings')}
        />
        
        <Link href="/" target="_blank" className="block w-full">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group">
            <ExternalLink size={20} className="text-gray-400 group-hover:text-gray-600" />
            <span className="font-medium">View Website</span>
          </div>
        </Link>
      </nav>

      <div className="p-4 mt-auto border-t">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">
            A
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate">Admin User</p>
            <p className="text-[10px] text-gray-500 truncate">System Administrator</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 gap-3"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </Button>
      </div>
    </aside>
  );
}
