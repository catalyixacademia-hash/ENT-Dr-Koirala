import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import SettingsPanel from './components/SettingsPanel';

export default function SettingsPage() {
  return (
    <AdminLayout currentPath="/settings">
      <SettingsPanel />
    </AdminLayout>
  );
}
