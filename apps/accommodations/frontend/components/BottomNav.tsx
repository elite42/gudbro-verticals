'use client';

import { House, MapPin, CallBell, UserCircle } from '@phosphor-icons/react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', Icon: House },
  { id: 'map', label: 'Explore', Icon: MapPin },
  { id: 'services', label: 'Services', Icon: CallBell, isCenter: true },
  { id: 'profile', label: 'Profile', Icon: UserCircle },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="pb-safe fixed bottom-0 left-0 right-0 z-50 border-t bg-white px-6 pt-2 md:hidden"
      style={{ borderColor: 'var(--cloud-dark, #E8E4DF)' }}
    >
      <div className="mx-auto flex max-w-lg items-center justify-between">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center gap-0.5 py-2 transition-all"
              style={{
                color: isActive ? 'var(--primary-hex, #E07A5F)' : 'var(--charcoal-muted, #6B6560)',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <item.Icon size={24} weight={isActive ? 'fill' : 'regular'} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
