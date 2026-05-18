import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import AppointmentsManager from './components/AppointmentsManager';

export default function AppointmentsManagementPage() {
  return (
    <AdminLayout currentPath="/appointments-management">
      <AppointmentsManager />
    </AdminLayout>
  );
}