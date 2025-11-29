/**
 * Contacts Card Component
 * Displays business and emergency contacts
 *
 * Features:
 * - Quick call/message buttons
 * - WhatsApp, Zalo, WeChat support
 * - Emergency numbers section
 * - Availability indicators
 */

'use client';

import React from 'react';
import { ContactsConfig, ContactNumber, EmergencyContact } from '../types';
import { LanguageCode, getLocalizedText } from '../../translation-engine/types';

interface ContactsCardProps {
  config: ContactsConfig;
  language: LanguageCode;
  className?: string;
}

// Contact type icons
const CONTACT_ICONS: Record<ContactNumber['type'], { icon: string; color: string; label: string }> = {
  phone: { icon: '📞', color: 'bg-gray-100', label: 'Call' },
  whatsapp: { icon: '💬', color: 'bg-green-100', label: 'WhatsApp' },
  telegram: { icon: '✈️', color: 'bg-blue-100', label: 'Telegram' },
  zalo: { icon: '💙', color: 'bg-blue-100', label: 'Zalo' },
  wechat: { icon: '💚', color: 'bg-green-100', label: 'WeChat' },
  line: { icon: '💚', color: 'bg-green-100', label: 'LINE' },
};

function getContactLink(contact: ContactNumber): string {
  const cleanNumber = contact.number.replace(/\s/g, '');

  switch (contact.type) {
    case 'whatsapp':
      return `https://wa.me/${cleanNumber.replace('+', '')}`;
    case 'telegram':
      return `https://t.me/${cleanNumber}`;
    case 'zalo':
      return `https://zalo.me/${cleanNumber}`;
    case 'line':
      return `https://line.me/ti/p/${cleanNumber}`;
    case 'wechat':
      return `weixin://dl/chat?${cleanNumber}`;
    default:
      return `tel:${cleanNumber}`;
  }
}

function ContactRow({
  contact,
  language,
  showCallButton,
  showMessageButton,
}: {
  contact: ContactNumber;
  language: LanguageCode;
  showCallButton: boolean;
  showMessageButton: boolean;
}) {
  const label = getLocalizedText(contact.label, language);
  const typeInfo = CONTACT_ICONS[contact.type];

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${typeInfo.color} rounded-full flex items-center justify-center text-lg`}>
          {contact.icon || typeInfo.icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{label}</span>
            {contact.isPrimary && (
              <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Primary</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm text-gray-600">{contact.number}</span>
            {contact.available24h ? (
              <span className="text-xs text-green-600">24/7</span>
            ) : contact.availableHours ? (
              <span className="text-xs text-gray-400">{contact.availableHours}</span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {contact.type !== 'phone' && showMessageButton && (
          <a
            href={getContactLink(contact)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            aria-label={`Message via ${typeInfo.label}`}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
        )}
        {showCallButton && (
          <a
            href={`tel:${contact.number.replace(/\s/g, '')}`}
            className="p-2 bg-green-100 hover:bg-green-200 rounded-full transition-colors"
            aria-label="Call"
          >
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

function EmergencyContactRow({
  contact,
  language,
}: {
  contact: EmergencyContact;
  language: LanguageCode;
}) {
  const label = getLocalizedText(contact.label, language);
  const description = contact.description ? getLocalizedText(contact.description, language) : null;

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-lg">
          {contact.icon || '🚨'}
        </div>
        <div>
          <span className="font-medium text-gray-900">{label}</span>
          {description && (
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <a
        href={`tel:${contact.number.replace(/\s/g, '')}`}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span>{contact.number}</span>
      </a>
    </div>
  );
}

export function ContactsCard({ config, language, className = '' }: ContactsCardProps) {
  const hasBusinessContacts = config.businessContacts && config.businessContacts.length > 0;
  const hasEmergencyContacts = config.emergencyContacts && config.emergencyContacts.length > 0;

  if (!hasBusinessContacts && !hasEmergencyContacts) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Business Contacts */}
      {hasBusinessContacts && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Contact Us</h3>
          </div>
          <div className="px-4 divide-y divide-gray-100">
            {config.businessContacts.map((contact) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                language={language}
                showCallButton={config.showCallButton}
                showMessageButton={config.showMessageButton}
              />
            ))}
          </div>
        </div>
      )}

      {/* Emergency Contacts */}
      {hasEmergencyContacts && (
        <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
          <div className="p-4 border-b border-red-100 bg-red-50">
            <h3 className="font-semibold text-red-900 flex items-center gap-2">
              <span>🚨</span>
              <span>Emergency</span>
            </h3>
          </div>
          <div className="px-4 divide-y divide-gray-100">
            {config.emergencyContacts.map((contact) => (
              <EmergencyContactRow
                key={contact.id}
                contact={contact}
                language={language}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactsCard;
