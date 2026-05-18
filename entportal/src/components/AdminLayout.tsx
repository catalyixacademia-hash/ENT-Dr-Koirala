'use client';
import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import { AdminLanguageProvider } from '@/contexts/AdminLanguageContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

export default function AdminLayout({ children, currentPath }: AdminLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <AdminLanguageProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Mobile sidebar overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar — hidden on mobile unless open */}
        <div className={`
          fixed inset-y-0 left-0 z-50 lg:relative lg:z-auto lg:flex
          transition-transform duration-300 ease-in-out
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <AdminSidebar currentPath={currentPath} onClose={() => setMobileSidebarOpen(false)} />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <AdminTopbar onMenuClick={() => setMobileSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
            {children}
          </main>
        </div>
      </div>
    </AdminLanguageProvider>
  );
}