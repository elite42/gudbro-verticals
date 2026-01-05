'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useRef,
  useEffect,
} from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

// Sound settings stored in localStorage
interface SoundSettings {
  enabled: boolean;
  volume: number;
  enabledTypes: Record<ToastType, boolean>;
}

const DEFAULT_SOUND_SETTINGS: SoundSettings = {
  enabled: true,
  volume: 0.5,
  enabledTypes: {
    success: true,
    error: true,
    warning: true,
    info: false,
  },
};

const SOUND_STORAGE_KEY = 'gudbro_notification_sounds';

// Base64 encoded short notification sounds
const SOUND_DATA: Record<ToastType, string> = {
  success:
    'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2JkZuTgHNxeYOLkpCDdXBzeIKKjYqAdXFzeICHiomAdnNzdnyCh4iCd3R0dXmAhIV/d3R0dnqAg4R/eHV1dXh9gYJ/eHV2dXh8f4F+eHZ2dXh7fn9+eHZ2dnd6fX5+eHd3d3d6fH1+eHd3d3d5e3x9eHd3d3d5e3x8d3d3d3d5enx8d3h4d3d5enx7d3h4eHd4eXt7d3h4eHd4eXp6d3h4eHh4eXp6d3h4eHh4eHp5d3l5eHh4eHl5d3l5eXh4eHl4eHl5eXl4eHh4eHl5eXl5eHh4eHh4eXl5eXl4eHh4eHh4eXl5eXl4eHh4eHh4eHl5eXl4eHh4eHh4eHh5eXl4eHh4eHh4eHh4eXh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4',
  error:
    'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAgoSGiIqMjpCSlJaYmpyeoKKkpqiqrK6wsrS2uLq8vr7AvL66uLa0sq6sqKainpyamJaUkpCOjIqIhoSCgH5+gIKEhoiKjI6QkpSWmJqcnqCipKaoqqyusLK0trq8vr7AwL68urq4trSysK6sqKimoqCenJqYlpSSkI6MioiGhIKAgH5+foB+gIKEhoeJi42PkZOVl5mcnqGjpaepq62vsrS2uLq8vsDAwL6+vLq4tra0srCurKqopaOhoJ6cnJqYlpSSkI6MioiGhIKAgH5+fn5+fn6A',
  warning:
    'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAgICAgH58en1/goWIi4yLiYaDgH17eXl7fYCDhomLjIuJhoOAfXt5eXt9gIOGiYuMi4mGg4B9e3l5e32Ag4aJi4yLiYaDgH17eXl7fYCDhomLjIuJhoN/fXt5eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh5e32Ag4aJi4yLiYaDgH17eXl7fYCDhomLjIuJhoOAfXt5eXt9gIOGiYuMi4mGg4B9e3l5e32Ag4aJi4yLiYaDgH17eXl7fYCDhomLjIuJhoOAfXt5eXh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4',
  info: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAgIB/f39/gICAf39/f4CAgH9/f3+AgIB/f39/gICAf39/f4CAgH9/f3+AgIB/f39/gIGBgYGBgYGBgYKCgoKCgoKCgoKCgoKCgoKCgoKCgoGBgYGBgYGBgYCAgICAgIB/f39/f39/f39/f35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+f39/f39/f4CAgICAgICAgICBgYGBgYGBgYGBgYGBgYGBgYGBgYGAgICAgICAgH9/f39/f39+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+',
};

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  // Sound controls
  soundSettings: SoundSettings;
  updateSoundSettings: (updates: Partial<SoundSettings>) => void;
  testSound: (type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [soundSettings, setSoundSettings] = useState<SoundSettings>(DEFAULT_SOUND_SETTINGS);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load sound settings from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(SOUND_STORAGE_KEY);
        if (stored) {
          setSoundSettings({ ...DEFAULT_SOUND_SETTINGS, ...JSON.parse(stored) });
        }
      } catch {
        // Use defaults
      }
    }
  }, []);

  const updateSoundSettings = useCallback((updates: Partial<SoundSettings>) => {
    setSoundSettings((prev) => {
      const newSettings = { ...prev, ...updates };
      if (typeof window !== 'undefined') {
        localStorage.setItem(SOUND_STORAGE_KEY, JSON.stringify(newSettings));
      }
      return newSettings;
    });
  }, []);

  const playSound = useCallback(
    (type: ToastType) => {
      if (!soundSettings.enabled || !soundSettings.enabledTypes[type]) {
        return;
      }

      try {
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }
        const audio = audioRef.current;
        audio.src = SOUND_DATA[type];
        audio.volume = soundSettings.volume;
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } catch {
        // Silently fail
      }
    },
    [soundSettings]
  );

  const testSound = useCallback(
    (type: ToastType) => {
      try {
        const audio = new Audio(SOUND_DATA[type]);
        audio.volume = soundSettings.volume;
        audio.play();
      } catch {
        // Silently fail
      }
    },
    [soundSettings.volume]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 5000) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast: Toast = { id, message, type, duration };

      // Play sound for this toast type
      playSound(type);

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast, playSound]
  );

  const success = useCallback(
    (message: string, duration?: number) => addToast(message, 'success', duration),
    [addToast]
  );

  const error = useCallback(
    (message: string, duration?: number) => addToast(message, 'error', duration ?? 8000),
    [addToast]
  );

  const warning = useCallback(
    (message: string, duration?: number) => addToast(message, 'warning', duration),
    [addToast]
  );

  const info = useCallback(
    (message: string, duration?: number) => addToast(message, 'info', duration),
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info,
        soundSettings,
        updateSoundSettings,
        testSound,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
