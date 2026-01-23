'use client';

import { useState, useEffect, useCallback } from 'react';

interface StaffProfile {
  id: string;
  displayName: string;
  photoUrl?: string;
  jobTitle: string;
}

interface Section {
  id: string;
  name: string;
  tableCount: number;
}

interface Table {
  id: string;
  tableNumber: string;
  displayName?: string;
  sectionId?: string;
  sectionName?: string;
}

interface Assignment {
  id: string;
  staffId: string;
  staffName: string;
  staffPhoto?: string;
  sectionId?: string;
  sectionName?: string;
  tableId?: string;
  tableNumber?: string;
  assignmentMethod: string;
  shiftStart?: string;
  shiftEnd?: string;
}

interface StaffAssignmentsTabProps {
  locationId: string;
  staffProfiles: StaffProfile[];
}

export function StaffAssignmentsTab({ locationId, staffProfiles }: StaffAssignmentsTabProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Assignment modal state
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [assignmentType, setAssignmentType] = useState<'section' | 'tables'>('section');
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [selectedTables, setSelectedTables] = useState<string[]>([]);

  // Load data
  const loadData = useCallback(async () => {
    if (!locationId) return;

    setIsLoading(true);
    setError(null);

    try {
      // Load assignments
      const assignRes = await fetch(
        `/api/staff/assignments?locationId=${locationId}&date=${selectedDate}`
      );
      const assignData = await assignRes.json();
      if (assignData.success) {
        setAssignments(assignData.assignments);
      }

      // Load sections
      const sectionsRes = await fetch(`/api/locations/sections?locationId=${locationId}`);
      const sectionsData = await sectionsRes.json();
      if (sectionsData.success) {
        setSections(sectionsData.sections || []);
      }

      // Load tables
      const tablesRes = await fetch(`/api/locations/tables?locationId=${locationId}`);
      const tablesData = await tablesRes.json();
      if (tablesData.success) {
        setTables(tablesData.tables || []);
      }
    } catch (err) {
      setError('Errore nel caricamento');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [locationId, selectedDate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Create assignment
  const handleCreateAssignment = async () => {
    if (!selectedStaff) return;

    setIsSaving(true);
    setError(null);

    try {
      if (assignmentType === 'section') {
        // Create section assignments
        for (const sectionId of selectedSections) {
          await fetch('/api/staff/assignments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              staffId: selectedStaff,
              locationId,
              sectionId,
              shiftDate: selectedDate,
            }),
          });
        }
      } else {
        // Create table assignments
        for (const tableId of selectedTables) {
          await fetch('/api/staff/assignments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              staffId: selectedStaff,
              locationId,
              tableId,
              shiftDate: selectedDate,
            }),
          });
        }
      }

      setShowAssignModal(false);
      setSelectedStaff(null);
      setSelectedSections([]);
      setSelectedTables([]);
      loadData();
    } catch (err) {
      setError('Errore nel salvataggio');
    } finally {
      setIsSaving(false);
    }
  };

  // Remove assignment
  const handleRemoveAssignment = async (assignmentId: string) => {
    try {
      const res = await fetch(`/api/staff/assignments?assignmentId=${assignmentId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        loadData();
      }
    } catch (err) {
      console.error('Error removing assignment:', err);
    }
  };

  // Group assignments by staff
  const assignmentsByStaff = assignments.reduce(
    (acc, a) => {
      if (!acc[a.staffId]) {
        acc[a.staffId] = {
          staffName: a.staffName,
          staffPhoto: a.staffPhoto,
          assignments: [],
        };
      }
      acc[a.staffId].assignments.push(a);
      return acc;
    },
    {} as Record<string, { staffName: string; staffPhoto?: string; assignments: Assignment[] }>
  );

  // Get unassigned staff
  const assignedStaffIds = new Set(Object.keys(assignmentsByStaff));
  const unassignedStaff = staffProfiles.filter((s) => !assignedStaffIds.has(s.id));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Assegnazioni Tavoli</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
          />
        </div>
        <button
          onClick={() => setShowAssignModal(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Assegna Staff
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Assignments Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Assigned Staff */}
        {Object.entries(assignmentsByStaff).map(([staffId, data]) => (
          <div key={staffId} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center gap-3">
              {data.staffPhoto ? (
                <img
                  src={data.staffPhoto}
                  alt={data.staffName}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  {data.staffName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900">{data.staffName}</p>
                <p className="text-xs text-gray-500">
                  {data.assignments.length} assegnazion{data.assignments.length === 1 ? 'e' : 'i'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {data.assignments.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    {a.sectionId ? (
                      <>
                        <span className="text-lg">🏠</span>
                        <span className="text-sm text-gray-700">{a.sectionName}</span>
                      </>
                    ) : a.tableId ? (
                      <>
                        <span className="text-lg">🪑</span>
                        <span className="text-sm text-gray-700">Tavolo {a.tableNumber}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg">📍</span>
                        <span className="text-sm text-gray-700">Tutto il locale</span>
                      </>
                    )}
                    {a.assignmentMethod === 'self_assign' && (
                      <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700">
                        Auto
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveAssignment(a.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Unassigned Staff */}
        {unassignedStaff.map((staff) => (
          <div
            key={staff.id}
            className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-4"
          >
            <div className="flex items-center gap-3">
              {staff.photoUrl ? (
                <img
                  src={staff.photoUrl}
                  alt={staff.displayName}
                  className="h-10 w-10 rounded-full object-cover opacity-50"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-400">
                  {staff.displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-medium text-gray-500">{staff.displayName}</p>
                <p className="text-xs text-gray-400">Non assegnato</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedStaff(staff.id);
                setShowAssignModal(true);
              }}
              className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-white"
            >
              + Assegna
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {Object.keys(assignmentsByStaff).length === 0 && unassignedStaff.length === 0 && (
        <div className="py-12 text-center">
          <span className="text-5xl">📋</span>
          <p className="mt-4 text-gray-500">Nessuno staff da assegnare</p>
        </div>
      )}

      {/* Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold">Assegna Staff</h3>

            {/* Staff Selection */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">Staff</label>
              <select
                value={selectedStaff || ''}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="">Seleziona...</option>
                {staffProfiles.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.displayName} ({s.jobTitle})
                  </option>
                ))}
              </select>
            </div>

            {/* Assignment Type */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">Assegna per</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setAssignmentType('section')}
                  className={`flex-1 rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                    assignmentType === 'section'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  🏠 Sezione
                </button>
                <button
                  onClick={() => setAssignmentType('tables')}
                  className={`flex-1 rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                    assignmentType === 'tables'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  🪑 Tavoli Specifici
                </button>
              </div>
            </div>

            {/* Section/Table Selection */}
            {assignmentType === 'section' ? (
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">Sezioni</label>
                <div className="max-h-48 space-y-2 overflow-y-auto">
                  {sections.length === 0 ? (
                    <p className="text-sm text-gray-500">Nessuna sezione configurata</p>
                  ) : (
                    sections.map((section) => (
                      <label
                        key={section.id}
                        className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSections.includes(section.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSections([...selectedSections, section.id]);
                            } else {
                              setSelectedSections(
                                selectedSections.filter((id) => id !== section.id)
                              );
                            }
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600"
                        />
                        <span className="text-sm">{section.name}</span>
                        <span className="ml-auto text-xs text-gray-400">
                          {section.tableCount} tavoli
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">Tavoli</label>
                <div className="grid max-h-48 grid-cols-4 gap-2 overflow-y-auto">
                  {tables.length === 0 ? (
                    <p className="col-span-4 text-sm text-gray-500">Nessun tavolo configurato</p>
                  ) : (
                    tables.map((table) => (
                      <button
                        key={table.id}
                        type="button"
                        onClick={() => {
                          if (selectedTables.includes(table.id)) {
                            setSelectedTables(selectedTables.filter((id) => id !== table.id));
                          } else {
                            setSelectedTables([...selectedTables, table.id]);
                          }
                        }}
                        className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
                          selectedTables.includes(table.id)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {table.tableNumber}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedStaff(null);
                  setSelectedSections([]);
                  setSelectedTables([]);
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Annulla
              </button>
              <button
                onClick={handleCreateAssignment}
                disabled={
                  !selectedStaff ||
                  isSaving ||
                  (assignmentType === 'section' && selectedSections.length === 0) ||
                  (assignmentType === 'tables' && selectedTables.length === 0)
                }
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isSaving ? 'Salvataggio...' : 'Conferma'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
