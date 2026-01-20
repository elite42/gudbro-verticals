'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, LayoutGrid, Plus } from 'lucide-react';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import {
  FloorPlanEditor,
  TableData,
  TableFormData,
  FloorPlanConfig,
} from '@/components/reservations';
import { useTenant } from '@/lib/contexts/TenantContext';

interface Section {
  id: string;
  name: string;
}

export default function FloorPlanPage() {
  const { location, brand } = useTenant();
  const locationId = location?.id || brand?.id;

  const [tables, setTables] = useState<TableData[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  const fetchData = useCallback(async () => {
    if (!locationId) return;

    setIsLoading(true);
    setError(null);

    try {
      const [tablesRes, sectionsRes] = await Promise.all([
        fetch(`/api/tables?locationId=${locationId}`),
        fetch(`/api/sections?locationId=${locationId}`),
      ]);

      if (!tablesRes.ok) {
        throw new Error('Failed to fetch tables');
      }

      const tablesData = await tablesRes.json();
      const sectionsData = sectionsRes.ok ? await sectionsRes.json() : { sections: [] };

      // Transform tables to include floor_plan_config
      const transformedTables: TableData[] = (tablesData.tables || []).map(
        (t: {
          id: string;
          table_number: string;
          min_capacity: number;
          max_capacity: number;
          shape?: string;
          section_id?: string | null;
          is_reservable?: boolean;
          notes?: string;
          floor_plan_config?: FloorPlanConfig;
        }) => ({
          id: t.id,
          table_number: t.table_number,
          min_capacity: t.min_capacity,
          max_capacity: t.max_capacity,
          shape: t.shape || 'square',
          section_id: t.section_id ?? null,
          is_reservable: t.is_reservable ?? true,
          notes: t.notes || '',
          floor_plan_config: t.floor_plan_config || {
            x: 50 + Math.random() * 400,
            y: 50 + Math.random() * 300,
            width: 80,
            height: 80,
            rotation: 0,
          },
        })
      );

      setTables(transformedTables);
      setSections(sectionsData.sections || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [locationId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Create table
  const handleTableCreate = async (
    data: TableFormData & { floor_plan_config: FloorPlanConfig }
  ) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/tables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableNumber: data.table_number,
          minCapacity: data.min_capacity,
          maxCapacity: data.max_capacity,
          shape: data.shape,
          sectionId: data.section_id,
          isReservable: data.is_reservable,
          notes: data.notes,
          floorPlanConfig: data.floor_plan_config,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create table');
      }

      await fetchData();
    } finally {
      setIsSaving(false);
    }
  };

  // Update table
  const handleTableUpdate = async (id: string, data: Partial<TableData>) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/tables', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          tableNumber: data.table_number,
          minCapacity: data.min_capacity,
          maxCapacity: data.max_capacity,
          shape: data.shape,
          floorPlanConfig: data.floor_plan_config,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update table');
      }

      await fetchData();
    } finally {
      setIsSaving(false);
    }
  };

  // Delete table
  const handleTableDelete = async (id: string) => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/tables?tableId=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to delete table');
      }

      await fetchData();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/reservations"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">Floor Plan</h1>
              <InfoTooltip contentKey="pages.floorPlan" kbPageId="reservations-floor-plan" />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Arrange tables and manage your restaurant layout
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-900">{tables.length}</span> tables
            {sections.length > 0 && (
              <>
                {' '}
                in <span className="font-medium text-gray-900">{sections.length}</span> sections
              </>
            )}
          </div>
          <button
            onClick={fetchData}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden p-6">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
            <button onClick={fetchData} className="mt-2 text-sm underline">
              Try again
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
              <p className="mt-2 text-sm text-gray-500">Loading floor plan...</p>
            </div>
          </div>
        ) : tables.length === 0 && sections.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="max-w-md text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <LayoutGrid className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">No floor plan yet</h3>
              <p className="mt-2 text-sm text-gray-500">
                Get started by creating sections and adding tables to your floor plan. You can drag
                and drop tables to arrange your restaurant layout.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/reservations/settings"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                  Create Sections
                </Link>
                <button
                  onClick={() => {
                    handleTableCreate({
                      table_number: 'T1',
                      min_capacity: 2,
                      max_capacity: 4,
                      shape: 'square',
                      section_id: null,
                      is_reservable: true,
                      notes: '',
                      floor_plan_config: {
                        x: 100,
                        y: 100,
                        width: 80,
                        height: 80,
                        rotation: 0,
                      },
                    });
                  }}
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                  {isSaving ? 'Adding...' : 'Add First Table'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full">
            <FloorPlanEditor
              tables={tables}
              sections={sections}
              onTableCreate={handleTableCreate}
              onTableUpdate={handleTableUpdate}
              onTableDelete={handleTableDelete}
              isLoading={isSaving}
            />
          </div>
        )}
      </div>
    </div>
  );
}
