import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import PatientCRM from './components/PatientCRM';

export default function PatientRecordsCRMPage() {
  return (
    <AdminLayout currentPath="/patient-records-crm">
      <PatientCRM />
    </AdminLayout>
  );
}