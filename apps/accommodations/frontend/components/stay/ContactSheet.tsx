'use client';

import { useState } from 'react';

interface ContactSheetProps {
  phone: string;
  whatsapp?: string | null;
  roomNumber: string;
  propertyName: string;
}

export default function ContactSheet({
  phone,
  whatsapp,
  roomNumber,
  propertyName,
}: ContactSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const cleanPhone = phone.replace(/[\s\-+]/g, '');
  const whatsappNumber = whatsapp?.replace(/[\s\-+]/g, '') || cleanPhone;
  const prefilledMessage = `Hi, I'm staying in Room ${roomNumber} at ${propertyName}. `;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefilledMessage)}`;
  const telUrl = `tel:${phone.replace(/\s/g, '')}`;

  return (
    <>
      {/* Contact button in the page flow */}
      <section className="mb-5 px-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center gap-3 rounded-2xl bg-gradient-to-r from-[#3D8B87] to-[#2D7A76] p-4 transition-all active:scale-[0.98]"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
            </svg>
          </div>
          <div className="flex-1 text-left">
            <span className="text-sm font-semibold text-white">Contact Host</span>
            <p className="text-[10px] text-white/70">WhatsApp or Call</p>
          </div>
          <svg
            className="h-5 w-5 text-white/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Bottom Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5 pb-24">
            <div className="mb-5 flex justify-center">
              <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>

            <h3 className="mb-4 text-lg font-semibold text-gray-900">Contact Host</h3>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-[#FAF8F5] p-4 transition-colors hover:bg-[#3D8B87]/10"
              >
                <span className="text-2xl">💬</span>
                <span className="font-medium text-gray-900">WhatsApp</span>
              </a>
              <a
                href={telUrl}
                className="flex items-center gap-3 rounded-2xl bg-[#FAF8F5] p-4 transition-colors hover:bg-[#3D8B87]/10"
              >
                <span className="text-2xl">📞</span>
                <span className="font-medium text-gray-900">Call</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
