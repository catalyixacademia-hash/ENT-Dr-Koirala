'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { Patient } from './PatientCRM';

interface Props {
  patients: Patient[];
  selectedId: string | null;
  onSelect: (p: Patient) => void;
}

export default function PatientTable({ patients, selectedId, onSelect }: Props) {
  const [page, setPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(patients.length / perPage);
  const paginated = patients.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="bg-white rounded-2xl border card-shadow overflow-hidden">
      <div className="overflow-x-auto -mx-0">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b bg-muted/30">
              {['Patient', 'Age/Gender', 'Contact', 'City', 'Last Visit', 'Visits', 'Diagnoses', 'Next Appt', 'Status', ''].map((h, i) => (
                <th key={`pth-${i}`} className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                      <Icon name="UserGroupIcon" size={24} className="text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">No patients found</p>
                    <p className="text-xs text-muted-foreground">Try a different search term</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((patient) => (
                <tr
                  key={patient.id}
                  onClick={() => onSelect(patient)}
                  className={`hover:bg-muted/30 transition-colors cursor-pointer group ${selectedId === patient.id ? 'bg-primary/5 border-l-2 border-l-primary' : ''}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">
                          {patient.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground whitespace-nowrap">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">{patient.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="text-sm font-medium text-foreground">{patient.age} yrs</p>
                    <p className="text-xs text-muted-foreground">{patient.gender}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-medium text-foreground">{patient.phone}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[140px]">{patient.email}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{patient.city}</td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground whitespace-nowrap font-tabular">{patient.lastVisit}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs font-bold text-foreground font-tabular">
                      {patient.visitCount}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1 max-w-[160px]">
                      {patient.diagnosisTags.slice(0, 2).map((tag) => (
                        <span key={`${patient.id}-diag-${tag}`} className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                          {tag}
                        </span>
                      ))}
                      {patient.diagnosisTags.length > 2 && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                          +{patient.diagnosisTags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {patient.nextAppointment ? (
                      <span className="text-xs font-semibold text-secondary font-tabular">{patient.nextAppointment}</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`status-badge ${patient.status === 'active' ? 'status-confirmed' : 'status-cancelled'}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button title="View patient record" className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                        <Icon name="EyeIcon" size={14} className="text-muted-foreground" />
                      </button>
                      <button title="Edit patient record" className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                        <Icon name="PencilSquareIcon" size={14} className="text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t px-4 py-3 flex items-center justify-between bg-muted/10">
          <span className="text-xs text-muted-foreground">
            {(page - 1) * perPage + 1}–{Math.min(page * perPage, patients.length)} of {patients.length} patients
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg hover:bg-muted disabled:opacity-40 transition-colors">
              <Icon name="ChevronLeftIcon" size={14} className="text-muted-foreground" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={`pat-page-${p}`}
                onClick={() => setPage(p)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${page === p ? 'gradient-primary text-white' : 'hover:bg-muted text-muted-foreground'}`}
              >
                {p}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg hover:bg-muted disabled:opacity-40 transition-colors">
              <Icon name="ChevronRightIcon" size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}