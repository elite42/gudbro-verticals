'use client';

import { useState, useRef, useEffect } from 'react';
import { Users } from 'lucide-react';

export type TableShapeType = 'round' | 'square' | 'rectangle';
export type TableStatus = 'available' | 'occupied' | 'reserved' | 'blocked';

export interface FloorPlanConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export interface TableData {
  id: string;
  table_number: string;
  min_capacity: number;
  max_capacity: number;
  shape: TableShapeType;
  section_id?: string | null;
  is_reservable?: boolean;
  notes?: string;
  floor_plan_config: FloorPlanConfig;
  status?: TableStatus;
  current_reservation?: {
    guest_name: string;
    party_size: number;
    time: string;
  };
}

interface TableShapeProps {
  table: TableData;
  isSelected?: boolean;
  isEditing?: boolean;
  scale?: number;
  onSelect?: () => void;
  onMove?: (x: number, y: number) => void;
  onResize?: (width: number, height: number) => void;
  onRotate?: (rotation: number) => void;
}

const STATUS_COLORS: Record<TableStatus, { bg: string; border: string; text: string }> = {
  available: { bg: 'bg-green-100', border: 'border-green-400', text: 'text-green-700' },
  occupied: { bg: 'bg-red-100', border: 'border-red-400', text: 'text-red-700' },
  reserved: { bg: 'bg-yellow-100', border: 'border-yellow-400', text: 'text-yellow-700' },
  blocked: { bg: 'bg-gray-200', border: 'border-gray-400', text: 'text-gray-500' },
};

export function TableShape({
  table,
  isSelected = false,
  isEditing = false,
  scale = 1,
  onSelect,
  onMove,
  onResize,
  onRotate,
}: TableShapeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const tableRef = useRef<HTMLDivElement>(null);

  const config = table.floor_plan_config;
  const status = table.status || 'available';
  const colors = STATUS_COLORS[status];

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditing) {
      onSelect?.();
      return;
    }

    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - config.x * scale,
      y: e.clientY - config.y * scale,
    });
    onSelect?.();
  };

  // Handle drag
  useEffect(() => {
    if (!isDragging || !isEditing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = (e.clientX - dragStart.x) / scale;
      const newY = (e.clientY - dragStart.y) / scale;
      onMove?.(Math.max(0, newX), Math.max(0, newY));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, scale, onMove, isEditing]);

  // Render shape based on type
  const renderShape = () => {
    const baseClasses = `absolute transition-shadow ${colors.bg} ${colors.border} border-2 flex items-center justify-center ${
      isEditing ? 'cursor-move' : 'cursor-pointer'
    } ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''} ${
      isDragging ? 'shadow-lg opacity-80' : 'hover:shadow-md'
    }`;

    const style: React.CSSProperties = {
      left: config.x * scale,
      top: config.y * scale,
      width: config.width * scale,
      height: config.height * scale,
      transform: `rotate(${config.rotation}deg)`,
      transformOrigin: 'center center',
    };

    if (table.shape === 'round') {
      return (
        <div
          ref={tableRef}
          className={`${baseClasses} rounded-full`}
          style={style}
          onMouseDown={handleMouseDown}
        >
          <TableContent table={table} colors={colors} scale={scale} />
        </div>
      );
    }

    return (
      <div
        ref={tableRef}
        className={`${baseClasses} rounded-lg`}
        style={style}
        onMouseDown={handleMouseDown}
      >
        <TableContent table={table} colors={colors} scale={scale} />
      </div>
    );
  };

  return (
    <>
      {renderShape()}

      {/* Resize handles when selected and editing */}
      {isSelected && isEditing && (
        <>
          <ResizeHandle position="se" config={config} scale={scale} onResize={onResize} />
          <RotateHandle config={config} scale={scale} onRotate={onRotate} />
        </>
      )}
    </>
  );
}

function TableContent({
  table,
  colors,
  scale,
}: {
  table: TableData;
  colors: { text: string };
  scale: number;
}) {
  const fontSize = Math.max(10, 12 * scale);

  return (
    <div className="flex flex-col items-center justify-center p-1 text-center">
      <span className={`font-bold ${colors.text}`} style={{ fontSize: fontSize + 2 }}>
        {table.table_number}
      </span>
      <div className={`flex items-center gap-0.5 ${colors.text}`} style={{ fontSize }}>
        <Users className="h-3 w-3" />
        <span>{table.max_capacity}</span>
      </div>
      {table.current_reservation && (
        <div
          className="mt-0.5 max-w-full truncate text-gray-600"
          style={{ fontSize: fontSize - 2 }}
        >
          {table.current_reservation.guest_name}
        </div>
      )}
    </div>
  );
}

function ResizeHandle({
  position,
  config,
  scale,
  onResize,
}: {
  position: 'se';
  config: FloorPlanConfig;
  scale: number;
  onResize?: (width: number, height: number) => void;
}) {
  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartSize({ width: config.width, height: config.height });
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = (e.clientX - startPos.x) / scale;
      const deltaY = (e.clientY - startPos.y) / scale;
      const newWidth = Math.max(40, startSize.width + deltaX);
      const newHeight = Math.max(40, startSize.height + deltaY);
      onResize?.(newWidth, newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, startPos, startSize, scale, onResize]);

  return (
    <div
      className="absolute h-3 w-3 cursor-se-resize rounded-full border-2 border-blue-500 bg-white"
      style={{
        left: (config.x + config.width) * scale - 6,
        top: (config.y + config.height) * scale - 6,
      }}
      onMouseDown={handleMouseDown}
    />
  );
}

function RotateHandle({
  config,
  scale,
  onRotate,
}: {
  config: FloorPlanConfig;
  scale: number;
  onRotate?: (rotation: number) => void;
}) {
  const [isRotating, setIsRotating] = useState(false);
  const [centerPos, setCenterPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRotating(true);
    setCenterPos({
      x: (config.x + config.width / 2) * scale,
      y: (config.y + config.height / 2) * scale,
    });
  };

  useEffect(() => {
    if (!isRotating) return;

    const handleMouseMove = (e: MouseEvent) => {
      const angle = Math.atan2(e.clientY - centerPos.y, e.clientX - centerPos.x);
      const degrees = (angle * 180) / Math.PI + 90;
      const snappedDegrees = Math.round(degrees / 15) * 15;
      onRotate?.(snappedDegrees);
    };

    const handleMouseUp = () => {
      setIsRotating(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isRotating, centerPos, onRotate]);

  return (
    <div
      className="absolute h-3 w-3 cursor-grab rounded-full border-2 border-purple-500 bg-white"
      style={{
        left: (config.x + config.width / 2) * scale - 6,
        top: config.y * scale - 20,
      }}
      onMouseDown={handleMouseDown}
    />
  );
}
