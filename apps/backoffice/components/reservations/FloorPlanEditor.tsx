'use client';

import { useState, useCallback, useMemo } from 'react';
import { TableShape, TableData, TableShapeType, FloorPlanConfig } from './TableShape';
import { FloorPlanToolbar, FloorPlanLegend } from './FloorPlanToolbar';
import { TableDialog, TableFormData } from './TableDialog';

interface Section {
  id: string;
  name: string;
  color?: string;
}

interface FloorPlanEditorProps {
  tables: TableData[];
  sections: Section[];
  onTableCreate: (data: TableFormData & { floor_plan_config: FloorPlanConfig }) => Promise<void>;
  onTableUpdate: (id: string, data: Partial<TableData>) => Promise<void>;
  onTableDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

const DEFAULT_TABLE_SIZE: Record<TableShapeType, { width: number; height: number }> = {
  round: { width: 80, height: 80 },
  square: { width: 80, height: 80 },
  rectangle: { width: 120, height: 80 },
};

export function FloorPlanEditor({
  tables,
  sections,
  onTableCreate,
  onTableUpdate,
  onTableDelete,
  isLoading = false,
}: FloorPlanEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [scale, setScale] = useState(1);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Map<string, Partial<TableData>>>(new Map());
  const [error, setError] = useState<string | null>(null);

  // Track table positions locally for smooth dragging
  const [localTables, setLocalTables] = useState<TableData[]>(tables);

  // Sync tables from props
  useMemo(() => {
    if (!hasChanges) {
      setLocalTables(tables);
    }
  }, [tables, hasChanges]);

  const selectedTable = useMemo(() => {
    return localTables.find((t) => t.id === selectedTableId) || null;
  }, [localTables, selectedTableId]);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setScale((s) => Math.min(2, s + 0.1));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((s) => Math.max(0.5, s - 0.1));
  }, []);

  const handleResetZoom = useCallback(() => {
    setScale(1);
  }, []);

  // Add new table
  const handleAddTable = useCallback(
    async (shape: TableShapeType) => {
      setError(null);
      try {
        const size = DEFAULT_TABLE_SIZE[shape];
        const nextNumber = localTables.length + 1;

        const newTable: TableFormData & { floor_plan_config: FloorPlanConfig } = {
          table_number: `T${nextNumber}`,
          min_capacity: 2,
          max_capacity: shape === 'round' ? 4 : shape === 'square' ? 4 : 6,
          shape,
          section_id: sections[0]?.id || null,
          is_reservable: true,
          notes: '',
          floor_plan_config: {
            x: 50 + (nextNumber % 5) * 100,
            y: 50 + Math.floor(nextNumber / 5) * 100,
            width: size.width,
            height: size.height,
            rotation: 0,
          },
        };

        await onTableCreate(newTable);
        setHasChanges(false);
      } catch (err) {
        console.error('Failed to create table:', err);
        setError(err instanceof Error ? err.message : 'Failed to create table');
      }
    },
    [localTables.length, sections, onTableCreate]
  );

  // Move table
  const handleTableMove = useCallback(
    (tableId: string, x: number, y: number) => {
      setLocalTables((prev) =>
        prev.map((t) =>
          t.id === tableId ? { ...t, floor_plan_config: { ...t.floor_plan_config, x, y } } : t
        )
      );

      setPendingChanges((prev) => {
        const updated = new Map(prev);
        const existing = updated.get(tableId) || {};
        const table = localTables.find((t) => t.id === tableId);
        if (table) {
          updated.set(tableId, {
            ...existing,
            floor_plan_config: { ...table.floor_plan_config, x, y },
          });
        }
        return updated;
      });

      setHasChanges(true);
    },
    [localTables]
  );

  // Resize table
  const handleTableResize = useCallback(
    (tableId: string, width: number, height: number) => {
      setLocalTables((prev) =>
        prev.map((t) =>
          t.id === tableId
            ? { ...t, floor_plan_config: { ...t.floor_plan_config, width, height } }
            : t
        )
      );

      setPendingChanges((prev) => {
        const updated = new Map(prev);
        const existing = updated.get(tableId) || {};
        const table = localTables.find((t) => t.id === tableId);
        if (table) {
          updated.set(tableId, {
            ...existing,
            floor_plan_config: { ...table.floor_plan_config, width, height },
          });
        }
        return updated;
      });

      setHasChanges(true);
    },
    [localTables]
  );

  // Rotate table
  const handleTableRotate = useCallback(
    (tableId: string, rotation: number) => {
      setLocalTables((prev) =>
        prev.map((t) =>
          t.id === tableId ? { ...t, floor_plan_config: { ...t.floor_plan_config, rotation } } : t
        )
      );

      setPendingChanges((prev) => {
        const updated = new Map(prev);
        const existing = updated.get(tableId) || {};
        const table = localTables.find((t) => t.id === tableId);
        if (table) {
          updated.set(tableId, {
            ...existing,
            floor_plan_config: { ...table.floor_plan_config, rotation },
          });
        }
        return updated;
      });

      setHasChanges(true);
    },
    [localTables]
  );

  // Delete selected table
  const handleDeleteSelected = useCallback(async () => {
    if (!selectedTableId) return;

    if (confirm('Are you sure you want to delete this table?')) {
      setError(null);
      try {
        await onTableDelete(selectedTableId);
        setSelectedTableId(null);
        setHasChanges(false);
      } catch (err) {
        console.error('Failed to delete table:', err);
        setError(err instanceof Error ? err.message : 'Failed to delete table');
      }
    }
  }, [selectedTableId, onTableDelete]);

  // Save all pending changes
  const handleSave = useCallback(async () => {
    setError(null);
    try {
      const promises = Array.from(pendingChanges.entries()).map(([id, changes]) =>
        onTableUpdate(id, changes)
      );

      const results = await Promise.allSettled(promises);
      const failures = results.filter((r) => r.status === 'rejected');

      if (failures.length > 0) {
        console.error('Some updates failed:', failures);
        setError(`Failed to save ${failures.length} of ${results.length} changes`);
      }

      // Only clear successfully saved changes
      setPendingChanges(new Map());
      setHasChanges(false);
    } catch (err) {
      console.error('Failed to save changes:', err);
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    }
  }, [pendingChanges, onTableUpdate]);

  // Handle canvas click to deselect
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedTableId(null);
    }
  }, []);

  // Double-click to edit table
  const handleTableDoubleClick = useCallback((table: TableData) => {
    setSelectedTableId(table.id);
    setDialogOpen(true);
  }, []);

  // Save table from dialog
  const handleDialogSave = useCallback(
    async (data: TableFormData) => {
      setError(null);
      try {
        if (data.id) {
          await onTableUpdate(data.id, {
            table_number: data.table_number,
            min_capacity: data.min_capacity,
            max_capacity: data.max_capacity,
            shape: data.shape,
          });
        }
      } catch (err) {
        console.error('Failed to update table:', err);
        setError(err instanceof Error ? err.message : 'Failed to update table');
        throw err; // Re-throw so dialog can show error too
      }
    },
    [onTableUpdate]
  );

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Error Banner */}
      {error && (
        <div className="flex items-center justify-between bg-red-50 px-4 py-2 text-sm text-red-700">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-2 text-red-500 hover:text-red-700">
            ×
          </button>
        </div>
      )}

      {/* Toolbar */}
      <FloorPlanToolbar
        isEditing={isEditing}
        scale={scale}
        hasChanges={hasChanges}
        selectedTableId={selectedTableId}
        onToggleEdit={() => setIsEditing(!isEditing)}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
        onAddTable={handleAddTable}
        onDeleteSelected={handleDeleteSelected}
        onSave={handleSave}
        isSaving={isLoading}
      />

      {/* Canvas */}
      <div
        className="relative flex-1 overflow-auto bg-gray-100"
        onClick={handleCanvasClick}
        style={{
          backgroundImage:
            'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
          backgroundSize: `${20 * scale}px ${20 * scale}px`,
        }}
      >
        <div
          className="relative min-h-full min-w-full"
          style={{
            width: 1200 * scale,
            height: 800 * scale,
          }}
        >
          {/* Section backgrounds */}
          {sections.map((section) => (
            <div
              key={section.id}
              className="absolute rounded-lg border-2 border-dashed border-gray-300 bg-gray-50/50 p-2"
              style={{
                // Position sections in a grid layout
                left: sections.indexOf(section) % 2 === 0 ? 20 * scale : 620 * scale,
                top: Math.floor(sections.indexOf(section) / 2) * 420 * scale + 20 * scale,
                width: 560 * scale,
                height: 380 * scale,
              }}
            >
              <span className="text-sm font-medium text-gray-500">{section.name}</span>
            </div>
          ))}

          {/* Tables */}
          {localTables.map((table) => (
            <div key={table.id} onDoubleClick={() => handleTableDoubleClick(table)}>
              <TableShape
                table={table}
                isSelected={table.id === selectedTableId}
                isEditing={isEditing}
                scale={scale}
                onSelect={() => setSelectedTableId(table.id)}
                onMove={(x, y) => handleTableMove(table.id, x, y)}
                onResize={(w, h) => handleTableResize(table.id, w, h)}
                onRotate={(r) => handleTableRotate(table.id, r)}
              />
            </div>
          ))}

          {/* Empty state */}
          {localTables.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-medium text-gray-500">No tables yet</p>
                <p className="mt-1 text-sm text-gray-400">
                  {isEditing
                    ? 'Click "Add" in the toolbar to create tables'
                    : 'Switch to editing mode to add tables'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <FloorPlanLegend />

      {/* Table edit dialog */}
      <TableDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleDialogSave}
        table={selectedTable}
        sections={sections}
        isLoading={isLoading}
      />
    </div>
  );
}
