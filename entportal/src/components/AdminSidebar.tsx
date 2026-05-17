'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useAdminLanguage } from '@/contexts/AdminLanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ADMIN_FULL_NAME } from '@/lib/admin-config';
import { getTranslations } from '@/lib/i18n';

interface NavItem {
  id: string;
  labelKey: string;
  icon: string;
  href: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'nav-dashboard', labelKey: 'admin_nav_dashboard', icon: 'HomeIcon', href: '/admin-dashboard-home' },
  { id: 'nav-appointments', labelKey: 'admin_nav_appointments', icon: 'CalendarDaysIcon', href: '/appointments-management', badge: 4 },
  { id: 'nav-patients', labelKey: 'admin_nav_patients', icon: 'UserGroupIcon', href: '/patient-records-crm' },
  { id: 'nav-settings', labelKey: 'admin_nav_settings', icon: 'Cog6ToothIcon', href: '/settings' },
];

const QUICK_LINKS: NavItem[] = [
  { id: 'nav-website', labelKey: 'admin_nav_website', icon: 'GlobeAltIcon', href: '/' },
];

interface AdminSidebarProps {
  currentPath: string;
  onClose?: () => void;
}

export default function AdminSidebar({ currentPath, onClose }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const { language } = useAdminLanguage();
  const { signOut } = useAuth();
  const router = useRouter();
  const t = getTranslations(language);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
      router.push('/sign-up-login-screen');
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <aside
      className="flex flex-col h-full transition-all duration-300 ease-in-out flex-shrink-0"
      style={{
        width: collapsed ? '64px' : '240px',
        backgroundColor: 'var(--sidebar-bg)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <AppLogo size={32} />
            <span className="font-bold text-white text-sm tracking-tight">ENTPortal</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto">
            <AppLogo size={32} />
          </div>
        )}
        <div className="flex items-center gap-1">
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors hidden lg:flex"
              aria-label={t.admin_sidebar_collapse}
            >
              <Icon name="ChevronLeftIcon" size={16} className="text-slate-400" />
            </button>
          )}
          {/* Mobile close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors lg:hidden"
              aria-label={t.admin_sidebar_close}
            >
              <Icon name="XMarkIcon" size={16} className="text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-auto mt-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors hidden lg:flex"
          aria-label={t.admin_sidebar_expand}
        >
          <Icon name="ChevronRightIcon" size={16} className="text-slate-400" />
        </button>
      )}

      {/* Main Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {!collapsed && (
          <p className="px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
            {t.admin_main_menu}
          </p>
        )}
        {NAV_ITEMS.map((item) => {
          const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
          const label = t[item.labelKey as keyof typeof t] as string;
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className={`admin-sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
              title={collapsed ? label : undefined}
            >
              <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={18} />
              {!collapsed && (
                <>
                  <span className="flex-1">{label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-auto inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
                      style={{ backgroundColor: 'rgba(20,184,166,0.2)', color: 'var(--sidebar-active)' }}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-white/10">
          {!collapsed && (
            <p className="px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              {t.admin_quick_links}
            </p>
          )}
          {QUICK_LINKS.map((item) => {
            const label = t[item.labelKey as keyof typeof t] as string;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={`admin-sidebar-link ${collapsed ? 'justify-center px-2' : ''}`}
                title={collapsed ? label : undefined}
              >
                <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={18} />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Footer */}
      <div className="px-2 py-3 border-t border-white/10">
        <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">KK</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{ADMIN_FULL_NAME}</p>
              <p className="text-xs text-slate-400 truncate">{t.admin_doctor_title}</p>
            </div>
          )}
          {!collapsed && (
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title={t.admin_sign_out}
              aria-label={t.admin_sign_out}
            >
              <Icon name="ArrowRightOnRectangleIcon" size={18} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}