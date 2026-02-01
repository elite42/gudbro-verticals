'use client';

import { BookOpen, Clock, X } from '@phosphor-icons/react';

interface HouseRulesSheetProps {
  isOpen: boolean;
  onClose: () => void;
  checkInTime?: string | null;
  checkoutTime: string;
  checkoutProcedure?: string | null;
  houseRules?: string[];
}

export default function HouseRulesSheet({
  isOpen,
  onClose,
  checkInTime,
  checkoutTime,
  checkoutProcedure,
  houseRules,
}: HouseRulesSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5 pb-24">
        {/* Drag handle */}
        <div className="mb-4 flex justify-center">
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen size={22} weight="duotone" className="text-[#8B6914]" />
            <h3 className="text-lg font-semibold text-[#2D2016]">House Rules</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#8B7355] transition-colors hover:bg-[#FAF8F5] hover:text-[#2D2016]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Check-in / Check-out times */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#3D8B87]/10 p-3">
            <div className="mb-1 flex items-center gap-1.5">
              <Clock size={16} weight="duotone" className="text-[#3D8B87]" />
              <p className="text-[10px] uppercase tracking-wide text-[#3D8B87]">Check-in</p>
            </div>
            <p className="text-base font-semibold text-[#2D2016]">
              {checkInTime ? `from ${checkInTime}` : 'Ask host'}
            </p>
          </div>
          <div className="rounded-xl bg-[#E07A5F]/10 p-3">
            <div className="mb-1 flex items-center gap-1.5">
              <Clock size={16} weight="duotone" className="text-[#E07A5F]" />
              <p className="text-[10px] uppercase tracking-wide text-[#E07A5F]">Check-out</p>
            </div>
            <p className="text-base font-semibold text-[#2D2016]">by {checkoutTime}</p>
          </div>
        </div>

        {/* Checkout procedure */}
        {checkoutProcedure && (
          <div className="mb-5">
            <p className="mb-1.5 text-[10px] uppercase tracking-wide text-[#8B7355]">
              Checkout Procedure
            </p>
            <p className="text-sm text-[#2D2016]">{checkoutProcedure}</p>
          </div>
        )}

        {/* House rules list */}
        {houseRules && houseRules.length > 0 && (
          <div>
            <p className="mb-2.5 text-[10px] uppercase tracking-wide text-[#8B7355]">Rules</p>
            <div className="space-y-2">
              {houseRules.map((rule, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-[#2D2016]">
                  <span className="mt-0.5 text-[#3D8B87]">&#8226;</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {(!houseRules || houseRules.length === 0) && !checkoutProcedure && (
          <p className="text-center text-sm text-[#8B7355]">
            No additional house rules provided by the host.
          </p>
        )}
      </div>
    </div>
  );
}
